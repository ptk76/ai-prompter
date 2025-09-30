import Storage from "./storage";
import defaultSettings from "./settings_def.json";

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

class SettingDatabase {
  private storage: Storage;
  private settings: SettingsType = defaultSettings;
  private saveInProgress = -1;

  constructor() {
    this.storage = new Storage();
  }
  async init() {
    const settingFile = await this.storage.get("settings");
    if (!settingFile) {
      this.storage.set("settings", JSON.stringify(defaultSettings));
    } else {
      this.settings = JSON.parse(settingFile);
      if (this.settings.version != defaultSettings.version) {
        // TO DO - converter
        this.settings = defaultSettings;
      }
    }
  }

  save(delay = 5000) {
    if (this.saveInProgress != -1) clearTimeout(this.saveInProgress);
    this.saveInProgress = setTimeout(() => {
      this.storage.set("settings", JSON.stringify(this.settings));
      this.saveInProgress = -1;
    }, delay);
  }

  getButtons() {
    return this.settings.buttons;
  }

  setButton(newButton: SettingsButtonType) {
    for (let button of this.settings.buttons) {
      console.log("BUTTON", button.id, button.label);
      if (button.id === newButton.id) {
        button = newButton;
        console.log("NEW", button, this.settings);
        this.save();
        return;
      }
    }
  }
}

export default SettingDatabase;
