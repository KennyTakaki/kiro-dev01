import { PatternType, AnalysisType } from './enums';

export interface HistoricalCase {
    id: string;
    symbol: string;
    companyName: string;
    patternType: PatternType;
    casePeriodStart: Date;
    casePeriodEnd: Date;
    priceAppreciation: number; // percentage
    timePeriod: number; // days
    irFactors: string[];
    fundamentalFactors: string[];
    technicalFactors: string[];
    marketConditions: MarketConditions;
    similarityScore: number; // 0-1
    createdAt: Date;
}

export interface MarketConditions {
    marketTrend: 'BULL' | 'BEAR' | 'SIDEWAYS';
    volatilityIndex: number;
    interestRates: number;
    economicIndicators: Record<string, number>;
}

export interface IRAnalysis {
    companyId: string;
    symbol: string;
    recentAnnouncements: IRAnnouncementSummary[];
    overallSentiment: number; // -1 to 1
    impactScore: number; // -1 to 1
    keyFactors: string[];
    analysisDate: Date;
}

export interface IRAnnouncementSummary {
    id: string;
    type: string;
    title: string;
    date: Date;
    impactScore: number;
    sentimentScore: number;
}

export interface CorrelationAnalysis {
    symbol: string;
    priceCorrelations: PriceCorrelation[];
    fundamentalCorrelations: FundamentalCorrelation[];
    overallCorrelationScore: number;
    analysisDate: Date;
}

export interface PriceCorrelation {
    factor: string;
    correlation: number; // -1 to 1
    significance: number; // p-value
    timeframe: string; // '30d', '90d', '1y', etc.
}

export interface FundamentalCorrelation {
    metric: string; // 'revenue', 'earnings', 'debt_ratio', etc.
    correlation: number;
    significance: number;
    direction: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
}

export interface InvestmentRationale {
    symbol: string;
    irAnalysis: IRAnalysis;
    fundamentalFactors: string[];
    technicalFactors: string[];
    similarCases: HistoricalCase[];
    riskFactors: string[];
    confidenceLevel: number;
    strengthScore: number; // 0-100
    compiledAt: Date;
}

export interface AnalysisResult {
    id: string;
    symbol: string;
    analysisType: AnalysisType;
    result: {
        confidence: number;
        factors: string[];
        score: number;
        details: Record<string, unknown>;
    };
    computationTime: number; // milliseconds
    createdAt: Date;
    expiresAt: Date;
}