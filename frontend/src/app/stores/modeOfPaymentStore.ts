import { makeAutoObservable, runInAction } from 'mobx';
import { ModeOfPayment } from '../models/modeOfPayment';
import agent from '../api/agent';

class ModeOfPaymentStore {
  modeOfPaymentRegistry = new Map<number, ModeOfPayment>();
  selectedModeOfPayment: ModeOfPayment | undefined = undefined;
  loading = false;
  initialLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get modeOfPayments() {
    return Array.from(this.modeOfPaymentRegistry.values());
  }

  loadModeOfPayments = async () => {
    this.setInitialLoading(true);
    try {
      const modeOfPayments = await agent.ModeOfPayments.list();
      modeOfPayments.forEach((modeOfPayment) => {
        this.modeOfPaymentRegistry.set(modeOfPayment.id, modeOfPayment);
        this.setInitialLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setInitialLoading(false);
      });
    }
  };

  loadModeOfPayment = async (id: number) => {
    this.setInitialLoading(true);
    try {
      const modeOfPayment = await agent.ModeOfPayments.details(id);
      runInAction(() => {
        this.selectedModeOfPayment = modeOfPayment;
        this.setInitialLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setInitialLoading(false);
      });
    }
  };

  createModeOfPayment = async (modeOfPayment: ModeOfPayment) => {
    this.setLoading(true);
    try {
      await agent.ModeOfPayments.create(modeOfPayment);
      runInAction(() => {
        this.modeOfPaymentRegistry.set(modeOfPayment.id, modeOfPayment);
        this.selectedModeOfPayment = modeOfPayment;
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  updateModeOfPayment = async (modeOfPayment: ModeOfPayment) => {
    this.setLoading(true);
    try {
      await agent.ModeOfPayments.update(modeOfPayment);
      runInAction(() => {
        this.modeOfPaymentRegistry.set(modeOfPayment.id, modeOfPayment);
        this.selectedModeOfPayment = modeOfPayment;
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  deleteModeOfPayment = async (id: number) => {
    this.setLoading(true);
    try {
      await agent.ModeOfPayments.delete(id);
      runInAction(() => {
        this.modeOfPaymentRegistry.delete(id);
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  setInitialLoading = (state: boolean) => {
    this.initialLoading = state;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  selectModeOfPayment = (id: number) => {
    this.selectedModeOfPayment = this.modeOfPaymentRegistry.get(id);
  };

  cancelModeOfPayment = () => {
    this.selectedModeOfPayment = undefined;
  };
}

export default ModeOfPaymentStore;
