import React, {useState} from "react";
import axios from "axios";
import { ApiRegister } from "../../API/API";

import { Link } from "react-router-dom";

import sqrollToHeader from "../../helpers/ScrollToHeader";

import './style.css';

const Registration = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const submit = async (event) => {
        event.preventDefault();
        
        if (document.querySelector('#password').value === document.querySelector('#return-password').value){

            const user = {
                username: userName,
                email: email,
                password: password
            };

            ApiRegister(user);
            
        } else {
            alert('Пароли не совпадают');
        }   
    }

    return ( 
        <main className="main">
            <form action="" className="auth-form">
                <h1 className="auth-form__title">Регистрация</h1>

                <input type="email" placeholder="Введите email" className="auth-form__input" required 
                 onChange={event => {setEmail(event.target.value)}}/>
                <input type="text" placeholder="Введите логин" className="auth-form__input" required 
                 onChange={event => {setUserName(event.target.value)}}/>
                <input type="password" placeholder="Введите пароль" className="auth-form__input" required 
                 onChange={event => {setPassword(event.target.value)}} id="password"/>
                <input type="password" placeholder="Повторите пароль" className="auth-form__input" required id="return-password"/>

                <button type="submit" className="auth-form__button reg-form__button" onClick={submit}>Зарегистрироваться</button>

                <div className="auth-form__links">
                    <Link to="/book_store/auth" className="auth-form__link" onClick={sqrollToHeader}>Уже зарегистрированны?</Link>
                </div>
            </form>
        </main>
     );
}
 
export default Registration;