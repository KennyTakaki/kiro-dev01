export interface StockData {
    symbol: string;
    companyName: string;
    currentPrice: number;
    previousClose: number;
    dayChange: number;
    dayChangePercent: number;
    volume: number;
    marketCap: number;
    sector: string;
    industry: string;
    lastUpdated: Date;
}

export interface StockPriceHistory {
    symbol: string;
    prices: PricePoint[];
}

export interface PricePoint {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    adjustedClose: number;
    volume: number;
}

export interface CompanyInfo {
    symbol: string;
    companyName: string;
    sector: string;
    industry: string;
    marketCap: number;
    employees?: number;
    foundedYear?: number;
    headquarters?: string;
    businessDescription?: string;
    website?: string;
}

export interface IRAnnouncement {
    id: string;
    companyId: string;
    symbol: string;
    announcementType: 'EARNINGS' | 'DIVIDEND' | 'MERGER' | 'ACQUISITION' | 'PRODUCT_LAUNCH' | 'OTHER';
    title: string;
    content: string;
    announcementDate: Date;
    impactScore: number; // -1 to 1
    sentimentScore: number; // -1 to 1
    createdAt: Date;
}