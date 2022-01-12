import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Tenant } from '../models/tenant';

class TenantStore {
  tenantRegistry = new Map<number, Tenant>();
  selectedTenant: Tenant | undefined = undefined;
  loading = false;
  initialLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get tenants() {
    return Array.from(this.tenantRegistry.values());
  }

  loadTenants = async () => {
    this.setInitialLoading(true);
    try {
      const tenants = await agent.Tenants.list();
      tenants.forEach((tenant) => {
        this.tenantRegistry.set(tenant.id, tenant);
      });
      this.setInitialLoading(false);
    } catch (error) {
      console.log(error);
      this.setInitialLoading(false);
    }
  };

  loadTenant = async (id: number) => {
    this.setInitialLoading(true);
    try {
      const tenant = await agent.Tenants.details(id);
      runInAction(() => {
        this.selectedTenant = tenant;
        this.setInitialLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setInitialLoading(false);
      });
    }
  };

  createTenant = async (tenant: Tenant) => {
    this.setLoading(true);
    try {
      await agent.Tenants.create(tenant);
      runInAction(() => {
        this.tenantRegistry.set(tenant.id, tenant);
        this.selectedTenant = tenant;
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  updateTenant = async (tenant: Tenant) => {
    this.setLoading(true);
    try {
      await agent.Tenants.update(tenant);
      runInAction(() => {
        this.tenantRegistry.set(tenant.id, tenant);
        this.selectedTenant = tenant;
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  deleteTenant = async (id: number) => {
    this.setLoading(true);
    try {
      await agent.Tenants.delete(id);
      runInAction(() => {
        this.tenantRegistry.delete(id);
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  setInitialLoading = (state: boolean) => {
    this.initialLoading = state;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  selectTenant = (id: number) => {
    this.selectedTenant = this.tenantRegistry.get(id);
  };

  cancelSelectedTenant = () => {
    this.selectedTenant = undefined;
  };
}

export default TenantStore;
