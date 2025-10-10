import Actions from "./actions";
import type { ButtonProps } from "./button";
import createToolbar from "./toolbar";
import getSettingButtons from "./settings";

const rootNodeId = "arete-ai-prompter-root";
const rootNode = document.createElement("arete-ai-prompter-root");
rootNode.id = rootNodeId;
rootNode.style.position = "absolute";
rootNode.style.zIndex = "1000";
rootNode.style.top = "0px";
rootNode.style.left = "0px";
rootNode.style.userSelect = "none";
const shadowRoot = rootNode.attachShadow({ mode: "open" });

function isAiPrompter(element: HTMLElement | null, depth = 0) {
  if (depth === 5) return false;
  if (!element) return false;
  if (element.id === rootNodeId) return true;
  return isAiPrompter(element.parentElement, depth + 1);
}

async function doNotShow() {
  if (window.location.href.includes("docs.google.com/spreadsheets"))
    return true;
  return false;
}

export function closeToolbar() {
  rootNode.remove();
  shadowRoot.innerHTML = "";
}

document.onmousedown = (ev) => {
  if (isAiPrompter(ev.target as HTMLElement)) return;
  closeToolbar();
};

async function getButtons() {
  const settingButtons = await getSettingButtons();
  if (settingButtons.length === 0) {
    const responce = await chrome.runtime.sendMessage({ type: "fix-settings" });
    if (responce !== "settings-ready") return [];
    return await getSettingButtons();
  }
  return settingButtons;
}

document.onmouseup = async (ev: MouseEvent) => {
  const target = ev.target as HTMLElement;
  if (isAiPrompter(target)) return;
  const selection = window.getSelection();
  if (!selection) return;

  const selectedText = selection.toString();
  if (!selectedText || selectedText === "") return;

  if (await doNotShow()) return;

  const settingButtons = await getButtons();
  if (settingButtons.length === 0) return;

  let buttons: ButtonProps[] = [];
  for (const button of settingButtons) {
    if (button.disabled) continue;
    buttons.push({
      icon: button.icon,
      label: button.label,
      url: button.url,
      cb: (url: string) => {
        closeToolbar();
        Actions.callback(url, selectedText);
      },
    });
  }
  document.body.append(rootNode);
  const iconOnly =
    target.nodeName === "INPUT" || target.nodeName === "TEXTAREA";
  const targetBox = target.getBoundingClientRect();
  const x = iconOnly ? targetBox.x + targetBox.width - 30 : ev.pageX;
  const y = iconOnly ? targetBox.y + 4 : ev.pageY;
  createToolbar(shadowRoot, x, y, buttons, iconOnly);
};

document.onkeydown = () => {
  closeToolbar();
};
