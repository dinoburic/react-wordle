import Board from './components/Board.js';
import Keyboard from './components/Keyboard.js';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './Words.js';
import GameOver from './components/GameOver.js';

export const AppContext = createContext();  //koristimo ContextAPI kako bismo vrijednost boarda prenijeli na citav projekat

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, position: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  useEffect( ()=>{
    const getWords = async () => {
      const words = await generateWordSet();
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    }
    getWords();
  },[]);

  const handleEnter = () => {
    if(currentAttempt.position < 5) return;

    let currentWord = "";
    for(let i=0;i<5;i++) {
      currentWord += board[currentAttempt.attempt][i];
    }


   
      setCurrentAttempt({attempt: currentAttempt.attempt+1, position: 0});
    

    if(currentWord === correctWord) {
      setGameOver({gameOver: true, guessedWord: true});
    }else if(currentAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false});
    }
    
  }

  const handleDelete = () => {
    if(currentAttempt.position===0) return;
    const currBoard = [...board];
    currBoard[currentAttempt.attempt][currentAttempt.position-1]="";
    setBoard(currBoard);
    setCurrentAttempt({...currentAttempt, position: currentAttempt.position-1});
  }

  const onSelectLetter = (slovo) => {
    if(currentAttempt.position>4) return;
    const currBoard = [...board];
        currBoard[currentAttempt.attempt][currentAttempt.position] = slovo;
        setBoard(currBoard);
        setCurrentAttempt({...currentAttempt, position: currentAttempt.position+1});
  }
  
  
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{disabledLetters, 
        setDisabledLetters, 
        correctWord, 
        currentAttempt, 
        setCurrentAttempt, 
        board, 
        setBoard,
        handleDelete, 
        handleEnter, 
        onSelectLetter,
        gameOver,
        setGameOver }}>
        <div className='game'>
      <Board />
      {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
