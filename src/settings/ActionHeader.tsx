import { useState } from "react";
import style from "./ActionHeader.module.css";
import PopupLayer from "./PopupLayer";
import IconSelector from "./IconSelector";
import { createPortal } from "react-dom";

function ActionHeader(props: {
  index: number;
  icon: string;
  disabled: boolean;
  onStatusChange: () => void;
  onIconChange: (icon: string) => void;
}) {
  const getStatusIcon = (disabled: boolean) => (disabled ? "🙈" : "👁️");
  const [icon, setIcon] = useState(props.icon);
  const [statusIcon, setStatusIcon] = useState(getStatusIcon(props.disabled));
  const [overlay, setOverlay] = useState(false);

  const setNewIcon = (icon: string) => {
    props.onIconChange(icon);
    setIcon(icon);
  };
  const onIcon = () => {
    setOverlay(true);
  };

  const onClick = () => {
    setStatusIcon(getStatusIcon(statusIcon === "👁️"));
    props.onStatusChange();
  };
  return (
    <>
      <div className={style.header}>
        <div className={props.disabled ? style.blur : style.noBlur}>
          <div className={style.index}>{props.index}</div>
          <button className={style.icon} onClick={onIcon}>
            {icon}
          </button>{" "}
        </div>
        <button className={style.hide} onClick={onClick}>
          {statusIcon}
        </button>
      </div>
      {overlay &&
        createPortal(
          <PopupLayer onClose={() => setOverlay(false)}>
            <IconSelector onNewIcon={setNewIcon} />
          </PopupLayer>,
          document.getElementById("overlay")!
        )}
    </>
  );
}

export default ActionHeader;
