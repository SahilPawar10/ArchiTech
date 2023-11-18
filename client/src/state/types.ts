export interface KPI {
  insight_summary: InsightSummary;
  category_distribution: CategoryDistribution;
  response_times: ResponseTimes;
  user_satisfaction: UserSatisfaction;
  usage_statistics: UsageStatistics;
}

export interface InsightSummary {
  total_queries: number;
  successful_queries: number;
  failed_queries: number;
  average_response_time: number;
}

export interface CategoryDistribution {
  small_talk: number;
  technical_support: number;
  sales_inquiries: number;
  customer_service: number;
}

export interface ResponseTimes {
  day_wise: DayWise[];
  week_wise: WeekWise[];
}

export interface DayWise {
  date: string;
  average_time: number;
}

export interface WeekWise {
  week: string;
  average_time: number;
}

export interface UserSatisfaction {
  ratings: Rating[];
}

export interface Rating {
  rating: number;
  count: number;
}

export interface UsageStatistics {
  by_platform: ByPlatform;
  by_country: ByCountry;
}

export interface ByPlatform {
  iOS: number;
  Android: number;
  Web: number;
}

export interface ByCountry {
  USA: number;
  India: number;
  Germany: number;
  Japan: number;
  Brazil: number;
}
