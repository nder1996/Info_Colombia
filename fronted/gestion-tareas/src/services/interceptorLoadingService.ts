class LoadingStore {
  private isLoading: boolean = false;
  private listeners: (() => void)[] = [];

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  show() {
    this.isLoading = true;
    this.notify();
  }

  hide() {
    this.isLoading = false;
    this.notify();
  }

  getState() {
    return this.isLoading;
  }
}

export const loadingStore = new LoadingStore();
