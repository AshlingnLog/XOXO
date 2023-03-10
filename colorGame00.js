const Square = ({ id, player })=> {
  const [color,setColor] = React.useState('white')
  const palet = ['blue', 'green', 'pink'];
  const getRandomColor =()=>palet[Math.floor(Math.random()*3)];
  
  return (
  <button onClick={(e) =>{
    setColor(getRandomColor());
    e.target.style.background = color;
  }}>
  <h1>{id}</h1>
  </button>
  );
};


const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [mounted,setMounted] =React.useState(true);
  let status = `Player ${player}`;
  const toggle = ()=> setMounted(!mounted)
  function renderSquare(i) {
    return <Square id= {i}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
      {mounted && renderSquare(0)}
      {mounted && renderSquare(1)}
      {mounted && renderSquare(2)}
      </div>
      <div id="info">
      <button onClick={toggle}> Show/Hide Row</button>
        <h1> Player {player} Turn</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));