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

class Settings {
  private storage: Storage;
  private settings: SettingsType | null = null;
  private saveInProgress = -1;

  constructor(storage: Storage) {
    this.storage = storage;
  }
  async init() {
    const settingFile = await this.storage.get("settings");
    if (settingFile) this.settings = JSON.parse(settingFile);
  }

  save(delay = 5000) {
    if (this.saveInProgress != -1) clearTimeout(this.saveInProgress);
    this.saveInProgress = setTimeout(() => {
      this.storage.set("settings", JSON.stringify(this.settings));
      this.saveInProgress = -1;
    }, delay);
  }

  getButtons() {
    if (!!!this.settings) return null;
    return this.settings?.buttons;
  }

  setButton(newButton: SettingsButtonType) {
    for (let button of this.settings!.buttons) {
      if (button.id === newButton.id) {
        button = newButton;
        this.save();
        return;
      }
    }
  }

  static async getInstance() {
    const storage = new Storage();
    const settings = new Settings(storage);
    await settings.init();
    return settings;
  }
}

export default Settings;
