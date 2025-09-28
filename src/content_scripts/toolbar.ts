import Button, { type ButtonProps } from "./button";

class Toolbar {
  private rootNode: HTMLDivElement;
  constructor(x: number, y: number, buttons: ButtonProps[]) {
    this.rootNode = document.createElement("div");
    this.rootNode.className = "toolbar";
    this.rootNode.style.top = y.toString() + "px";
    this.rootNode.style.left = x.toString() + "px";

    for (const buttonProps of buttons) {
      const button = new Button(buttonProps);
      this.rootNode.appendChild(button.get());
    }
  }

  get() {
    return this.rootNode;
  }
}
// function Toolbar(props: { x: number; y: number; cb: ActionCallbacksType }) {
//   return (
//     <>
//       <div
//         className="toolbar"
//         style={{
//           ...styleContainer,
//           ...{
//             top: props.y.toString() + "px",
//             left: props.x.toString() + "px",
//           },
//         }}
//       >
//         <Button label="Copy" icon={"📋"} callback={props.cb.onCopy}></Button>
//         <Button
//           label="Search"
//           icon={"🔍"}
//           callback={props.cb.onSearch}
//         ></Button>
//         <Button
//           label="Perplexity"
//           icon={"🔮"}
//           callback={props.cb.onSummarize}
//         ></Button>
//         <Button
//           label="Custom"
//           icon={"⚡"}
//           callback={props.cb.onTranslate}
//         ></Button>
//         <Button
//           label="Settings"
//           icon={"⚙️"}
//           callback={props.cb.onSettings}
//         ></Button>
//       </div>
//     </>
//   );
// }

import { globalStyle } from "./global.css";

function createToolbar(
  shadow: any,
  x: number,
  y: number,
  buttons: ButtonProps[]
) {
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(globalStyle));
  shadow.appendChild(style);
  shadow.appendChild(new Toolbar(x, y, buttons).get());
}

export default createToolbar;
