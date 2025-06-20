import React from "react";

import {Link} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import sqrollToHeader from "../../helpers/ScrollToHeader";

import { ApiLogin } from "../../API/API";

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

        ApiLogin(user);
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
                    <Link to="/book_store/registration" className="auth-form__link" onClick={sqrollToHeader}>Регистрация</Link>
                    <Link to="#" className="auth-form__link">Забыли пароль?</Link>
                </div>
            </form>
        </main>
     );
}
 
export default Auth;