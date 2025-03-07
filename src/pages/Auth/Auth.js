import {Link} from "react-router-dom";

import "./style.css";

const Auth = () => {
    return ( 
        <main className="main">
            <form action="" className="auth-form">
                <h1 className="auth-form__title">Авторизация</h1>

                <input type="text" placeholder="Введите логин" className="auth-form__input" required />
                <input type="password" placeholder="Введите пароль" className="auth-form__input" required />

                <button type="submit" className="auth-form__button">Войти</button>

                <div className="auth-form__links">
                    <Link to="/registration" className="auth-form__link">Регистрация</Link>
                    <Link to="#" className="auth-form__link">Забыли пароль?</Link>
                </div>
            </form>
        </main>
     );
}
 
export default Auth;