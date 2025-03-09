import React, { useCallback, useContext, useEffect } from 'react'
import Key from './Key';
import { AppContext } from '../App';

function Keyboard() {
  const keys1 = ["Q","W","E","R","T","Z","U","I","O","P","Š","Đ"];
  const keys2 = ["A","S","D","F","G","H","J","K","L","Č","Ć"]; 
  const keys3 = ["Y","X","C","V","B","N","M"]; 
  const {handleEnter, handleDelete, onSelectLetter, disabledLetters } = useContext(AppContext);

  const handleKeyboard = useCallback((event)=> {
    if(event.key==="Enter")  {
      handleEnter();
    } else if(event.key === "Backspace") {
      handleDelete();
    } else {
      keys1.forEach((key) => {
        if(event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      })
      keys2.forEach((key) => {
        if(event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      })
      keys3.forEach((key) => {
        if(event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      })
    }
  })

  useEffect(()=> {
    document.addEventListener("keydown",handleKeyboard);

    return () => {
      document.removeEventListener("keydown",handleKeyboard);
    }
  },[handleKeyboard])

  return (
    <div className='keyboard' onKeyDown={handleKeyboard}>
      <div className='line1'>
        {keys1.map(slovo => {
          return <Key slovo={slovo} disabled={disabledLetters.includes(slovo)}/>
        })}
      </div>
      <div className='line2'>
      {keys2.map(slovo => {
          return <Key slovo={slovo} disabled={disabledLetters.includes(slovo)} />
        })}
      </div>
      <div className='line3'>
        <Key slovo="ENTER" bigKey/>
      {keys3.map(slovo => {
          return <Key slovo={slovo} disabled={disabledLetters.includes(slovo)}/>
        })}
        <Key slovo="DELETE" bigKey />
      </div>
    </div>
  )
}

export default Keyboard
