import style from "./Section.module.css";

function Section(props: { children?: any; title?: string; style?: any }) {
  return (
    <span className={style.section} style={props.style}>
      {props.title && <div className={style.title}>{props.title}</div>}
      {props.children}
    </span>
  );
}

export default Section;
