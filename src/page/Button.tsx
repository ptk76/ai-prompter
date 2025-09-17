import { useState } from "react";
import {
  styleButton,
  styleButtonOnHover,
  styleIcon,
  styleLabel,
} from "./ButtonCss";

function Button(props: { label: string; icon: any; callback: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <>
      <button
        style={hover ? { ...styleButton, ...styleButtonOnHover } : styleButton}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={(ev) => {
          ev.stopPropagation();
          props.callback();
        }}
      >
        <span style={styleIcon}>{props.icon}</span>
        <span style={styleLabel}>{props.label}</span>
      </button>
    </>
  );
}

export default Button;
