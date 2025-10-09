import type { JSX } from "react/jsx-runtime";
import style from "./IconSelector.module.css";

const ICONS = [
  "📋",
  "🔍",
  "🔮",
  "⚡",
  "⚙️",
  "📝",
  "💡",
  "🌟",
  "🚀",
  "📊",
  "📈",
  "🎯",
  "⭐",
  "🔥",
  "💼",
  "📞",
  "📧",
  "🌐",
  "🔗",
  "📱",
  "💻",
  "🖥️",
  "📹",
  "🎵",
  "📷",
  "🗂️",
  "📁",
  "🗃️",
  "🔧",
  "🛠️",
];
function Tile(props: { icon: string; onSelect: (icon: string) => void }) {
  return (
    <div className={style.tile} onClick={() => props.onSelect(props.icon)}>
      {props.icon}
    </div>
  );
}

function getTiles(cb: (icon: string) => void) {
  let tiles: JSX.Element[] = [];

  for (const icon of ICONS) {
    tiles.push(
      <Tile key={Math.random().toString()} icon={icon} onSelect={cb} />
    );
  }

  return <>{tiles}</>;
}

function IconSelector(props: { onNewIcon: (icon: string) => void }) {
  return (
    <div className={style.selector}>
      <div className={style.title}>Choose Icon</div>
      <div className={style.tileContainer}>{getTiles(props.onNewIcon)}</div>
    </div>
  );
}

export default IconSelector;
