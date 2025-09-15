import { createToolbar } from "./Toolbar";
import {
  onCopy,
  onRephrase,
  onGrammarly,
  onSummarize,
  onTranslate,
  type ActionCallbacks,
} from "./actions";

const rootNodeId = "arete-ai-prompter-root";
const rootNode = document.createElement("div");
rootNode.id = rootNodeId;
rootNode.style.position = "absolute";
rootNode.style.zIndex = "1000";
rootNode.style.top = "0px";
rootNode.style.left = "0px";

function isAiPrompter(element: HTMLElement | null, depth = 0) {
  if (depth === 5) return false;
  if (!element) return false;
  if (element.id === rootNodeId) return true;
  return isAiPrompter(element.parentElement, depth + 1);
}

export function closeToolbar() {
  const node = document.getElementById(rootNodeId);
  if (node) node.remove();
}

document.onmousedown = (ev) => {
  if (isAiPrompter(ev.target as HTMLElement)) return;
  closeToolbar();
};

document.onmouseup = (ev) => {
  const target = ev.target as HTMLElement;
  if (isAiPrompter(target)) return;
  const selection = window.getSelection();
  if (!selection) return;

  const selectedText = selection.toString();
  if (!selectedText || selectedText === "") return;

  target.append(rootNode);

  const cb: ActionCallbacks = {
    onCopy: () => {
      onCopy(selectedText);
    },
    onRephrase: () => {
      onRephrase(selectedText);
    },
    onGrammarly: () => {
      onGrammarly(selectedText);
    },
    onSummarize: () => {
      onSummarize(selectedText);
    },
    onTranslate: () => {
      onTranslate(selectedText);
    },
  };
  createToolbar(rootNode, ev.clientX, ev.clientY, cb);
};
