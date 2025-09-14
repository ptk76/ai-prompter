// Add a listener to create the initial context menu items,

import { onRephrase, onSummarize, onTranslate } from "../actions/aworker";

// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "translate",
    title: "Translate",
    type: "normal",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "summarize",
    title: "Summarize",
    type: "normal",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "rephrase",
    title: "Rephrase",
    type: "normal",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(
  (item: chrome.contextMenus.OnClickData) => {
    const tld = item.menuItemId;
    const url = new URL("https://www.perplexity.ai/search");
    switch (tld) {
      case "translate":
        onTranslate(item.selectionText ?? "");
        break;
      case "summarize":
        onSummarize(item.selectionText ?? "");
        break;
      case "rephrase":
        onRephrase(item.selectionText ?? "");
        break;
      default:
        url.searchParams.set("q", item.selectionText ?? "");
        break;
    }
  }
);
