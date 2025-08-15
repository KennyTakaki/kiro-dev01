import {
    calculatePercentageChange,
    calculateReturn,
    calculateSharpeRatio,
    roundToDecimals,
    clamp,
} from '../math-utils';

describe('Math Utils', () => {
    describe('calculatePercentageChange', () => {
        it('should calculate positive percentage change', () => {
            expect(calculatePercentageChange(100, 110)).toBe(10);
        });

        it('should calculate negative percentage change', () => {
            expect(calculatePercentageChange(100, 90)).toBe(-10);
        });

        it('should handle zero old value', () => {
            expect(calculatePercentageChange(0, 100)).toBe(0);
        });
    });

    describe('calculateReturn', () => {
        it('should calculate positive return', () => {
            expect(calculateReturn(100, 120)).toBe(20);
        });

        it('should calculate negative return', () => {
            expect(calculateReturn(100, 80)).toBe(-20);
        });
    });

    describe('roundToDecimals', () => {
        it('should round to 2 decimals by default', () => {
            expect(roundToDecimals(3.14159)).toBe(3.14);
        });

        it('should round to specified decimals', () => {
            expect(roundToDecimals(3.14159, 3)).toBe(3.142);
        });
    });

    describe('clamp', () => {
        it('should clamp value within range', () => {
            expect(clamp(5, 0, 10)).toBe(5);
            expect(clamp(-5, 0, 10)).toBe(0);
            expect(clamp(15, 0, 10)).toBe(10);
        });
    });
});