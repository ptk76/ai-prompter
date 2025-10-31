import Storage from "./storage";

export type SettingsButtonType = {
  id: number;
  icon: any;
  label: string;
  url: string;
  type: string;
  disabled: boolean;
};

export type BlacklistType = {
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
  async getBlacklist(): Promise<BlacklistType[]> {
    const blacklistFile = await this.storage.get("blacklist");
    if (!blacklistFile) return [];

    try {
      const blacklist = JSON.parse(blacklistFile);
      return blacklist.urls;
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

export async function getBlacklist() {
  const storage = new Storage();
  const setting = new Settings(storage);
  return await setting.getBlacklist();
}
