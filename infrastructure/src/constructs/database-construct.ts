import * as cdk from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as timestream from 'aws-cdk-lib/aws-timestream';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface DatabaseConstructProps {
    stage: string;
}

export class DatabaseConstruct extends Construct {
    public readonly cluster: rds.DatabaseCluster;
    public readonly userTable: dynamodb.Table;
    public readonly patternTable: dynamodb.Table;
    public readonly cacheTable: dynamodb.Table;
    public readonly timestreamDatabase: timestream.CfnDatabase;
    public readonly vpc: ec2.Vpc;

    constructor(scope: Construct, id: string, props: DatabaseConstructProps) {
        super(scope, id);

        const { stage } = props;

        // Create VPC for RDS
        this.vpc = new ec2.Vpc(this, 'Vpc', {
            maxAzs: 2,
            natGateways: 1,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'Public',
                    subnetType: ec2.SubnetType.PUBLIC,
                },
                {
                    cidrMask: 24,
                    name: 'Private',
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                },
                {
                    cidrMask: 24,
                    name: 'Isolated',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                },
            ],
        });

        // RDS PostgreSQL Cluster (Aurora Serverless v2)
        this.cluster = new rds.DatabaseCluster(this, 'PostgresCluster', {
            engine: rds.DatabaseClusterEngine.auroraPostgres({
                version: rds.AuroraPostgresEngineVersion.VER_15_4,
            }),
            serverlessV2MinCapacity: 0.5,
            serverlessV2MaxCapacity: 4,
            vpc: this.vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            },
            defaultDatabaseName: 'stockrec',
            credentials: rds.Credentials.fromGeneratedSecret('postgres', {
                secretName: `stock-rec-db-credentials-${stage}`,
            }),
            backup: {
                retention: cdk.Duration.days(7),
                preferredWindow: '03:00-04:00',
            },
            preferredMaintenanceWindow: 'sun:04:00-sun:05:00',
            deletionProtection: stage === 'prod',
            removalPolicy: stage === 'prod' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
        });

        // DynamoDB Tables

        // User sessions and temporary data
        this.userTable = new dynamodb.Table(this, 'UserTable', {
            tableName: `stock-rec-users-${stage}`,
            partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            timeToLiveAttribute: 'expiresAt',
            pointInTimeRecovery: stage === 'prod',
            removalPolicy: stage === 'prod' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
        });

        // Pattern matching and historical cases
        this.patternTable = new dynamodb.Table(this, 'PatternTable', {
            tableName: `stock-rec-patterns-${stage}`,
            partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            pointInTimeRecovery: stage === 'prod',
            removalPolicy: stage === 'prod' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
        });

        // Add GSIs for pattern matching
        this.patternTable.addGlobalSecondaryIndex({
            indexName: 'GSI1',
            partitionKey: { name: 'GSI1PK', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'GSI1SK', type: dynamodb.AttributeType.STRING },
        });

        this.patternTable.addGlobalSecondaryIndex({
            indexName: 'GSI2',
            partitionKey: { name: 'GSI2PK', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'GSI2SK', type: dynamodb.AttributeType.STRING },
        });

        // Analysis cache table
        this.cacheTable = new dynamodb.Table(this, 'CacheTable', {
            tableName: `stock-rec-cache-${stage}`,
            partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            timeToLiveAttribute: 'expiresAt',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        // Timestream Database for time series data
        this.timestreamDatabase = new timestream.CfnDatabase(this, 'TimestreamDatabase', {
            databaseName: `stock-rec-timeseries-${stage}`,
        });

        // Timestream tables
        new timestream.CfnTable(this, 'StockPricesTable', {
            databaseName: this.timestreamDatabase.databaseName!,
            tableName: 'stock-prices',
            retentionProperties: {
                MemoryStoreRetentionPeriodInHours: '24',
                MagneticStoreRetentionPeriodInDays: '365',
            },
        });

        new timestream.CfnTable(this, 'PredictionAccuracyTable', {
            databaseName: this.timestreamDatabase.databaseName!,
            tableName: 'prediction-accuracy',
            retentionProperties: {
                MemoryStoreRetentionPeriodInHours: '168', // 7 days
                MagneticStoreRetentionPeriodInDays: '1095', // 3 years
            },
        });

        new timestream.CfnTable(this, 'SystemMetricsTable', {
            databaseName: this.timestreamDatabase.databaseName!,
            tableName: 'system-metrics',
            retentionProperties: {
                MemoryStoreRetentionPeriodInHours: '24',
                MagneticStoreRetentionPeriodInDays: '90',
            },
        });
    }
}