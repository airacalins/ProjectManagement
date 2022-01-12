import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { TenantPayment } from '../models/tenantPayment';

class TenantPaymentStore {
  tenantPaymentRegistry = new Map<number, TenantPayment>();
  selectedTenantPayment: TenantPayment | undefined = undefined;
  loading = false;
  initialLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get tenantPayments() {
    return Array.from(this.tenantPaymentRegistry);
  }

  loadTenantPayments = async () => {
    this.setInitialLoading(true);
    try {
      const tenantPayments = await agent.TenantPayments.list();
      tenantPayments.forEach((tp) => {
        this.tenantPaymentRegistry.set(tp.id, tp);
        this.setInitialLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setInitialLoading(false);
      });
    }
  };

  loadTenantPayment = async (id: number) => {
    this.setInitialLoading(true);
    try {
      const tenantPayment = await agent.TenantPayments.details(id);
      runInAction(() => {
        this.selectedTenantPayment = tenantPayment;
        this.setInitialLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setInitialLoading(false);
      });
    }
  };

  setInitialLoading = (state: boolean) => {
    this.initialLoading = state;
  };

  selectTenantPayment = (id: number) => {
    this.selectedTenantPayment = this.tenantPaymentRegistry.get(id);
  };

  cancelSelectedTenantPayment = () => {
    this.selectedTenantPayment = undefined;
  };
}

export default TenantPaymentStore;
