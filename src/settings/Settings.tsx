import { useEffect, useState } from "react";
import Action from "./Action";
import Settings from "../storage/settings";
import { type SettingsButtonType } from "../storage/settings";
import style from "./Settings.module.css";
import Section from "./Section";
import DragAndDrop from "./DragAndDrop";
function SettingsUI() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const setupDatabase = async () => {
    setSettings(await Settings.getInstance());
  };
  useEffect(() => {
    setupDatabase();
    return;
  }, []);

  const saveButton = (button: SettingsButtonType) => {
    settings?.setButton(button);
  };

  const getButtons = (buttons: SettingsButtonType[] | null) => {
    if (!buttons) return [];

    let result = [];
    for (const button of buttons) {
      result.push(
        <Action
          key={button.id.toString()}
          button={button}
          save={saveButton}
        ></Action>
      );
    }
    return result;
  };

  const reorder = (startIndex: number, endIndex: number) => {
    settings?.reorder(startIndex, endIndex);
  };

  const reset = async () => {
    setSettings(null);
    await chrome.runtime.sendMessage({
      type: "fix-settings",
    });
    setupDatabase();
  };

  return (
    <>
      <div className={style.settings}>
        <Section style={{ padding: "20px" }}>
          <div className={style.title}>arete</div>
          <div className={style.subtitle}>
            Smart text selection with instant AI actions
          </div>
        </Section>
        <Section title="⚙️ Edit Tooltip Actions">
          {settings && (
            <DragAndDrop onReorder={reorder}>
              {getButtons(settings.getButtons())}
            </DragAndDrop>
          )}
          <div className={style.buttons}>
            <button
              className={style.settingButton + " " + style.toLeft}
              disabled
            >
              ➕ Add Custom
            </button>
            <button
              className={style.settingButton + " " + style.toRight}
              onClick={reset}
            >
              🔄 Reset to Default Settings
            </button>
          </div>
        </Section>
        <Section title="💡 Action Ideas & Inspiration">
          <div className={style.inspiration}>
            <div className={style.inspirationText}>
              Looking for inspiration? We've curated{" "}
              <strong>35+ ready-to-use action examples</strong> to supercharge
              your productivity!
            </div>
            <a
              className={style.inspirationLink}
              href="https://docs.google.com/spreadsheets/u/1/d/1XFcvmtswakEDZLuwDPC9M0w99UEHyLKHbWB60qzSVFI/"
              target="blank"
            >
              ✨ Browse 35+ Action Examples →
            </a>
            <p className={style.inspiratioNote}>
              💡 <strong>Pro Tip:</strong> Use{" "}
              <code className={style.inspirationCode}>%s</code> in URLs as a
              placeholder for your selected text. Example:{" "}
              <code className={style.inspirationCode}>
                https://www.perplexity.ai/search?q="Translate the text into Spanish: %s"
              </code>
            </p>
          </div>
        </Section>
        <Section title="❓ Help & Support">
          <div className={style.inspiration}>
            <div className={style.inspirationText}>
              Need help configuring Arete? Have questions or suggestions?
              <br />
              We're here to help you get the most out of your text assistant!
            </div>
            <a
              className={style.inspirationLink}
              href="mailto:getarete@gmail.com"
            >
              📧 getarete@gmail.com
            </a>
          </div>
        </Section>
        <Section style={{ padding: "20px" }}>
          <div className={style.copyright}>
            © 2025{" "}
            <a className={style.link} href="https://getarete.app/">
              Arete - Smart text selection with instant AI actions
            </a>
            . All rights reserved. <br />
            Made with ❤️ in Wrocław & Zagościniec, Poland 🇵🇱 <br />
            <br />
            <a
              className={style.link}
              href="https://docs.google.com/document/d/1JUBJ5ZcTH86TQKCKLKEg1eIdPlvLXnXizKxS-LIdo3g/edit"
              target="_blank"
            >
              Privacy Policy
            </a>
          </div>
        </Section>
      </div>
    </>
  );
}

export default SettingsUI;
