import DEFAULT_ACTIONS from "./default_actions.json";
import DEFAULT_BLACKLIST from "./default_blacklist.json";

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

  installBlacklist() {
    this.storage.set("blacklist", JSON.stringify(DEFAULT_BLACKLIST));
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

  async updateBlacklist() {
    const blacklistFile = await this.storage.get("blacklist");
    if (!!!blacklistFile) {
      this.installBlacklist();
      return;
    }
    try {
      const settings = JSON.parse(blacklistFile);
      if (settings.version !== DEFAULT_BLACKLIST.version) {
        // TO DO - converter
        this.installBlacklist();
      }
    } catch {
      this.installBlacklist();
    }
  }
}

function getDefaultSettings() {
  return new DefaultSettings(new Storage());
}

export default getDefaultSettings;
