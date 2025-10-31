import type { ChangeEvent } from "react";
import style from "./TextInput.module.css";

function TextInput(props: {
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className={style.textInput}>
      <input
        className={style.inputField}
        type="text"
        required
        defaultValue={props.defaultValue}
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          props.onChange(ev.target.value)
        }
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
      {props.hint && <div className={style.hint}>{props.hint}</div>}
    </div>
  );
}

export default TextInput;
