import Actions from "./actions";
import type { ButtonProps } from "./button";
import createToolbar from "./toolbar";
import SettingDatabase from "./settings";

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

export function closeToolbar() {
  rootNode.remove();
  shadowRoot.innerHTML = "";
}

document.onmousedown = (ev) => {
  if (isAiPrompter(ev.target as HTMLElement)) return;
  closeToolbar();
};

document.onmouseup = async (ev) => {
  const target = ev.target as HTMLElement;
  if (isAiPrompter(target)) return;
  const selection = window.getSelection();
  if (!selection) return;

  const selectedText = selection.toString();
  if (!selectedText || selectedText === "") return;

  const settings = new SettingDatabase();
  await settings.init();

  let buttons: ButtonProps[] = [];
  for (const button of settings.getButtons()) {
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
  createToolbar(shadowRoot, ev.pageX, ev.pageY, buttons);
};
