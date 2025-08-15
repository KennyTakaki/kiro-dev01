import { RiskLevel, ExperienceLevel } from './enums';

export interface UserProfile {
    userId: string;
    email: string;
    riskTolerance: RiskLevel;
    investmentPeriod: number; // months
    investmentAmount: number;
    experienceLevel: ExperienceLevel;
    preferences: UserPreferences;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPreferences {
    sectors?: string[]; // Preferred sectors
    excludedSectors?: string[]; // Sectors to avoid
    maxPositions?: number; // Maximum number of positions
    minConfidenceScore?: number; // Minimum confidence for recommendations
    notificationSettings?: NotificationSettings;
    investmentStyle?: 'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE';
}

export interface NotificationSettings {
    emailAlerts: boolean;
    priceTargetAlerts: boolean;
    newRecommendations: boolean;
    performanceReports: boolean;
}

export interface UserSession {
    sessionId: string;
    userId: string;
    sessionData: {
        currentWatchlist: string[];
        recentSearches: string[];
        activeRecommendations: string[];
        temporaryPreferences: Record<string, unknown>;
    };
    lastActivity: Date;
    expiresAt: Date;
}