import { AdminKpi, VaultInventoryAlert, AdminDashboardData } from '@/types/admin';

export const mockAdminKpis: AdminKpi[] = [
  {
    id: 'kpi-rev',
    title: 'Gross Vault Revenue',
    value: '₹14,82,900',
    change: '+18.4% vs last month',
    isPositive: true,
    timeframe: 'Current Quarter Q4',
    iconName: 'DollarSign',
  },
  {
    id: 'kpi-aov',
    title: 'Average Order Value (AOV)',
    value: '₹28,450',
    change: '+7.2% vs last month',
    isPositive: true,
    timeframe: 'High Jewellery Suite Demand',
    iconName: 'Sparkles',
  },
  {
    id: 'kpi-orders',
    title: 'Atelier Commissions & Orders',
    value: '52',
    change: '+12.5%',
    isPositive: true,
    timeframe: '34 Completed, 18 in Vault/Transit',
    iconName: 'Package',
  },
  {
    id: 'kpi-valuation',
    title: 'Total Secured Vault Inventory',
    value: '₹48,90,000',
    change: '32 Active Masterpieces',
    isPositive: true,
    timeframe: 'Fully Insured via Lloyd\'s',
    iconName: 'ShieldCheck',
  },
];

export const mockVaultAlerts: VaultInventoryAlert[] = [
  {
    id: 'alt-001',
    productName: 'Sovereign Burmese Ruby & Diamond Ring',
    sku: 'AUR-RNG-005-RG',
    currentStock: 1,
    reorderThreshold: 2,
    status: 'critical',
    category: 'Rings',
    valuation: 52000,
  },
  {
    id: 'alt-002',
    productName: 'Imperial Colombian Emerald & Diamond Collier',
    sku: 'AUR-NCK-002-PT',
    currentStock: 2,
    reorderThreshold: 3,
    status: 'low',
    category: 'Necklaces',
    valuation: 92000,
  },
  {
    id: 'alt-003',
    productName: 'Nocturne Ceylon Sapphire & Diamond Cuff',
    sku: 'AUR-HJW-008-WG',
    currentStock: 1,
    reorderThreshold: 2,
    status: 'critical',
    category: 'High Jewellery',
    valuation: 38000,
  },
];

export const mockDashboardData: AdminDashboardData = {
  kpis: mockAdminKpis,
  recentOrdersCount: 4,
  lowStockItemsCount: 3,
  vaultTotalValuation: 4890000,
  monthlyRevenue: [840000, 920000, 1150000, 1482900],
};
