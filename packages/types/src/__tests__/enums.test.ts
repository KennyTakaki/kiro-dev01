import { RiskLevel, ExperienceLevel, RecommendationType } from '../enums';

describe('Enums', () => {
    describe('RiskLevel', () => {
        it('should have correct values', () => {
            expect(RiskLevel.LOW).toBe('LOW');
            expect(RiskLevel.MEDIUM).toBe('MEDIUM');
            expect(RiskLevel.HIGH).toBe('HIGH');
        });
    });

    describe('ExperienceLevel', () => {
        it('should have correct values', () => {
            expect(ExperienceLevel.BEGINNER).toBe('BEGINNER');
            expect(ExperienceLevel.INTERMEDIATE).toBe('INTERMEDIATE');
            expect(ExperienceLevel.ADVANCED).toBe('ADVANCED');
        });
    });

    describe('RecommendationType', () => {
        it('should have correct values', () => {
            expect(RecommendationType.BUY).toBe('BUY');
            expect(RecommendationType.SELL).toBe('SELL');
            expect(RecommendationType.HOLD).toBe('HOLD');
        });
    });
});