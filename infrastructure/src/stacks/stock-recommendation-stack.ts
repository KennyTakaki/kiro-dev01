import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DatabaseConstruct } from '../constructs/database-construct';
import { SecretsConstruct } from '../constructs/secrets-construct';
import { MonitoringConstruct } from '../constructs/monitoring-construct';

export interface StockRecommendationStackProps extends cdk.StackProps {
    stage: string;
}

export class StockRecommendationStack extends cdk.Stack {
    public readonly database: DatabaseConstruct;
    public readonly secrets: SecretsConstruct;
    public readonly monitoring: MonitoringConstruct;

    constructor(scope: Construct, id: string, props: StockRecommendationStackProps) {
        super(scope, id, props);

        const { stage } = props;

        // Secrets Manager for API keys and credentials
        this.secrets = new SecretsConstruct(this, 'Secrets', {
            stage,
        });

        // Database resources (RDS, DynamoDB, Timestream)
        this.database = new DatabaseConstruct(this, 'Database', {
            stage,
        });

        // Monitoring and alerting
        this.monitoring = new MonitoringConstruct(this, 'Monitoring', {
            stage,
        });

        // Output important resource ARNs and endpoints
        new cdk.CfnOutput(this, 'DatabaseClusterEndpoint', {
            value: this.database.cluster.clusterEndpoint.hostname,
            description: 'RDS PostgreSQL cluster endpoint',
        });

        new cdk.CfnOutput(this, 'UserTableName', {
            value: this.database.userTable.tableName,
            description: 'DynamoDB user sessions table name',
        });

        new cdk.CfnOutput(this, 'TimestreamDatabaseName', {
            value: this.database.timestreamDatabase.databaseName!,
            description: 'Timestream database name',
        });
    }
}