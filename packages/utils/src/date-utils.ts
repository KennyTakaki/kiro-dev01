export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const addMonths = (date: Date, months: number): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};

export const daysBetween = (date1: Date, date2: Date): number => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

export const isMarketOpen = (date: Date = new Date()): boolean => {
    // Simple check - market is open Monday-Friday, 9:30 AM - 4:00 PM ET
    // This is a simplified version - real implementation would check holidays
    if (isWeekend(date)) {
        return false;
    }

    const hour = date.getHours();
    return hour >= 9 && hour < 16; // Simplified time check
};

export const getNextMarketDay = (date: Date = new Date()): Date => {
    let nextDay = addDays(date, 1);
    while (isWeekend(nextDay)) {
        nextDay = addDays(nextDay, 1);
    }
    return nextDay;
};

export const getPreviousMarketDay = (date: Date = new Date()): Date => {
    let prevDay = addDays(date, -1);
    while (isWeekend(prevDay)) {
        prevDay = addDays(prevDay, -1);
    }
    return prevDay;
};