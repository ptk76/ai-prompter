function openNewTab(url: URL) {
  if (chrome.tabs) chrome.tabs.create({ url: url.href });
  else window.open(url, "_blank")?.focus();
}

class Actions {
  static onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  static onSettings = () => {
    chrome.runtime.sendMessage({
      type: "open-settings",
    });
  };

  static openUrl(url: string, text: string) {
    if (url.includes("%s")) {
      const finalUrl = url.replace("%s", encodeURI(text));
      openNewTab(new URL(finalUrl));
    }
  }

  static callback(url: string, text: string) {
    if (url === "SETTINGS") Actions.onSettings();
    else if (url === "COPY") Actions.onCopy(text);
    else Actions.openUrl(url, text);
  }
}

export default Actions;
