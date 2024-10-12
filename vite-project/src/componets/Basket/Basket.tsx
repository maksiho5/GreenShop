import React, { useEffect, useState } from 'react'
import './Basket.css'
import Menu from '../Menu/Menu'
import { useAppContext } from '../context/AppContext'
import Cart from '../Home/Cart/Cart';
import axios from 'axios';
import Footer from '../Footer/Footer';

function Basket() {
  const { setShowOverlay, } = useAppContext();
  const [arrayCarts, setArrayCarts] = useState([])
  const handleLoginClick = () => {
    setShowOverlay(true);
  };

  const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/",
  });
  useEffect(() => {
    const addCarts = async () => {
      const cartAdd = await api.get("/getBasket")
      console.log(cartAdd.data.products);
      setArrayCarts(cartAdd.data.products)
    }

    addCarts()
  }, [])



  return (
    <>
      <div className="container">

        <Menu onLoginClick={handleLoginClick} />
        <div className="carts_container">
        {arrayCarts ? arrayCarts.map((el) => {
          console.log(el.image);

          return <Cart count={el.count} bask={true} image={el.image} text={el.text} price={el.price} />;
        }) : (<><h1 className='regist'>Авторизуйтесь</h1></>)}
        </div>
<Footer />
      </div>

    </>
  )
}

export default Basket