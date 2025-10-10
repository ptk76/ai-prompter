import Button, { type ButtonProps } from "./button";
import { globalStyle } from "./global.css";

class Toolbar {
  private rootNode: HTMLDivElement;
  private buttonContainer: HTMLDivElement;
  constructor(x: number, y: number, buttons: ButtonProps[], iconOnly: boolean) {
    this.rootNode = document.createElement("div");
    this.rootNode.className = "toolbar";
    this.rootNode.style.top = y.toString() + "px";
    this.rootNode.style.left = x.toString() + "px";

    if (iconOnly) {
      const icon = document.createElement("div");
      icon.className = "icon";
      icon.innerHTML = "a";
      icon.onmouseover = (ev: MouseEvent) => {
        ev.stopPropagation();
        icon.style.display = "none";
        this.buttonContainer.style.display = "flex";
      };
      this.rootNode.appendChild(icon);
    }

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.className = "buttonContainer";
    this.buttonContainer.style.display = iconOnly ? "none" : "flex";
    this.rootNode.appendChild(this.buttonContainer);

    for (const buttonProps of buttons) {
      const button = new Button(buttonProps);
      this.buttonContainer.appendChild(button.get());
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
  buttons: ButtonProps[],
  iconOnly = true
) {
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(globalStyle));
  shadow.appendChild(style);
  shadow.appendChild(new Toolbar(x, y, buttons, iconOnly).get());
}

export default createToolbar;
