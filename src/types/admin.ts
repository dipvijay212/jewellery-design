export interface AdminKpi {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  iconName: string;
}

export interface VaultInventoryAlert {
  id: string;
  productName: string;
  sku: string;
  currentStock: number;
  reorderThreshold: number;
  status: 'critical' | 'low' | 'adequate';
  category: string;
  valuation: number;
}

export interface AdminDashboardData {
  kpis: AdminKpi[];
  recentOrdersCount: number;
  lowStockItemsCount: number;
  vaultTotalValuation: number;
  monthlyRevenue: number[];
}
