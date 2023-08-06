interface MonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
}

interface DailyData {
  date: string;
  totalSales: number;
  totalUnits: number;
}

export interface ProductStat {
  id: string;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export default interface ProductWithStats {
  product: Product;
  productStat: ProductStat;
}
