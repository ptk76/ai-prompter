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

  constructor(storage: Storage) {
    this.storage = storage;
  }

  async getButtons(): Promise<SettingsButtonType[]> {
    const settingFile = await this.storage.get("settings");
    if (!settingFile) return [];

    try {
      const settings = JSON.parse(settingFile);
      return settings.buttons;
    } catch (_) {
      return [];
    }
  }
}

async function getButtons() {
  const storage = new Storage();
  const setting = new Settings(storage);
  return await setting.getButtons();
}

export default getButtons;
