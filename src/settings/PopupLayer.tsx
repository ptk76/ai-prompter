import style from "./PopupLayer.module.css";

function PopupLayer(props: { children: any; onClose: () => void }) {
  return (
    <div className={style.popupLayer} onClick={props.onClose}>
      <div className={style.container}>{props.children}</div>
    </div>
  );
}

export default PopupLayer;
