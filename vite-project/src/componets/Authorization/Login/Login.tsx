import React, { useState } from 'react';
import axios from 'axios';
import '../Regisranion_login.css'


const Login = ({choiceEntrance}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputClasses, setInputClasses] = useState({
        email: 'login_input',
        password: 'login_input',
    });

    const api = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:3000/",
    });

    const validateInput = (value, type) => {
        const isEmpty = !value;
        setInputClasses(prev => ({
            ...prev,
            [type]: isEmpty ? 'empty' : 'login_input',
        }));
        return isEmpty;
    };

    const submitLogin = () => {
        const emailError = validateInput(email, 'email');
        const passwordError = validateInput(password, 'password');

        if (emailError || passwordError) return;

        api.post("/login", { email, password })
            .then(res => {
                if(res.data.ok){
                    location.reload()
                }else {
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.error(err);
                alert("Ошибка входа! Пожалуйста, проверьте ваши учетные данные.");
            });
           
    };

    return (
        <>
            <h1 className="login_or_regist">
                <span className='log' style={{ color: "#46a358",  }} onClick={choiceEntrance}>Вход</span>
                <span className='reg' style={{ color: "black" }} onClick={choiceEntrance}>Регистрация</span>
            </h1>
            <div className="registration">
                <p className="description">Введите ваш email и пароль для входа.</p>
                <input 
                    type="email" 
                    placeholder='Введите ваш email' 
                    value={email} 
                    className={inputClasses.email}
                    onChange={e => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder='Пароль' 
                    value={password} 
                    className={inputClasses.password}
                    onChange={e => setPassword(e.target.value)} 
                />
                <button className="registration_but" onClick={submitLogin}>Войти</button>
            </div>
        </>
    );
}

export default Login;