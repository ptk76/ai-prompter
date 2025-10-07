import { useEffect, useState } from "react";
import Action from "./Action";
import Settings from "../storage/settings";
import { type SettingsButtonType } from "../storage/settings";
import style from "./Settings.module.css";
import Section from "./Section";

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
    if (!buttons) return <></>;

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
    return <>{result}</>;
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
          {settings && getButtons(settings.getButtons())}
          <button className={style.add} disabled>
            ➕
          </button>
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
                https://claude.ai/new?q=Translate to English: %s
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
            © 2025 Arete - Smart text selection with instant AI actions. All
            rights reserved. <br />
            Made with ❤️ for better text productivity
          </div>
        </Section>
      </div>
    </>
  );
}

export default SettingsUI;
