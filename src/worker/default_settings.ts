import DEFAULT_ACTIONS from "./default_actions.json";
import DEFAULT_WHITELIST from "./default_whitelist.json";

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

  installActions() {
    this.storage.set("settings", JSON.stringify(DEFAULT_ACTIONS));
  }

  installWhitelist() {
    this.storage.set("whitelist", JSON.stringify(DEFAULT_WHITELIST));
  }

  async updateActions() {
    const settingFile = await this.storage.get("settings");
    if (!!!settingFile) {
      this.installActions();
      return;
    }
    try {
      const settings = JSON.parse(settingFile);
      if (settings.version !== DEFAULT_ACTIONS.version) {
        // TO DO - converter
        this.installActions();
      }
    } catch {
      this.installActions();
    }
  }

  async updateWhitelist() {
    const whitelistFile = await this.storage.get("whitelist");
    if (!!!whitelistFile) {
      this.installWhitelist();
      return;
    }
    try {
      const settings = JSON.parse(whitelistFile);
      if (settings.version !== DEFAULT_WHITELIST.version) {
        // TO DO - converter
        this.installWhitelist();
      }
    } catch {
      this.installWhitelist();
    }
  }
}

function getDefaultSettings() {
  return new DefaultSettings(new Storage());
}

export default getDefaultSettings;
