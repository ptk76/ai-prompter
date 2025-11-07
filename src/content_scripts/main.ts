import Actions from "./actions";
import type { ButtonProps } from "./button";
import createToolbar from "./toolbar";
import { getActions, getBlacklist } from "./settings";

class AreteRootNode {
  private targetHit: HTMLElement | null = null;
  private root;
  private onClose;

  constructor(root: ShadowRoot, onClose: () => void) {
    this.root = root;
    this.onClose = onClose;
    document.onmousedown = this.onMouseDown.bind(this);
    document.onkeydown = this.onKeyDown.bind(this);
    document.onmouseup = this.onMouseUp.bind(this);
  }

  private goToSleep() {
    document.onmousedown = null;
    document.onkeydown = null;
    document.onmouseup = null;
  }

  private onKeyDown() {
    if (!chrome.runtime?.id) {
      this.goToSleep();
      return;
    }
    this.closeToolbar();
  }

  private onMouseDown(ev: Event) {
    if (!chrome.runtime?.id) {
      this.goToSleep();
      return;
    }

    if (this.isAiPrompter(ev.target as HTMLElement)) return;
    this.closeToolbar();
    this.targetHit = ev.target as HTMLElement;
  }

  private async onMouseUp(ev: MouseEvent) {
    if (!chrome.runtime?.id) {
      this.goToSleep();
      return;
    }

    const target = ev.target as HTMLElement;
    const targetHitCopy = this.targetHit != null ? this.targetHit : target;
    this.targetHit = null;
    if (this.isAiPrompter(target)) return;
    const selection = window.getSelection();
    if (!selection) return;

    const selectedText = selection.toString();
    if (!selectedText || selectedText.trim().length < 2) return;

    if (await this.doNotShow()) return;

    const settingButtons = await this.getButtons();
    if (settingButtons.length === 0) return;

    let buttons: ButtonProps[] = [];
    // const onClose = this.onClose.bind(this);
    for (const button of settingButtons) {
      if (button.disabled) continue;
      buttons.push({
        icon: button.icon,
        label: button.label,
        url: button.url,
        cb: (url: string) => {
          if (url === "COPY") this.showHint(ev.pageX, ev.pageY, "Copied");
          else this.closeToolbar();
          Actions.callback(url, selectedText);
        },
      });
    }
    if (buttons.length === 0) return;
    document.body.append(rootNode);

    const iconOnly = this.isEditField(targetHitCopy);
    const targetBox = targetHitCopy.getBoundingClientRect();
    const x = iconOnly ? targetBox.right - 30 : ev.pageX;
    const y = iconOnly ? window.scrollY + targetBox.top + 4 : ev.pageY;

    createToolbar(this.root, x, y, buttons, iconOnly);
  }

  private isEditField(target: HTMLElement) {
    if (target.nodeName === "INPUT" || target.nodeName === "TEXTAREA")
      return true;

    const isEditable = (target: HTMLElement, index: number = 0) => {
      if (target.contentEditable === "true") return true;
      if (!!!target.parentElement) return false;
      return isEditable(target.parentElement, index + 1);
    };
    return isEditable(target);
  }

  private isAiPrompter(element: HTMLElement | null, depth = 0): boolean {
    if (depth === 5) return false;
    if (!element) return false;
    if (element.id === rootNodeId) return true;
    return this.isAiPrompter(element.parentElement, depth + 1);
  }

  private async doNotShow() {
    const blacklist = await this.getBlacklist();
    for (const domain of blacklist) {
      if (window.location.href.includes(domain.pattern)) return true;
    }
    return false;
  }

  private async getButtons() {
    const settingButtons = await getActions();
    if (settingButtons.length === 0) {
      const response = await chrome.runtime.sendMessage({
        type: "fix-actions",
      });
      if (response !== "settings-ready") return [];
      return await getActions();
    }
    return settingButtons;
  }

  private async getBlacklist() {
    const blacklist = await getBlacklist();
    if (blacklist.length === 0) {
      const response = await chrome.runtime.sendMessage({
        type: "fix-blacklist",
      });
      if (response !== "settings-ready") return [];
      return await getBlacklist();
    }
    return blacklist;
  }

  private closeToolbar() {
    this.root.innerHTML = "";
    this.targetHit = null;
    this.onClose();
  }

  private showHint(x: number, y: number, hint: string) {
    this.root.removeChild(this.root.getElementById("toolbar")!);
    const element = this.createHint(hint);
    element.style.top = y.toString() + "px";
    element.style.left = x.toString() + "px";
    this.root.appendChild(element);
    this.targetHit = null;
    setTimeout(() => {
      this.root.innerHTML = "";
      this.onClose();
    }, 1000);
  }
  private createHint(hint: string) {
    const element = document.createElement("div");
    element.className = "hint";
    element.innerHTML = hint;
    return element;
  }
}

const rootNodeId = "arete-ai-prompter-root";
const rootNode = document.createElement("arete-ai-prompter-root");
rootNode.id = rootNodeId;
rootNode.style.position = "absolute";
rootNode.style.zIndex = "1000";
rootNode.style.top = "0px";
rootNode.style.left = "0px";
rootNode.style.userSelect = "none";
rootNode.style.visibility = "visible";

new AreteRootNode(rootNode.attachShadow({ mode: "open" }), () => {
  rootNode.remove();
});
