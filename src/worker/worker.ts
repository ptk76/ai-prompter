chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.type == "open-settings")
    chrome.tabs.create({ url: chrome.runtime.getURL("/settings.html") });
  sendResponse();
});
