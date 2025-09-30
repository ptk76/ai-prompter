import DEFAULT_SETTINGS from "./default_settings.json";

class Storage {
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
}

class DefaultSettings {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  install() {
    this.storage.set("settings", JSON.stringify(DEFAULT_SETTINGS));
  }

  async update() {
    const settingFile = await this.storage.get("settings");
    if (!!!settingFile) {
      this.install();
      return;
    }
    try {
      const settings = JSON.parse(settingFile);
      if (settings.version !== DEFAULT_SETTINGS.version) {
        // TO DO - converter
        this.install();
      }
    } catch {
      this.install();
    }
  }
}

function getDefaultSettings() {
  return new DefaultSettings(new Storage());
}

export default getDefaultSettings;
