import Storage from "./storage";
type Setting = {
  icon: any;
  label: string;
  url: string;
};
const defaultSettings: Setting[] = [
  { icon: "📋", label: "Copy", url: "COPY" },
  { icon: "🔍", label: "Search", url: "https://www.google.com/search?q=%s" },
  {
    icon: "🔮",
    label: "Perplexity",
    url: 'https://www.perplexity.ai/search?q="Translate the text into Polish: %s"',
  },
  {
    icon: "⚡",
    label: "Custom",
    url: 'https://www.perplexity.ai/search?q="Summarize the text: %s"',
  },
  { icon: "⚙️", label: "Settings", url: "SETTINGS" },
];

class SettingDatabase {
  storage: Storage;
  settings = defaultSettings;
  constructor() {
    this.storage = new Storage();
  }
  async init() {
    const settingFile = await this.storage.get("settings");
    if (settingFile === null) {
      this.storage.set("settings", JSON.stringify(defaultSettings));
    } else {
      this.settings = JSON.parse(settingFile);
    }
  }

  get() {
    return this.settings;
  }
}

export default SettingDatabase;
