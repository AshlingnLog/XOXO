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

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('🐲');
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);

  const possibleWins = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = () => {
    for (let i = 0; i < possibleWins.length; i++) {
      const [a, b, c] = possibleWins[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner(board[a]);
        setWinningSquares([a, b, c]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner('draw');
    }
  };

  const handleSquareClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    setPlayer(player === '🐲' ? '🦄' : '🐲');

    checkWinner();
  };

  const renderSquare = (index) => {
    const isWinningSquare = winningSquares.includes(index);

    return (
      <div
        className={`square ${isWinningSquare ? 'winning-square' : ''}`}
        onClick={() => handleSquareClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('🐲');
    setWinner(null);
    setWinningSquares([]);
  };

  const renderGameStatus = () => {
    if (winner === 'draw') {
      return <div className="status">It's a draw!</div>;
    } else if (winner) {
      return (
        <div className="status">
          {winner} wins!
          <span role="img" aria-label="confetti">
            🎉
          </span>
        </div>
      );
    } else {
      return (
        <div className="status">
          It's {player}'s turn.
        </div>
      );
    }
  };

  return (
    <div className="game">
      {renderGameStatus()}
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
       </div>
       <div className="board">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
       </div>
       <div className="board">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {winner && (
        <button className="reset-button" onClick={resetGame}>
          Play again
        </button>
      )}
    </div>
  );
}
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
