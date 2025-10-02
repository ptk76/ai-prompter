interface StorageInterface {
  get(key: string): Promise<string | null>;
}

class ApplicationStorage implements StorageInterface {
  get(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      resolve(localStorage.getItem(key));
    });
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
}

export default Storage;
