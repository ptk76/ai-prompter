import { useState, type ChangeEvent } from "react";
import style from "./Actions.module.css";
import type { SettingsButtonType } from "../storage/settings";

function Action(props: {
  button: SettingsButtonType;
  save: (button: SettingsButtonType) => void;
}) {
  const [buttonProps, setButtonProps] = useState(props.button);

  const saveButton = (button: SettingsButtonType) => {
    setButtonProps(button);
    props.save(button);
  };
  const onIconChange = (ev: ChangeEvent<HTMLInputElement>) => {
    let newButtonProps = buttonProps;
    newButtonProps.icon = ev.target.value;
    saveButton(newButtonProps);
  };

  const onLabelChange = (ev: ChangeEvent<HTMLInputElement>) => {
    let newButtonProps = buttonProps;
    newButtonProps.label = ev.target.value;
    saveButton(newButtonProps);
  };

  const onUrlChange = (ev: ChangeEvent<HTMLInputElement>) => {
    let newButtonProps = buttonProps;
    newButtonProps.url = ev.target.value;
    saveButton(newButtonProps);
  };

  return (
    <>
      <div className={style.section}>
        <div className={style.item}>
          <label>Icon:</label>
          <input
            type="text"
            id="icon"
            name="icon"
            required
            defaultValue={buttonProps.icon}
            onChange={(ev) => onIconChange(ev)}
          />
        </div>
        <div className={style.item}>
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={buttonProps.label}
            onChange={(ev) => onLabelChange(ev)}
          />
        </div>
        <div className={style.item}>
          <label>URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            required
            defaultValue={buttonProps.url}
            onChange={(ev) => onUrlChange(ev)}
          />
        </div>
        <button className={style.remove} disabled>
          🗑️
        </button>
      </div>
    </>
  );
}

export default Action;
