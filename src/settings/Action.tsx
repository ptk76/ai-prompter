import { useState } from "react";
import style from "./Action.module.css";
import type { SettingsButtonType } from "../storage/settings";
import TextInput from "./TextInput";
import ActionHeader from "./ActionHeader";

function Action(props: {
  button: SettingsButtonType;
  save: (button: SettingsButtonType) => void;
  delete: (index: number) => void;
}) {
  const [buttonProps, setButtonProps] = useState(props.button);

  const saveButton = (button: SettingsButtonType) => {
    setButtonProps(button);
    props.save(button);
  };
  // const onIconChange = (value: string) => {
  //   let newButtonProps = buttonProps;
  //   newButtonProps.icon = value;
  //   saveButton(newButtonProps);
  // };

  const onLabelChange = (value: string) => {
    saveButton({ ...buttonProps, label: value });
  };

  const onUrlChange = (value: string) => {
    saveButton({ ...buttonProps, url: value });
  };

  const onStatusChange = () => {
    saveButton({ ...buttonProps, disabled: !buttonProps.disabled });
  };

  const onIconCHange = (icon: string) => {
    saveButton({ ...buttonProps, icon: icon });
  };

  const isSpecialAction =
    buttonProps.type == "copy" || buttonProps.type == "settings";
  const hint = isSpecialAction
    ? "This action doesn't require a URL"
    : "URL with %s in place of query";
  const url = isSpecialAction ? "No URL needed" : buttonProps.url;

  return (
    <>
      <div className={style.action}>
        <ActionHeader
          index={buttonProps.id + 1}
          icon={buttonProps.icon}
          disabled={buttonProps.disabled}
          onStatusChange={onStatusChange}
          onIconChange={onIconCHange}
          onRemove={() =>
            props.delete(buttonProps.type === "custom" ? buttonProps.id : -1)
          }
        />
        <div className={buttonProps.disabled ? style.blur : ""}>
          <div className={style.inputGroup}>
            <div className={style.inputContainer}>
              <div className={style.label}>Name:</div>
              <TextInput
                onChange={onLabelChange}
                defaultValue={buttonProps.label}
                placeholder="Action name"
              />
            </div>
            <div className={style.inputContainer}>
              <div className={style.label}>URL:</div>
              <TextInput
                onChange={onUrlChange}
                defaultValue={url}
                hint={hint}
                disabled={isSpecialAction}
              />
            </div>
          </div>
        </div>
        {buttonProps.disabled && <div className={style.overlay} />}
      </div>
    </>
  );
}

export default Action;
