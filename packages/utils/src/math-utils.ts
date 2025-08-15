export const calculatePercentageChange = (
    oldValue: number,
    newValue: number
): number => {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
};

export const calculateReturn = (
    entryPrice: number,
    exitPrice: number
): number => {
    return calculatePercentageChange(entryPrice, exitPrice);
};

export const calculateCompoundReturn = (returns: number[]): number => {
    return returns.reduce((acc, ret) => acc * (1 + ret / 100), 1) - 1;
};

export const calculateSharpeRatio = (
    returns: number[],
    riskFreeRate: number = 0.02 // 2% default risk-free rate
): number => {
    if (returns.length === 0) return 0;

    const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev === 0) return 0;
    return (avgReturn - riskFreeRate) / stdDev;
};

export const calculateMaxDrawdown = (values: number[]): number => {
    if (values.length === 0) return 0;

    let maxDrawdown = 0;
    let peak = values[0];

    for (const value of values) {
        if (value > peak) {
            peak = value;
        }
        const drawdown = (peak - value) / peak;
        if (drawdown > maxDrawdown) {
            maxDrawdown = drawdown;
        }
    }

    return maxDrawdown * 100; // Return as percentage
};

export const calculateVolatility = (prices: number[]): number => {
    if (prices.length < 2) return 0;

    const returns = [];
    for (let i = 1; i < prices.length; i++) {
        returns.push(calculatePercentageChange(prices[i - 1], prices[i]));
    }

    const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;

    return Math.sqrt(variance);
};

export const roundToDecimals = (value: number, decimals: number = 2): number => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};

export const normalizeScore = (value: number, min: number, max: number): number => {
    if (max === min) return 0;
    return clamp((value - min) / (max - min), 0, 1);
};