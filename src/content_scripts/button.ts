export type ButtonProps = {
  icon: string;
  label: string;
  url: string;
  cb: (url: string) => void;
};

class Button {
  private rootNode: HTMLButtonElement;
  private iconNode: HTMLDivElement;
  private labelNode: HTMLDivElement;
  private url: string;

  constructor(props: ButtonProps) {
    this.url = props.url;
    this.rootNode = document.createElement("button");
    this.rootNode.id = props.label;
    this.rootNode.className = "button";
    this.rootNode.onclick = (ev) => {
      ev.stopPropagation();
      props.cb(this.url);
    };
    this.iconNode = document.createElement("div");
    this.iconNode.className = "icon";
    this.iconNode.innerHTML = props.icon;
    this.labelNode = document.createElement("div");
    this.labelNode.className = "label";
    this.labelNode.innerHTML = props.label;
    this.rootNode.appendChild(this.iconNode);
    this.rootNode.appendChild(this.labelNode);
  }

  get() {
    return this.rootNode;
  }
}

export default Button;
