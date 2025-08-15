#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StockRecommendationStack } from './stacks/stock-recommendation-stack';

const app = new cdk.App();

// Get environment configuration
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
};

const stage = app.node.tryGetContext('stage') || 'dev';

// Create the main stack
new StockRecommendationStack(app, `StockRecommendation-${stage}`, {
    env,
    stage,
    description: `Intelligent Stock Recommendation System - ${stage} environment`,
});

// Add tags to all resources
cdk.Tags.of(app).add('Project', 'IntelligentStockRecommendation');
cdk.Tags.of(app).add('Stage', stage);
cdk.Tags.of(app).add('ManagedBy', 'CDK');