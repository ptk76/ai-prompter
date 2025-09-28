import { useEffect, useState } from "react";
import Action from "./Action";
import SettingDatabase from "./db";
import style from "./Settings.module.css";

function getActions(db: SettingDatabase | null) {
  if (!db) return <></>;

  let result = [];
  let counter = 0;
  for (const action of db.settings) {
    result.push(
      <Action
        key={"action" + counter++}
        icon={action.icon}
        name={action.name}
        url={action.url}
      ></Action>
    );
  }
  return <>{result}</>;
}

function Settings() {
  const [db, setDb] = useState<SettingDatabase | null>(null);

  const setupDatabase = async () => {
    const db = new SettingDatabase();
    await db.init();
    setDb(db);
  };
  useEffect(() => {
    setupDatabase();
    return;
  }, []);

  return (
    <>
      <div className={style.settings}>
        <div>arete</div>
        <div>Edit toolbar actions</div>
        {getActions(db)}
        <button>Add new</button>
      </div>
    </>
  );
}

export default Settings;
