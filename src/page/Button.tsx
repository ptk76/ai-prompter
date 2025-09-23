import { styleButton, styleIcon, styleLabel } from "./ButtonCss";

function Button(props: { label: string; icon: any; callback: () => void }) {
  return (
    <>
      <button
        style={styleButton}
        onClick={(ev) => {
          ev.stopPropagation();
          props.callback();
        }}
      >
        <span style={styleIcon}>{props.icon}</span>
        <span className="label" style={styleLabel}>
          {props.label}
        </span>
      </button>
    </>
  );
}

export default Button;
