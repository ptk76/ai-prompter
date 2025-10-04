import { useEffect, useState } from "react";
import Action from "./Action";
import Settings from "../storage/settings";
import { type SettingsButtonType } from "../storage/settings";
import style from "./Settings.module.css";

function Section(props: { children: any }) {
  return <span className={style.section}> {props.children}</span>;
}

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
        <>
          <Action key={button.id} button={button} save={saveButton}></Action>
        </>
      );
    }
    return <>{result}</>;
  };

  return (
    <>
      <div className={style.settings}>
        <Section>
          <div>arete</div>
        </Section>
        <Section>
          <div>Edit toolbar actions</div>
          {settings && getButtons(settings.getButtons())}
          <button className={style.add} disabled>
            ➕
          </button>
        </Section>
      </div>
    </>
  );
}

export default SettingsUI;
