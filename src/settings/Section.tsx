import style from "./Section.module.css";

function Section(props: { children?: any; title?: string }) {
  return (
    <span className={style.section}>
      {props.title && <div className={style.title}>{props.title}</div>}
      {props.children}
    </span>
  );
}

export default Section;
