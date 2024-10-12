import React from 'react'
import './Header.css'
function Header() {
  return (
    <div className="header_footer">
        <div className="info">
            <p className='welcom'>ДОБРО ПОЖАЛОВАТЬ В ЗЕЛЕНЫЙ МАГАЗИН</p>
            <h1 className="title">Давайте сделаем лучше <span>Планету</span></h1>
            <p className="body">Давайте сделаем мир лучше
            ЗЕЛЕНЫЙ МАГАЗИН - это интернет-магазин растений, предлагающий широкий ассортимент недорогих и модных растений. Используйте наши растения для создания уникальных городских джунглей. Заказывайте свои любимые растения!</p>
            <button className="shop_now">купить сейчас</button>
        </div>
        <img src="public/flower.svg" className='flower' alt="" />
    </div>
  )
}

export default Header