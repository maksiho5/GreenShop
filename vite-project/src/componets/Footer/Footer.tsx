import React from 'react'
import './Footer.css'
function Footer() {
    return (
        <div className="footer">
            <div className="cart_conainer_footer">
                <div className="cart">
                    <img src="public/picture_cactus.svg" alt="" />
                    <h3>Уход за садом</h3>
                    <p className="text">Мы - интернет-магазин растений, предлагающий широкий ассортимент недорогих и модных растений.</p>
                </div>
                <div className="cart">
                    <img src="public/picture_cactus2.svg" alt="" />
                    <h3>Обновление растений</h3>
                    <p className="text">Мы являемся интернет-магазином растений, предлагающим широкий ассортимент недорогих и модных растений.</p>
                </div>
                <div className="cart">
                    <img src="public/pour.svg" alt="" />
                    <h3>Поливать каждый день</h3>
                    <p className="text">Мы являемся интернет-магазином растений, предлагающим широкий ассортимент недорогих и модных растений.</p>
                </div>
            </div>
            <div className="info">
                <div className="logo_plant">
                    <img src="public/logo_plant.svg" alt="" />
                    <p>ЗЕЛЕНЫЙ МАГАЗИН</p>
                </div>
                <div className="info_footer">
                    <img src="public/location.svg" alt="" />
                    <p>Крым Евпатория улица Пушкина </p>
                </div>
                <div className="info_footer">
                    <img src="public/message.png" alt="" />
                    <p>Крым Евпатория улица Пушкина </p>
                </div>
                <div className="info_footer">
                    <img src="public/calling.svg" alt="" />
                    <p>+79 01911 717 490</p>
                </div>
            </div>
        </div>
    )
}

export default Footer