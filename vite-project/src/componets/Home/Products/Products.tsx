import React, { useEffect, useState , useRef} from 'react'
import Filter from './Filter/Filter'
import Cart from '../Cart/Cart'
import './Products.css'
import axios from 'axios'
function Products({ regist }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState("not selected")
  const filter = useRef();

  const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/",
  });

  useEffect(() => {
    const getCarts = async () => {
      const getProducts = await api.get("/getProducts")
      console.log(getProducts.data);

      setProducts(getProducts.data)
      setCategories(getProducts.data.id)
    }
    getCarts()
  }, [])

  const openFilter = () => {
    filter.current.style.display = 'flex';
  }
  const closeFilter= () => {
    filter.current.style.display = 'none';
  }

  return (
    <div className="products">
        <h2 className="openFilter" onClick={openFilter}>Открыть фильтр</h2>

      <Filter setCategories={setCategories}  closeFilter={closeFilter} filter={filter}/>
      <div className="carts_container">
        {products.filter((el) => {
          console.log(categories );
          
          if (categories === undefined) {
            return el;
          } else {
            return el.id === parseInt(categories); 
          }
        }).map((el) => {
          return <Cart id={el.id} key={el.id} regist={regist} image={el.image} text={el.text} price={el.price} />;
        })}



      </div>

    </div>
  )
}

export default Products