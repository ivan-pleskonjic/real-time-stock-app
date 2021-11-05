export interface Stock {
    name: string;
    price: string;
    dailyHighPrice: string;
    dailyLowPrice: string;
    fiftyTwoWeekHighPrice: string;
    fiftyTwoWeekLowPrice: string;
    decrease?: boolean;
}