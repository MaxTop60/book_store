import React from "react";

import {Link} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import sqrollToHeader from "../../helpers/ScrollToHeader";

import "./style.css";

const Auth = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const Login = async (event) => {
        event.preventDefault();

        const user = {
            username: userName,
            password: password
        };

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        try {
            const {data} = await axios.post('http://127.0.0.1:8000/token/', user, config)

            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            window.location.href = '/';
        } catch(error) {
            if (error.response && error.response.data) {
                alert('Неверный логин или пароль');
            } else {
                alert('Произошла ошибка');
            }
        }
    }

    return ( 
        <main className="main">
            <form action="" className="auth-form">
                <h1 className="auth-form__title">Авторизация</h1>

                <input type="text" placeholder="Введите логин" className="auth-form__input" required 
                 onChange={event => {setUserName(event.target.value)}}/>
                <input type="password" placeholder="Введите пароль" className="auth-form__input" required 
                 onChange={event => {setPassword(event.target.value)}}/>

                <button type="submit" className="auth-form__button" onClick={Login}>Войти</button>

                <div className="auth-form__links">
                    <Link to="/registration" className="auth-form__link" onClick={sqrollToHeader}>Регистрация</Link>
                    <Link to="#" className="auth-form__link">Забыли пароль?</Link>
                </div>
            </form>
        </main>
     );
}
 
export default Auth;