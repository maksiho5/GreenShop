import React, { useEffect, useState } from 'react'
import '../Regisranion_login.css'
import axios from 'axios'
function Regisranion({ choiceEntrance }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [inputClasses, setInputClasses] = useState({
        email: 'login_input',
        name: 'login_input',
        confirmPassword: "login_input",
        password: 'login_input',
    });
    const api = axios.create({
        withCredentials: true, // Позволяет отправлять куки
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

    const submitQuery = () => {
        if (password !== confirmPassword) {
            alert("Пароли не соответствуют!");
            return;
        }
        if (username && email && password && confirmPassword) {
            api.post("/registration", {
                name: username,
                email: email,
                password: password
            })
                .then(res => {
                    const result = res.data
                    console.log(result);
                    if (result.ok) {
                        localStorage.setItem('access', result.accessToken)
                        location.reload()
                    }else {
                        alert(result.message)
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            alert("Ведите значения")

        }

        const emailError = validateInput(email, 'email');
        const nameError = validateInput(username, 'name');
        const confirmPasswordError = validateInput(confirmPassword, 'confirmPassword');
        const passwordError = validateInput(password, 'password');


    }


    return (
        <>
            <h1 className="login_or_regist">

                <span className='log' style={{ color: "black" }} onClick={choiceEntrance}>Вход</span>
                <span className='reg' style={{ color: "#46a358" }} onClick={choiceEntrance}>Регистрация</span>
            </h1>
            <div className="registration">
                <p className="description">Введите свой адрес электронной почты и пароль для регистрации.</p>

                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    className={inputClasses.name}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder='Enter your email address'
                    value={email}
                    className={inputClasses.email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    className={inputClasses.password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    className={inputClasses.confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <button className="registration_but" onClick={submitQuery}>Регистрация</button>
            </div>
        </>
    );
}

export default Regisranion