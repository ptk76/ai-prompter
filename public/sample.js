// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(async () => {
      chrome.contextMenus.create({
        id: 'firsd',
        title: "ala ma kota",
        type: 'normal',
        contexts: ['selection']
      });
  });

  chrome.contextMenus.onClicked.addListener((item, tab) => {
    const tld = item.menuItemId;
    const url = new URL(`https://google.${tld}/search`);
    url.searchParams.set('q', item.selectionText);
    chrome.tabs.create({ url: url.href, index: tab.index + 1 });
  });
  