import getDefaultSettings from "./default_settings";

chrome.runtime.onInstalled.addListener(async (details: any) => {
  const settings = getDefaultSettings();
  if (details.reason === "install") {
    settings.install();
  } else {
    await settings.update();
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type == "open-settings")
    chrome.tabs.create({ url: chrome.runtime.getURL("/settings.html") });
  sendResponse();
});
