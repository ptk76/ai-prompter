import Storage from "./storage";
type Setting = {
  icon: any;
  name: string;
  url: string;
};
const defaultSettings: Setting[] = [
  { icon: "📋", name: "Copy", url: "COPY" },
  { icon: "🔍", name: "Search", url: "https://www.google.com/search?q=%s" },
  {
    icon: "🔮",
    name: "Perplexity",
    url: 'https://www.perplexity.ai/search?q="Translate the text into Polish: %s"',
  },
  {
    icon: "⚡",
    name: "Custom",
    url: 'https://www.perplexity.ai/search?q="Summarize the text: %s"',
  },
  { icon: "⚙️", name: "Settings", url: "SETTINGS" },
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
}

export default SettingDatabase;
