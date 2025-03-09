import React, {useContext} from 'react'
import { AppContext } from '../App';


function Key({slovo, bigKey, disabled}) {
    const {handleDelete, handleEnter, onSelectLetter } = useContext(AppContext);
    const selectLetterhandler = () => {
      
        if(slovo === "ENTER") {
          handleEnter();
        } else if(slovo === "DELETE") {
           handleDelete();
        }
        else {
            onSelectLetter(slovo);
        }
    };
  return (
    <div className='key' id={bigKey ? "big" : disabled && 'disabled'} onClick={selectLetterhandler}>
      {slovo}
    </div>
  )
}

export default Key
