import { AdminDashboardData, VaultInventoryAlert } from '@/types/admin';
import { mockDashboardData, mockVaultAlerts } from '@/data/mockAdmin';

export interface IAdminService {
  getDashboardData(): Promise<AdminDashboardData>;
  getVaultAlerts(): Promise<VaultInventoryAlert[]>;
}

class MockAdminService implements IAdminService {
  private simulateDelay(_ms: number = 0): Promise<void> {
    return Promise.resolve();
  }

  async getDashboardData(): Promise<AdminDashboardData> {
    await this.simulateDelay();
    return { ...mockDashboardData };
  }

  async getVaultAlerts(): Promise<VaultInventoryAlert[]> {
    await this.simulateDelay();
    return [...mockVaultAlerts];
  }
}

export const adminService: IAdminService = new MockAdminService();
