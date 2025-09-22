import { closeToolbar } from "./page";

const urlProplexity = "https://www.perplexity.ai/search";
const urlGoogleSearch = "https://www.google.com/search";

function openNewTab(url: URL) {
  if (chrome.tabs) chrome.tabs.create({ url: url.href });
  else window.open(url, "_blank")?.focus();
}

export const onTranslate = (text: string) => {
  const url = new URL(urlProplexity);
  url.searchParams.set("q", `Translate the text into Polish: ${text}`);
  openNewTab(url);
  closeToolbar();
  if (chrome.tabs) chrome.tabs.create({ url: url.href });
  else window.open(url, "_blank")?.focus();
};

export const onCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  closeToolbar();
};

export const onSearch = (text: string) => {
  const url = new URL(urlGoogleSearch);
  url.searchParams.set("q", `${text}`);
  closeToolbar();
  openNewTab(url);
};

export const onSummarize = (text: string) => {
  const url = new URL(urlProplexity);
  url.searchParams.set("q", `Summarize the text: ${text}`);
  closeToolbar();
  openNewTab(url);
};

export const onGrammarly = (text: string) => {
  console.log("onGrammarly", text);
};

export type ActionCallbacks = {
  onCopy: () => void;
  onSearch: () => void;
  onGrammarly: () => void;
  onSummarize: () => void;
  onTranslate: () => void;
};
