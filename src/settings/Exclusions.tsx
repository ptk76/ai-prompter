import style from "./Exclusions.module.css";
import TextInput from "./TextInput";

function Exclusions() {
  const onLabelChange = (value: string) => {
    console.debug(value);
  };
  const onAddDomain = () => {
    console.debug("ADD");
  };
  return (
    <div className={style.container}>
      <div className={style.desc}>
        Disable Arete tooltip on specific websites where it might interfere with
        your experience. Add domains below to exclude them from showing the
        tooltip.
      </div>
      <div className={style.inputContainer}>
        <TextInput
          onChange={onLabelChange}
          placeholder="example.com or mail.google.com"
        />
        <button
          className={style.button + " " + style.toRight}
          onClick={onAddDomain}
        >
          ➕ Add Domain
        </button>
      </div>
      <div className={style.hint}>
        💡{" "}
        <strong className={style.black}>
          Examples of sites you might want to exclude:
        </strong>
        <br />• <span className={style.code}>mail.google.com</span> - Gmail
        (conflicts with compose window)
        <br />• <span className={style.code}>docs.google.com</span> - Google
        Docs (has its own text tools)
        <br />• <span className={style.code}>notion.so</span> - Notion (rich
        text editor)
        <br />• <span className={style.code}>figma.com</span> - Figma (design
        tool)
        <br />• <span className={style.code}>claude.ai</span> - Claude (already
        has text features)
        <br />
      </div>
    </div>
  );
}

export default Exclusions;
