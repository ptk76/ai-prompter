import style from "./Actions.module.css";

function Action(props: { icon: any; name: string; url: string }) {
  return (
    <>
      <div className={style.item}>
        <label>Icon:</label>
        <input
          type="text"
          id="icon"
          name="icon"
          required
          defaultValue={props.icon}
        />
      </div>
      <div className={style.item}>
        <label>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={props.name}
        />
      </div>
      <div className={style.item}>
        <label>URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          required
          defaultValue={props.url}
        />
      </div>
      <button>Remove</button>
    </>
  );
}

export default Action;
