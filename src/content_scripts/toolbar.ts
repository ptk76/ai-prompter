import Button, { type ButtonProps } from "./button";
import { globalStyle } from "./global.css";

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
