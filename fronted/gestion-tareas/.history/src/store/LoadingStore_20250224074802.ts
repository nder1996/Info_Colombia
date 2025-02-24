type Listener = () => void;

class LoadingStore {
    private isLoading: boolean = false;
    private listeners: (() => void)[] = [];
  
    subscribe(listener: () => void) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  
    show() {
      this.isLoading = true;
      this.listeners.forEach(listener => listener());
    }
  
    hide() {
      this.isLoading = false;
      this.listeners.forEach(listener => listener());
    }
  
    getState() {
      return this.isLoading;
    }
}

export const loadingStore = new LoadingStore();