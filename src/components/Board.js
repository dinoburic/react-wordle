import React from 'react'
import Letter from './Letter';

function Board() {
    const cols=5;
    const rows=6;
  return (
    <div className='board'>
      {Array.from({ length: rows }, (_, attemptVal) => (
                <div key={attemptVal} className='row'>
                    {Array.from({ length: cols }, (_, letterPosition) => (
                        <Letter key={letterPosition} letterPosition={letterPosition} attemptVal={attemptVal} />
                    ))}
                </div>
            ))}
    </div>
  )
}

export default Board
