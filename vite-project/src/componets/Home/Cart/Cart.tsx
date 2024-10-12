import React, { useEffect } from 'react'
import axios from 'axios';
import './Cart.css'

interface CartProps {
    image: string; // Обязательно строка (URL изображения)
    text: string;
    price: string;
}
const Cart: React.FC<CartProps> = ({ count, categories, bask, image, text, price, id, regist }) => {
    const api = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:3000/",
    });
    const addCart = (e) => {
        const target = e.target as Element
        const cart = target.closest('.cart')
        const id = cart?.getAttribute("id")
        const text = cart?.querySelector(".text_cart")?.innerHTML
        const price = cart?.querySelector(".price")?.innerHTML
        const image = cart?.querySelector(".image_cart")?.getAttribute("src")
        console.log(image);

        const addBasket = api.post('basket', {
            id: id,
            text: text,
            price: price,
            image: image,
        }).then(data => {
            console.log(data);

        })

    }
    return (
        <div className="cart" id={id}>
            <div className="img_block">
                <img src={image} alt="" className='image_cart' />
            </div>
            {regist ? (<div className="container_navigation">
                <img src="public/backed_green.svg" alt="" onClick={addCart} />
                <a href="/search">
                    <img src="public/search.jpg" alt="" />
                </a>
            </div>) : (
                <>
                    {bask ? (<><p className='hover'>Купить</p></>) : (<><p className='hover'>Авторизуйтесь</p></>)}

                </>
            )}

            <div className="info_cart">
                <p className="text_cart">{text}</p>
                <p className="price">{price}</p>
            </div>
            <div className="count">{count}</div>
        </div>
    );
};

export default Cart