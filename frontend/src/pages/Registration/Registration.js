import { Link } from "react-router-dom";

import sqrollToHeader from "../../helpers/ScrollToHeader";

import './style.css';

const Registration = () => {
    return ( 
        <main className="main">
            <form action="" className="auth-form">
                <h1 className="auth-form__title">Регистрация</h1>

                <input type="email" placeholder="Введите email" className="auth-form__input" required />
                <input type="text" placeholder="Введите логин" className="auth-form__input" required />
                <input type="password" placeholder="Введите пароль" className="auth-form__input" required />
                <input type="password" placeholder="Повторите пароль" className="auth-form__input" required />

                <button type="submit" className="auth-form__button reg-form__button">Зарегистрироваться</button>

                <div className="auth-form__links">
                    <Link to="/auth" className="auth-form__link" onClick={sqrollToHeader}>Уже зарегистрированны?</Link>
                </div>
            </form>
        </main>
     );
}
 
export default Registration;