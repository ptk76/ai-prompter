import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ActionCallbacks } from "./actions";
import { styleContainer } from "./ToolboxCss";
import Button from "./Button";

function Toolbar(props: { x: number; y: number; cb: ActionCallbacks }) {
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
        <Button label="Copy" icon={"📋"} callback={props.cb.onCopy}></Button>
        <Button
          label="Search"
          icon={"🔍"}
          callback={props.cb.onSearch}
        ></Button>
        <Button
          label="Perplexity"
          icon={"🔮"}
          callback={props.cb.onSummarize}
        ></Button>
        <Button
          label="Custom"
          icon={"⚡"}
          callback={props.cb.onTranslate}
        ></Button>
        <Button
          label="Settings"
          icon={"⚙️"}
          callback={props.cb.onSummarize}
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
      <Toolbar x={x} y={y} cb={cb} />
    </StrictMode>
  );
}

export default createToolbar;
