import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ActionCallbacks } from "./actions";

const styleContainer = {
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  gap: "12px",
  background: "rgba(28, 28, 30, 0.95)",
  color: "rgba(255, 255, 255, 0.95)",
  borderColor: "rgba(255, 255, 255, 0.15)",
  borderRadius: "12px",
  backdropFilter: "blur(20px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  fontSize: "16px",
};

function Toolbar(props: {
  x: number;
  y: number;
  onTranslate: () => void;
  onCopy: () => void;
  onRephrase: () => void;
  onSummarize: () => void;
  onGrammarly: () => void;
}) {
  const offsetX = Math.max(0, props.x - 100 / 2);
  const offsetY = props.y + 10;
  return (
    <>
      <div
        className="containerArete"
        style={{
          ...{
            top: offsetY.toString() + "px",
            left: offsetX.toString() + "px",
            position: "absolute",
            wordBreak: "normal",
          },
          ...styleContainer,
        }}
      >
        <button onClick={props.onTranslate}>Translate</button>
        <button onClick={props.onCopy}>Copy</button>
        <button onClick={props.onRephrase}>Rephrase</button>
        <button onClick={props.onSummarize}>Summarize</button>
        <button onClick={props.onGrammarly}>Grammarly</button>
      </div>
    </>
  );
}

let rootNode: Root | null = null;

export function createToolbar(
  node: any,
  x: number,
  y: number,
  cb: ActionCallbacks
) {
  if (!rootNode) rootNode = createRoot(node);
  rootNode.render(
    <StrictMode>
      <Toolbar
        x={x}
        y={y}
        onTranslate={cb.onTranslate}
        onCopy={cb.onCopy}
        onRephrase={cb.onRephrase}
        onSummarize={cb.onSummarize}
        onGrammarly={cb.onGrammarly}
      />
    </StrictMode>
  );
}

export default createToolbar;
