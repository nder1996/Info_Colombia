// src/store/loadingStore.ts

type Listener = () => void;

class LoadingStore {
  private isLoading: boolean = false;
  private listeners: Listener[] = [];
  private requestCount: number = 0;  // Para manejar múltiples peticiones simultáneas

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  show() {
    this.requestCount++;
    if (!this.isLoading) {
      this.isLoading = true;
      this.notify();
    }
  }

  hide() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.isLoading = false;
      this.notify();
    }
  }

  getState() {
    return this.isLoading;
  }
}

export const loadingStore = new LoadingStore();