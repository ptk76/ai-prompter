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
        <Section>
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
        <Section title="💡 Action Ideas & Inspiration"></Section>
        <Section title="❓ Help & Support"></Section>
        <Section title="">
          © 2025 Arete - Smart text selection with instant AI actions. All
          rights reserved. <br />
          Made with ❤️ for better text productivity
        </Section>
      </div>
    </>
  );
}

export default SettingsUI;
