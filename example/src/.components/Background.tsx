
export default () => {
  function randomNum(minNum:number, maxNum:number) {
    switch (arguments.length) {
      case 1:
        return Math.floor(Math.random() * minNum + 1);
        break;
      case 2:
        return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
        break;
      default:
        return 0;
        break;
    }
  }

  const getPosition = () => {
    const fontSize = randomNum(40,90)
    const top = randomNum(0,100)+'%'
    const left = randomNum(0,100)+'%'
    return {fontSize,top,left};
  };

  return (
    <div className="background">
      <a className="github" href="https://github.com/yuanguandong/react-keyevent" target="_blank"></a>
      <div className="symbol" style={getPosition()}>
        ○
      </div>
      <div className="symbol" style={getPosition()}>
        +
      </div>
      <div className="symbol" style={getPosition()}>
        -
      </div>
      <div className="symbol" style={getPosition()}>
        ◇
      </div>
      <div className="symbol" style={getPosition()}>
        △
      </div>
      <div className="symbol" style={getPosition()}>
        ⊙
      </div>
      <div className="symbol" style={getPosition()}>
        Win
      </div>
      <div className="symbol" style={getPosition()}>
        Commond
      </div>
      <div className="symbol" style={getPosition()}>
        CTRL
      </div>
      <div className="symbol" style={getPosition()}>
        ALT
      </div>
      <div className="symbol" style={getPosition()}>
        SHIFT
      </div>
    </div>
  );
};
