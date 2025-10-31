import getDefaultSettings from "./default_settings";

chrome.runtime.onInstalled.addListener(async (details: any) => {
  const settings = getDefaultSettings();
  if (details.reason === "install") {
    settings.installActions();
    settings.installBlacklist();
  } else {
    await settings.updateActions();
    await settings.updateBlacklist();
  }
  return true;
});

chrome.runtime.onMessage.addListener(async (request, _, sendResponse) => {
  if (request.type === "open-settings") {
    openSettingPage();
    sendResponse();
  } else if (request.type === "fix-actions") {
    const settings = getDefaultSettings();
    settings.installActions();
    sendResponse("settings-ready");
  } else if (request.type === "fix-blacklist") {
    const settings = getDefaultSettings();
    settings.installBlacklist();
    sendResponse("settings-ready");
  }
});

chrome.action.onClicked.addListener(() => {
  openSettingPage();
});

function getSettingTabId(windowId: number | undefined) {
  if (windowId === undefined) return -1;
  return new Promise<number>(async (resolve) => {
    const tabs = await chrome.tabs.query({ windowId: windowId });
    for (const tab of tabs) {
      console.log("TAB", tab, chrome.runtime.getURL(""));
      if (tab.url?.includes(chrome.runtime.getURL(""))) {
        chrome.windows.update(windowId, { focused: true });
        const id: number = tab.id ? tab.id : -1;
        chrome.tabs.update(id, { active: true });
        resolve(id);
        return;
      }
    }
    resolve(-1);
  });
}

async function openSettingPage() {
  const windows = await chrome.windows.getAll();

  for (const window of windows) {
    const settingTabId = await getSettingTabId(window.id);
    if (settingTabId !== -1) return;
  }
  chrome.tabs.create({ url: chrome.runtime.getURL("/settings.html") });
}
