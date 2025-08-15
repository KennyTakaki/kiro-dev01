import * as cdk from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

export interface SecretsConstructProps {
    stage: string;
}

export class SecretsConstruct extends Construct {
    public readonly apiKeysSecret: secretsmanager.Secret;
    public readonly jwtSecret: secretsmanager.Secret;

    constructor(scope: Construct, id: string, props: SecretsConstructProps) {
        super(scope, id);

        const { stage } = props;

        // Secret for external API keys (stock data providers, etc.)
        this.apiKeysSecret = new secretsmanager.Secret(this, 'ApiKeysSecret', {
            secretName: `stock-rec-api-keys-${stage}`,
            description: 'API keys for external stock data providers',
            generateSecretString: {
                secretStringTemplate: JSON.stringify({
                    alphaVantageApiKey: '',
                    yahooFinanceApiKey: '',
                    newsApiKey: '',
                }),
                generateStringKey: 'placeholder',
                excludeCharacters: '"@/\\',
            },
        });

        // Secret for JWT signing
        this.jwtSecret = new secretsmanager.Secret(this, 'JwtSecret', {
            secretName: `stock-rec-jwt-secret-${stage}`,
            description: 'JWT signing secret for user authentication',
            generateSecretString: {
                excludeCharacters: '"@/\\',
                passwordLength: 64,
            },
        });

        // SSM Parameters for configuration
        new ssm.StringParameter(this, 'StageParameter', {
            parameterName: `/stock-rec/${stage}/stage`,
            stringValue: stage,
            description: 'Current deployment stage',
        });

        new ssm.StringParameter(this, 'RegionParameter', {
            parameterName: `/stock-rec/${stage}/region`,
            stringValue: cdk.Stack.of(this).region,
            description: 'AWS region for deployment',
        });
    }
}