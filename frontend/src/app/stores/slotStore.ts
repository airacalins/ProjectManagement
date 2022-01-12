import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Slot } from '../models/slot';

class SlotStore {
  slotRegistry = new Map<number, Slot>();
  selectedSlot: Slot | undefined = undefined;
  loading = false;
  initialLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get slots() {
    return Array.from(this.slotRegistry.values());
  }

  get availableSlots() {
    return Array.from(this.slotRegistry.values()).filter(
      (s: Slot) => !s.tenantContract
    );
  }

  loadSlots = async () => {
    this.setInitialLoading(true);
    try {
      const slots = await agent.Slots.list();
      const sortedSlots = slots.sort((a: Slot, b: Slot) =>
        a.slotNumber > b.slotNumber ? 1 : -1
      );
      sortedSlots.forEach((slot) => {
        this.slotRegistry.set(slot.id, slot);
        this.setInitialLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setInitialLoading(false);
      });
    }
  };

  loadSlot = async (id: number) => {
    this.setInitialLoading(true);
    try {
      const slot = await agent.Slots.details(id);
      runInAction(() => {
        this.selectedSlot = slot;
        this.setInitialLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setInitialLoading(false);
      });
    }
  };

  createSlot = async (slot: Slot) => {
    this.setLoading(true);
    try {
      await agent.Slots.create(slot);
      runInAction(() => {
        this.slotRegistry.set(slot.id, slot);
        this.selectedSlot = slot;
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  updateSlot = async (slot: Slot) => {
    this.setLoading(true);
    try {
      await agent.Slots.update(slot);
      runInAction(() => {
        this.slotRegistry.set(slot.id, slot);
        this.selectedSlot = slot;
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  deleteSlot = async (id: number) => {
    this.setLoading(true);
    try {
      await agent.Slots.delete(id);
      runInAction(() => {
        this.slotRegistry.delete(id);
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

  selectSlot = (id: number) => {
    this.selectedSlot = this.slotRegistry.get(id);
  };

  cancelSelectedSlot = () => {
    this.selectedSlot = undefined;
  };
}

export default SlotStore;
