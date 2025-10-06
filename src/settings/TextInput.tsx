import type { ChangeEvent } from "react";
import style from "./TextInput.module.css";

function TextInput(props: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className={style.textInput}>
      <label className={style.label}>{props.label}</label>
      <div className={style.inputContainer}>
        <input
          className={style.inputField}
          type="text"
          id={props.label}
          name={props.label}
          required
          defaultValue={props.defaultValue}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            props.onChange(ev.target.value)
          }
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
        <div className={style.hint}>{props.hint}</div>
      </div>
    </div>
  );
}

export default TextInput;
