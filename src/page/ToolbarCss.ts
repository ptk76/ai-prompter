export const styleContainer: React.CSSProperties = {
  //   all: "initial",
  position: "absolute",
  width: "fit-content",

  wordBreak: "normal",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
  padding: "8px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
  zIndex: "1000",
  animation: "tooltipAppear 0.3s ease-out forwards",
  minWidth: "280px",

  fontSize: "19px",
  fontFamily: "system-ui",
};

export const globalStyle = `
  .toolbar{
    background: rgba(255, 255, 255, 0.98);
    border: 2px solid #000;
  }
  .label{
    color: #333;
  }
  button{
    background: transparent;
  }
  button:hover{
    background: rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
  @media(prefers-color-scheme:dark){
  .toolbar{
    background: rgba(30, 30, 30, 0.98);
    border-color: #333;
  }
  .label{
    color: #fff;
  }
  button:hover{
    background: rgba(255, 255, 255, 0.1);
  }
}`;
