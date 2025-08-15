import * as cdk from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as cloudwatchActions from 'aws-cdk-lib/aws-cloudwatch-actions';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export interface MonitoringConstructProps {
    stage: string;
}

export class MonitoringConstruct extends Construct {
    public readonly alertTopic: sns.Topic;
    public readonly dashboard: cloudwatch.Dashboard;
    public readonly logGroup: logs.LogGroup;

    constructor(scope: Construct, id: string, props: MonitoringConstructProps) {
        super(scope, id);

        const { stage } = props;

        // SNS Topic for alerts
        this.alertTopic = new sns.Topic(this, 'AlertTopic', {
            topicName: `stock-rec-alerts-${stage}`,
            displayName: `Stock Recommendation System Alerts - ${stage}`,
        });

        // CloudWatch Log Group
        this.logGroup = new logs.LogGroup(this, 'LogGroup', {
            logGroupName: `/aws/lambda/stock-rec-${stage}`,
            retention: stage === 'prod' ? logs.RetentionDays.ONE_MONTH : logs.RetentionDays.ONE_WEEK,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        // CloudWatch Dashboard
        this.dashboard = new cloudwatch.Dashboard(this, 'Dashboard', {
            dashboardName: `StockRecommendation-${stage}`,
        });

        // Add basic widgets to dashboard
        this.dashboard.addWidgets(
            new cloudwatch.TextWidget({
                markdown: `# Stock Recommendation System - ${stage.toUpperCase()}
        
This dashboard monitors the health and performance of the stock recommendation system.`,
                width: 24,
                height: 2,
            })
        );

        // Error rate alarm (will be configured when Lambda functions are added)
        const errorRateAlarm = new cloudwatch.Alarm(this, 'ErrorRateAlarm', {
            alarmName: `stock-rec-error-rate-${stage}`,
            alarmDescription: 'High error rate in Lambda functions',
            metric: new cloudwatch.Metric({
                namespace: 'AWS/Lambda',
                metricName: 'Errors',
                statistic: 'Sum',
            }),
            threshold: 10,
            evaluationPeriods: 2,
            treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
        });

        errorRateAlarm.addAlarmAction(
            new cloudwatchActions.SnsAction(this.alertTopic)
        );
    }
}