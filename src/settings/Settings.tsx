import { useEffect, useState } from "react";
import Action from "./Action";
import SettingDatabase from "../storage/settings";
import { type SettingsButtonType } from "../storage/settings";
import style from "./Settings.module.css";

function Settings() {
  const [settings, setSettings] = useState<SettingDatabase | null>(null);
  const setupDatabase = async () => {
    const db = new SettingDatabase();
    await db.init();
    setSettings(db);
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
        <Action key={button.id} button={button} save={saveButton}></Action>
      );
    }
    return <>{result}</>;
  };

  return (
    <>
      <div className={style.settings}>
        <div>arete</div>
        <div>Edit toolbar actions</div>
        {settings && getButtons(settings.getButtons())}
        <button className={style.add} disabled>
          ➕
        </button>
      </div>
    </>
  );
}

export default Settings;
