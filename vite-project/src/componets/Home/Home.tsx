import React from 'react';
import Menu from '../Menu/Menu';
import './Home.css';
import Header from './Header/Header';
import Products from './Products/Products';
import Authorization from '../Authorization/Authorization';
import { useAppContext } from '../context/AppContext'; // Импортируйте хук контекста
import Footer from '../Footer/Footer';

function Home() {
  const { showOverlay, setShowOverlay, regist } = useAppContext(); // Используйте хук контекста

  const handleLoginClick = () => {
    setShowOverlay(true); // Показываем оверлей
  };

  return (
    <>
    
      <div className="container">
        <Menu onLoginClick={handleLoginClick} />
        {showOverlay && <Authorization setShowOverlay={setShowOverlay} />}
        <Header />
        <Products regist={regist}/>
        <Footer />
      </div>
    </>
  );
}

export default Home;