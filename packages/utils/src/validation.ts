import { z } from 'zod';
import { RiskLevel, ExperienceLevel, RecommendationType } from '@stock-rec/types';

// User validation schemas
export const userProfileSchema = z.object({
    userId: z.string().uuid(),
    email: z.string().email(),
    riskTolerance: z.nativeEnum(RiskLevel),
    investmentPeriod: z.number().min(1).max(120), // 1-120 months
    investmentAmount: z.number().min(100), // minimum $100
    experienceLevel: z.nativeEnum(ExperienceLevel),
    preferences: z.object({
        sectors: z.array(z.string()).optional(),
        excludedSectors: z.array(z.string()).optional(),
        maxPositions: z.number().min(1).max(50).optional(),
        minConfidenceScore: z.number().min(0).max(1).optional(),
    }).optional(),
});

// Stock symbol validation
export const stockSymbolSchema = z.string()
    .min(1)
    .max(10)
    .regex(/^[A-Z]+$/, 'Stock symbol must contain only uppercase letters');

// Recommendation request validation
export const recommendationRequestSchema = z.object({
    userId: z.string().uuid(),
    maxRecommendations: z.number().min(1).max(20).optional(),
    sectors: z.array(z.string()).optional(),
    excludeSectors: z.array(z.string()).optional(),
    minConfidenceScore: z.number().min(0).max(1).optional(),
    riskLevels: z.array(z.nativeEnum(RiskLevel)).optional(),
});

// Price validation
export const priceSchema = z.number().min(0.01).max(100000);

// Validation helper functions
export const validateStockSymbol = (symbol: string): boolean => {
    return stockSymbolSchema.safeParse(symbol).success;
};

export const validateUserProfile = (profile: unknown): boolean => {
    return userProfileSchema.safeParse(profile).success;
};

export const validatePrice = (price: number): boolean => {
    return priceSchema.safeParse(price).success;
};

// Generic validation function
export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new Error(`Validation failed: ${result.error.message}`);
    }
    return result.data;
};