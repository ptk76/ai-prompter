import { useRef } from "react";
import style from "./Exclusions.module.css";
import TextInput from "./TextInput";
import type { BlacklistUrlType } from "../storage/settings";

function Exclusions(props: {
  blacklist: BlacklistUrlType[];
  addDomain: (domain: string) => void;
  removeDomain: (domain: string) => void;
}) {
  const domainInput = useRef(null);
  const onAddDomain = () => {
    if (!domainInput.current) return;
    const element = domainInput.current as HTMLInputElement;
    props.addDomain(element.value);
    element.value = "";
  };
  const getUrls = () => {
    if (!props.blacklist) return <></>;

    let result = [];
    for (const url of props.blacklist) {
      result.push(
        <div className={style.urlContainer} key={result.length}>
          <button
            className={style.trash}
            onClick={() => props.removeDomain(url.pattern)}
          >
            🗑️
          </button>
          <div className={style.url}>{url.pattern}</div>
        </div>
      );
    }
    return result;
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
          onChange={() => {}}
          placeholder="example.com or mail.google.com"
          ref={domainInput}
        />
        <button
          className={style.button + " " + style.toRight}
          onClick={onAddDomain}
        >
          ➕ Add Domain
        </button>
      </div>
      {getUrls()}
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
