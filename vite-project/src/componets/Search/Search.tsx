import React, { useState } from 'react'
import Menu from '../Menu/Menu'
import "./Search.css"
import axios from 'axios'
import { useAppContext } from '../context/AppContext'
import Cart from '../Home/Cart/Cart'
import Authorization from '../Authorization/Authorization'
import Footer from '../Footer/Footer'
function Search() {
  const { showOverlay, setShowOverlay, regist } = useAppContext();
    const [inputSearch, setInputSearch] = useState('')
    const [carts, setCarts] = useState([])
    const [search, setSearch] = useState(true)
    const handleLoginClick = () => {
        setShowOverlay(true);
    };
    const api = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:3000/",
      });
    const Search = async () => {
      const search = await  api.post("/search", {
            value: inputSearch
        })
        setCarts(search.data)
console.log(search.data);
setSearch(search.data.length)
    }
    return (

        <div className="container">
            <Menu onLoginClick={handleLoginClick} />
                {showOverlay && <Authorization setShowOverlay={setShowOverlay} />}
            <div className="search__container">
                <input type="text"  className="search__input" placeholder='Search' onChange={e => setInputSearch(e.target.value)} />
                <button onClick={Search} className='search_button'>Поиск</button>
            </div>
            <div className="carts_container">
                {carts.length ? carts.map((el) => {
         return <Cart regist={regist} key={el.id} id={el.id}  bask={false} image={el.image} text={el.text} price={el.price} />;
                }) : search ?  (<><h1 className='value_lead'>Ведите название товара</h1></>) : (<><h2>Не нашлось товара</h2></>)}
            </div>

            <Footer />
        </div>

    )
}

export default Search