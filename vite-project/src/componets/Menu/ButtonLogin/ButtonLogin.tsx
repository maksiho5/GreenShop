import React from 'react'
import './ButtonLogin.css'
interface ButtonLoginProps {
  onLoginClick: () => void;
}

function ButtonLogin({ onLoginClick }: ButtonLoginProps): JSX.Element {

  return (
    
      <button className="button_login" onClick={onLoginClick}>
          <img src="public/Logout.svg" alt="" /> Вход
      </button>
  );
}


export default ButtonLogin