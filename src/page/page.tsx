import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Toolbar from "./Toolbar.tsx";
import {
  onCopy,
  onRephrase,
  onGrammarly,
  onSummarize,
  onTranslate,
} from "../actions/apage.ts";

const rootNodeId = "arete-ai-prompter-root";
const rootNode = document.createElement("div");
rootNode.setAttribute("id", rootNodeId);

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
  if (isAiPrompter(ev.target as HTMLElement)) return;
  const selection = window.getSelection();
  if (!selection) return;

  const selectedText = selection.toString();
  if (!selectedText || selectedText === "") return;

  document.body.append(rootNode);

  const range = selection.getRangeAt(0);
  const selectionRect = range.getBoundingClientRect();

  createRoot(rootNode).render(
    <StrictMode>
      <Toolbar
        x={selectionRect.right}
        y={selectionRect.bottom}
        onTranslate={() => onTranslate(selectedText)}
        onCopy={() => onCopy(selectedText)}
        onRephrase={() => onRephrase(selectedText)}
        onSummarize={() => onSummarize(selectedText)}
        onGrammarly={() => onGrammarly(selectedText)}
      />
    </StrictMode>
  );
};
