import { RiskLevel, RecommendationStatus, RecommendationType } from './enums';
import { HistoricalCase } from './analysis';

export interface StockRecommendation {
    id: string;
    userId: string;
    symbol: string;
    companyName: string;
    recommendationType: RecommendationType;
    entryPrice: number;
    targetPrice: number;
    stopLossPrice?: number;
    confidenceScore: number; // 0-1
    riskLevel: RiskLevel;
    investmentRationale: string;
    similarCases: HistoricalCase[];
    status: RecommendationStatus;
    actualEntryPrice?: number;
    actualExitPrice?: number;
    createdAt: Date;
    updatedAt: Date;
    expiresAt?: Date;
}

export interface RecommendationRequest {
    userId: string;
    maxRecommendations?: number;
    sectors?: string[];
    excludeSectors?: string[];
    minConfidenceScore?: number;
    riskLevels?: RiskLevel[];
}

export interface RecommendationFeedback {
    recommendationId: string;
    userId: string;
    rating: number; // 1-5
    feedback?: string;
    actionTaken?: 'BOUGHT' | 'IGNORED' | 'SAVED_FOR_LATER';
    actualEntryPrice?: number;
    createdAt: Date;
}

export interface EntryPointData {
    symbol: string;
    currentPrice: number;
    recommendedEntryPrice: number;
    entryReason: string;
    technicalIndicators: TechnicalIndicator[];
    confidenceScore: number;
    calculatedAt: Date;
}

export interface TechnicalIndicator {
    name: string;
    value: number;
    signal: 'BUY' | 'SELL' | 'HOLD';
    weight: number;
}