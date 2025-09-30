interface StorageInterface {
  get(key: string): Promise<string | null>;
  set(key: string, data: string): void;
  remove(key: string): void;
}

class ApplicationStorage implements StorageInterface {
  get(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      resolve(localStorage.getItem(key));
    });
  }

  set(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

class ExtensionStorage implements StorageInterface {
  get(key: string): Promise<string> {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], function (result: any) {
        resolve(result[key]);
      });
    });
  }

  set(key: string, data: string): void {
    let dataObject: any = {};
    dataObject[key] = data;
    chrome.storage.local.set(dataObject);
  }

  remove(key: string): void {
    chrome.storage.local.remove(key);
  }
}

class Storage {
  storage: StorageInterface;

  constructor() {
    this.storage = chrome.storage
      ? new ExtensionStorage()
      : new ApplicationStorage();
  }
  get(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      resolve(this.storage.get(key));
    });
  }

  set(key: string, data: string): void {
    this.storage.set(key, data);
  }

  remove(key: string): void {
    this.storage.remove(key);
  }
}

export default Storage;
