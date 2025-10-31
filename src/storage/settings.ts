import Storage from "./storage";

export type SettingsButtonType = {
  id: number;
  icon: any;
  label: string;
  url: string;
  type: string;
  disabled: boolean;
};

export type SettingsType = {
  version: number;
  buttons: SettingsButtonType[];
};

type BlacklistType = {
  version: number;
  urls: BlacklistUrlType[];
};

export type BlacklistUrlType = {
  pattern: string;
  default: boolean;
};

class Settings {
  private storage: Storage;
  private settings: SettingsType | null = null;
  private blacklist: BlacklistType | null = null;
  private saveInProgress = -1;

  constructor(storage: Storage) {
    this.storage = storage;
  }
  async init() {
    const settingFile = await this.storage.get("settings");
    if (settingFile) this.settings = JSON.parse(settingFile);
    const blacklistFile = await this.storage.get("blacklist");
    if (blacklistFile) this.blacklist = JSON.parse(blacklistFile);
  }

  save(delay = 5000) {
    if (this.saveInProgress != -1) clearTimeout(this.saveInProgress);
    this.saveInProgress = setTimeout(() => {
      this.storage.set("settings", JSON.stringify(this.settings));
      this.saveInProgress = -1;
    }, delay);
  }

  saveBlacklist() {
    this.storage.set("blacklist", JSON.stringify(this.blacklist));
  }

  getButtons() {
    if (!!!this.settings) return null;
    return this.settings.buttons;
  }

  setButton(newButton: SettingsButtonType) {
    if (!!!this.settings) return;
    this.settings.buttons[newButton.id] = newButton;
    this.save(1000);
  }

  getBlacklist() {
    if (!!!this.blacklist) return null;
    return this.blacklist.urls;
  }

  addToBlacklist(newUrl: BlacklistUrlType) {
    console.debug("ADD", newUrl);
    if (!!!this.blacklist) return;
    const index = this.blacklist.urls.length;
    this.blacklist.urls[index] = newUrl;
    console.debug("new wl", this.blacklist);
    this.saveBlacklist();
  }

  reorderButtons(startIndex: number, endIndex: number) {
    if (!!!this.settings) return;
    const newOrder = Array.from(this.settings.buttons);
    const [removed] = newOrder.splice(startIndex, 1);
    newOrder.splice(endIndex, 0, removed);
    this.settings.buttons = newOrder.map((button, index) => {
      button.id = index;
      return button;
    });
    this.save(0);
  }

  static async getInstance() {
    const storage = new Storage();
    const settings = new Settings(storage);
    await settings.init();
    return settings;
  }
}

export default Settings;
