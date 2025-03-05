export interface ChartDataPoint {
  date: string;
  revenue: number;
}

export interface Revenue {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  chartData: ChartDataPoint[];
}
