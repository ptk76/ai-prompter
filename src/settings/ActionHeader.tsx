import { useState } from "react";
import style from "./ActionHeader.module.css";

function ActionHeader(props: {
  index: number;
  icon: string;
  disabled: boolean;
  onStatusChange: () => void;
  onIconChange: (icon: string) => void;
}) {
  const getCurrentIcon = (disabled: boolean) => (disabled ? "🙈" : "👁️");
  const [icon, setIcon] = useState(getCurrentIcon(props.disabled));
  const onClick = () => {
    setIcon(getCurrentIcon(icon === "👁️"));
    props.onStatusChange();
  };
  return (
    <>
      <div className={style.header}>
        <div className={props.disabled ? style.blur : style.noBlur}>
          <div className={style.index}>{props.index}</div>
          <button className={style.icon}>{props.icon}</button>{" "}
        </div>
        <button className={style.hide} onClick={onClick}>
          {icon}
        </button>
      </div>
    </>
  );
}

export default ActionHeader;
