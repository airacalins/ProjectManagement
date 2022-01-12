import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Announcement } from '../models/announcement';

class AnnouncementStore {
  announcementRegistry = new Map<number, Announcement>();
  selectedAnnouncement: Announcement | undefined = undefined;
  loading = false;
  initialLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get announcements() {
    return Array.from(this.announcementRegistry.values());
  }

  loadAnnouncements = async () => {
    this.setInitialLoading(true);
    try {
      const announcements = await agent.Announcements.list();
      announcements.forEach((announcement) => {
        this.announcementRegistry.set(announcement.id, announcement);
        this.setInitialLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setInitialLoading(false);
      });
    }
  };

  loadAnnouncement = async (id: number) => {
    this.setInitialLoading(true);
    try {
      const announcement = await agent.Announcements.details(id);
      runInAction(() => {
        this.selectedAnnouncement = announcement;
        this.setInitialLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setInitialLoading(false);
      });
    }
  };

  createAnnouncement = async (announcement: Announcement) => {
    this.setInitialLoading(true);
    try {
      await agent.Announcements.create(announcement);
      runInAction(() => {
        this.announcementRegistry.set(announcement.id, announcement);
        this.selectedAnnouncement = announcement;
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  updateAnnouncement = async (announcement: Announcement) => {
    this.setLoading(true);
    try {
      await agent.Announcements.update(announcement);
      runInAction(() => {
        this.announcementRegistry.set(announcement.id, announcement);
        this.selectedAnnouncement = announcement;
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  deleteAnnouncement = async (id: number) => {
    this.setLoading(true);
    try {
      await agent.Announcements.delete(id);
      runInAction(() => {
        this.announcementRegistry.delete(id);
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

  selectAnnouncement = (id: number) => {
    this.selectedAnnouncement = this.announcementRegistry.get(id);
  };

  cancelSelectedAnnouncement = () => {
    this.selectedAnnouncement = undefined;
  };
}

export default AnnouncementStore;
