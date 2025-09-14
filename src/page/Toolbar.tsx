import "./Toolbar.css";

function Toolbar(props: {
  x: number;
  y: number;
  onTranslate: () => void;
  onCopy: () => void;
  onRephrase: () => void;
  onSummarize: () => void;
  onGrammarly: () => void;
}) {
  const offsetX = Math.max(0, props.x - 100 / 2);
  const offsetY = props.y + 10;
  return (
    <>
      <div
        className="container"
        style={{
          top: offsetY.toString() + "px",
          left: offsetX.toString() + "px",
        }}
      >
        <button onClick={props.onTranslate}>Translate</button>
        <button onClick={props.onCopy}>Copy</button>
        <button onClick={props.onRephrase}>Rephrase</button>
        <button onClick={props.onSummarize}>Summarize</button>
        <button onClick={props.onGrammarly}>Grammarly</button>
      </div>
    </>
  );
}

export default Toolbar;
