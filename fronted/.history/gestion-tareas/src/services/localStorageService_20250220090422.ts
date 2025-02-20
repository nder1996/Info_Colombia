export class LocalStarogeService{
  /**
   * Saves data to localStorage with the specified key
   * @param key - The key to store the data under
   * @param value - The data to store (will be JSON stringified)
   */
  public static save(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Retrieves data from localStorage by key
   * @param key - The key to retrieve data for
   * @param defaultValue - Optional default value if key doesn't exist
   * @returns The parsed data or defaultValue if not found
   */
  public static get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error retrieving from localStorage:', error);
      return defaultValue;
    }
  }


  
  public static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

 
  public static exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

 
  public static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }


  public static update(key: string, value: any): void {
    try {
      const existingValue = this.get(key, {});
      const updatedValue = { ...existingValue, ...value };
      this.save(key, updatedValue);
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }


  public static getAllKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }
}