export interface PerformanceMetrics {
    userId?: string;
    systemWide?: boolean;
    totalRecommendations: number;
    successfulRecommendations: number;
    successRate: number; // percentage
    averageReturn: number; // percentage
    totalReturn: number; // percentage
    maxDrawdown: number; // percentage
    sharpeRatio: number;
    winLossRatio: number;
    averageHoldingPeriod: number; // days
    periodStart: Date;
    periodEnd: Date;
    calculatedAt: Date;
}

export interface TradeData {
    recommendationId: string;
    userId: string;
    symbol: string;
    entryPrice: number;
    exitPrice?: number;
    quantity: number;
    entryDate: Date;
    exitDate?: Date;
    realizedGainLoss?: number;
    unrealizedGainLoss?: number;
    status: 'OPEN' | 'CLOSED';
}

export interface ValidationResult {
    recommendationId: string;
    symbol: string;
    predictedPrice: number;
    actualPrice: number;
    predictionAccuracy: number; // percentage
    timeframe: number; // days
    validationDate: Date;
    isSuccessful: boolean;
}

export interface PerformanceReport {
    userId: string;
    reportPeriod: {
        start: Date;
        end: Date;
    };
    portfolioValue: {
        current: number;
        previous: number;
        change: number;
        changePercent: number;
    };
    recommendations: {
        total: number;
        active: number;
        completed: number;
        successful: number;
        successRate: number;
    };
    returns: {
        realized: number;
        unrealized: number;
        total: number;
        totalPercent: number;
    };
    topPerformers: RecommendationPerformance[];
    worstPerformers: RecommendationPerformance[];
    generatedAt: Date;
}

export interface RecommendationPerformance {
    recommendationId: string;
    symbol: string;
    companyName: string;
    entryPrice: number;
    currentPrice: number;
    return: number;
    returnPercent: number;
    daysHeld: number;
    status: 'OPEN' | 'CLOSED';
}