import React, { useState, useEffect, useCallback } from 'react';
import circleIcon from './Images/circle.png';
import crossIcon from './Images/cross.png';
import './App.css';


const iconMapping = {
  'x': `<img src="${crossIcon}" alt="cross"/>`,
  'o': `<img src="${circleIcon}" alt="circle"/>`,
};

function App() {
  const [board, setBoard] = useState(Array.from({ length: 3 }, () => Array(3).fill(null)));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);

  const checkWinner = useCallback(() => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        setWinner(board[i][0]);
        setLock(true);
        return;
      }
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        setWinner(board[0][i]);
        setLock(true);
        return;
      }
    }

    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      setWinner(board[0][0]);
      setLock(true);
      return;
    }

    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      setWinner(board[0][2]);
      setLock(true);
      return;
    }

    if (!board.flat().includes(null)) {
      setWinner('Tie');
      setLock(true);
    }
  },[board]);

  useEffect(() => {
    checkWinner();
  }, [board, checkWinner]); 

  const toggle = (row, col) => {
    if (lock || board[row][col] || winner) {
      return;
    }

    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = count % 2 === 0 ? 'x' : 'o';
      return newBoard;
    });

    setCount(prevCount => prevCount + 1);
  };

  const resetBoard = () => {
    setBoard(Array.from({ length: 3 }, () => Array(3).fill(null)));
    setCount(0);
    setLock(false);
    setWinner(null);
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className={`row${rowIndex + 1}`}>
        {(row || []).map((box, colIndex) => (
          <div
            key={colIndex}
            className="boxes"
            onClick={() => toggle(rowIndex, colIndex)}
            dangerouslySetInnerHTML={{ __html: iconMapping[box] || '' }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="App">
      <div className="title">Tic Tac Toe Game</div>

      <div className={`board ${winner ? 'celebrate' : ''}`}>
        {renderBoard()}
      </div>

      {winner && (
        <div className="winner">
          <div className="title_scroll">
              {winner === 'Tie' ? 'IT\'s a Tie!' : `Player ${winner.toUpperCase()} wins!`}
          </div>
        </div>
      )}

    

      <button className="button" onClick={resetBoard}>
        Reset
      </button>
    </div>
  );
}

export default App;
