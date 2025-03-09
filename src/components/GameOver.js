import React, { useContext } from 'react'
import { AppContext } from '../App'

export default function GameOver() {
    const {gameOver, currentAttempt, setGameOver, correctWord} = useContext(AppContext);
  return (
    <div className='gameover'>
      <h3>{gameOver.guessedWord ? "You correctly guessed" : "You failed"}</h3>
    <h1>Correct: {correctWord}</h1>
    {gameOver.guessedWord && <h3>You guessed in {currentAttempt.attempt} attempts</h3>}
    </div>
  )
}
