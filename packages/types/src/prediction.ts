export interface PricePrediction {
    id: string;
    stockSymbol: string;
    currentPrice: number;
    predictedPrices: Record<number, number>; // days -> price
    scenarios: ScenarioModeling;
    milestones: Milestone[];
    confidenceInterval: [number, number];
    modelVersion: string;
    inputFeatures: Record<string, number>;
    createdAt: Date;
}

export interface ScenarioModeling {
    best: PriceScenario;
    expected: PriceScenario;
    worst: PriceScenario;
}

export interface PriceScenario {
    name: 'best' | 'expected' | 'worst';
    probability: number; // 0-1
    priceTargets: Record<number, number>; // days -> price
    expectedReturn: number; // percentage
    maxDrawdown: number; // percentage
    assumptions: string[];
}

export interface Milestone {
    days: number;
    targetPrice: number;
    probability: number;
    description: string;
}

export interface SellingPoints {
    symbol: string;
    entryPrice: number;
    optimalExitPrice: number;
    optimalExitDays: number;
    stopLossPrice: number;
    takeProfitLevels: TakeProfitLevel[];
    reasoning: string;
    calculatedAt: Date;
}

export interface TakeProfitLevel {
    level: number; // 1, 2, 3, etc.
    price: number;
    percentage: number; // percentage of position to sell
    probability: number; // probability of reaching this level
    timeframe: number; // expected days to reach
}