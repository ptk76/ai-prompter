export const globalStyle = `
  .toolbar{
    position: absolute;
    width: fit-content;
    word-break: normal;
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
    z-index: 1000;
    animation: tooltipAppear 0.3s ease-out forwards;

    font-size: 19px;
    font-family: system-ui;
      
    background: rgba(255, 255, 255, 0.98);
    border: 2px solid #000;
  }

  .label{
    font-size: 11px;
    font-weight: 600;
    text-align: center;
    line-height: 1.2;
    color: #333;
  }

  .icon {
    font-size: 20px;
    margin-bottom: 4px;
    line-height: 1;
  }

  button{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 8px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 50px;
    border: none;
  
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
