import Storage from "./storage";

export type SettingsButtonType = {
  id: number;
  icon: any;
  label: string;
  url: string;
  type: string;
  disabled: boolean;
};

export type WhitelistType = {
  pattern: string;
};

class Settings {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  async getActions(): Promise<SettingsButtonType[]> {
    const settingFile = await this.storage.get("settings");
    if (!settingFile) return [];

    try {
      const settings = JSON.parse(settingFile);
      return settings.buttons;
    } catch (_) {
      return [];
    }
  }
  async getWhitelist(): Promise<WhitelistType[]> {
    const whitelistFile = await this.storage.get("whitelist");
    if (!whitelistFile) return [];

    try {
      const whitelist = JSON.parse(whitelistFile);
      return whitelist.urls;
    } catch (_) {
      return [];
    }
  }
}

export async function getActions() {
  const storage = new Storage();
  const setting = new Settings(storage);
  return await setting.getActions();
}

export async function getWhitelist() {
  const storage = new Storage();
  const setting = new Settings(storage);
  return await setting.getWhitelist();
}
