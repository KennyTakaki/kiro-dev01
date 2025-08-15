# Intelligent Stock Recommendation System

A comprehensive TypeScript-based serverless system that provides data-driven stock recommendations, future price projections, and evidence-based investment rationale for individual investors.

## Architecture

This system uses a serverless-first architecture built on AWS with TypeScript:

- **Backend**: AWS Lambda functions with TypeScript
- **Database**: Amazon RDS (PostgreSQL), DynamoDB, Timestream
- **Infrastructure**: AWS CDK with TypeScript
- **Frontend**: React with TypeScript (planned)
- **Monorepo**: Turborepo for efficient builds and development

## Project Structure

```
├── packages/                    # Shared packages
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Shared utilities
├── apps/                       # Applications
│   ├── api/                   # Lambda functions (planned)
│   └── web/                   # React frontend (planned)
├── infrastructure/             # AWS CDK infrastructure
│   ├── src/
│   │   ├── stacks/            # CDK stacks
│   │   └── constructs/        # Reusable CDK constructs
│   └── cdk.json
└── .kiro/specs/               # Feature specifications
```

## Getting Started

### Prerequisites

- Node.js 18+
- AWS CLI configured
- AWS CDK CLI installed

### Installation

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run linting
npm run lint

# Run tests
npm run test
```

### Infrastructure Deployment

```bash
# Bootstrap CDK (first time only)
npm run bootstrap

# Deploy to development environment
npm run deploy:dev

# Deploy to production environment
npm run deploy:prod
```

### Development

```bash
# Start development mode (watch for changes)
npm run dev

# Type checking
npm run type-check

# Clean build artifacts
npm run clean
```

## Features

1. **Data-Driven Stock Recommendations**: Personalized stock recommendations based on proprietary algorithms
2. **Future Price Projections**: ML-powered price predictions with scenario modeling
3. **Evidence-Based Rationale**: Investment rationale backed by IR data and historical cases
4. **Performance Tracking**: Real-time validation of predictions against actual market performance
5. **Personalized Profiles**: Customizable investment preferences and risk tolerance

## Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js 18+
- **Cloud**: AWS (Lambda, RDS, DynamoDB, Timestream, SageMaker)
- **Infrastructure**: AWS CDK
- **Build Tool**: Turborepo
- **Testing**: Jest
- **Linting**: ESLint + Prettier

## Contributing

1. Follow the existing code style and conventions
2. Write tests for new functionality
3. Update documentation as needed
4. Use conventional commit messages

## License

Private - All rights reserved