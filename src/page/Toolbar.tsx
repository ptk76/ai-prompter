import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ActionCallbacks } from "./actions";
import { styleContainer } from "./ToolboxCss";
import Button from "./Button";

function Toolbar(props: {
  x: number;
  y: number;
  onTranslate: () => void;
  onCopy: () => void;
  onRephrase: () => void;
  onSummarize: () => void;
  onPerplexity: () => void;
  onSearch: () => void;
}) {
  return (
    <>
      <div
        style={{
          ...styleContainer,
          ...{
            top: props.y.toString() + "px",
            left: props.x.toString() + "px",
          },
        }}
      >
        <Button
          label="Translate"
          icon={"📋"}
          callback={props.onTranslate}
        ></Button>
        <Button label="Copy" icon={"⚡"} callback={props.onCopy}></Button>
        <Button label="Search" icon={"🔍"} callback={props.onSearch}></Button>
        <Button
          label="Rephrase"
          icon={"⚡"}
          callback={props.onRephrase}
        ></Button>
        <Button
          label="Summarize"
          icon={"⚙️"}
          callback={props.onSummarize}
        ></Button>
        <Button
          label="Perplexity"
          icon={"🔮"}
          callback={props.onPerplexity}
        ></Button>
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
        onPerplexity={cb.onGrammarly}
        onSearch={cb.onRephrase}
      />
    </StrictMode>
  );
}

export default createToolbar;
