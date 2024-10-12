import React, {useRef} from 'react';
import './Menu.css';
import TokenChecker from './TokenChecker/TokenChecker';
import { useAppContext } from '../context/AppContext'; // Импортируйте хук контекста

function Menu({ onLoginClick }) {
  const { setRegist } = useAppContext(); // Используйте хук контекста
  const burgerMenuContentRef = useRef();
const handleBurgerMenu = () => {
  burgerMenuContentRef.current.style.display = 'flex';
}
const closeBurgerMenu = () => {
  burgerMenuContentRef.current.style.display = 'none';
}

  return (
    <header className='header'>
      <div className="logo_plant">
        <img src="public/logo_plant.svg" alt="" />
        <p>ЗЕЛЕНЫЙ МАГАЗИН</p>
      </div>


      <div className="burger_menu_content">
              <nav className="menu" ref={burgerMenuContentRef}>
              <div className="closeMenu" onClick={closeBurgerMenu}>✕</div>
        <ul>
          <li><a href="/">Главна</a></li>
          <li><a href="#">Товары</a></li>
          <li><a href="#">Уход за растениями</a></li>
          <li><a href="#">Блог</a></li>
        </ul>
      </nav>
      </div>

      <div className="burger_button" onClick={handleBurgerMenu}>☰</div>

      <div className="authentication">
        <a href="/search"><img src="public/search.jpg" className='search' alt="" /></a>

        <div className="backed_cont">
          <a href="/basket"><img src="public/backed.svg" className='backed' alt="" /></a>

          {/* <p className="count">6</p> */}
        </div>
        <TokenChecker setRegist={setRegist} onLoginClick={onLoginClick} />
      </div>

    </header>
  );
}

export default Menu;