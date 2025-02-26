import "./style.css"

import { NavLink, Link, useLocation } from "react-router-dom";

import logo from "../../img/logo.svg";
import search from "../../img/search_icon.svg";
import basket from "../../img/basket_icon.svg";
import menu_button from "../../img/menu_button.svg";
import close_icon from "../../img/close_icon.svg";
import search_light from "../../img/search_icon_light.svg";


const Header = () => {
    const location = useLocation();

    function openMenu() {
        document.querySelector(".header__popup").style.transform = "translateX(0)";
    }

    function closeMenu() {
        document.querySelector(".header__popup").style.transform = "translateX(295px)";
    }

    function scrollToSection(section) {
        if (location.pathname !== '/book_store/') {
            setTimeout(() => {
                document.querySelector(`.${section}`).scrollIntoView({behavior: 'smooth'});
            }, 100);
        }
        else {
            document.querySelector(`.${section}`).scrollIntoView({behavior: 'smooth'});
        }
    }

    return (  
        <header className="header">
            <Link className="header__home-link" to="/book_store/">
                <img src={logo} alt="Логотип" className="header__logo"/>
                <h1 className="header__title">BOOK STORE</h1>
            </Link>

            <nav className="header__navbar">
                <NavLink to="/book_store/" onClick={() => {scrollToSection("catalog");}} className="header__link">Каталог</NavLink>
                <NavLink to="/book_store/" onClick={() => {scrollToSection("delivery");}} className="header__link">Доставка</NavLink>
                <NavLink to="/book_store/" onClick={() => {scrollToSection("about");}} className="header__link">О магазине</NavLink>
                <NavLink to="/book_store/" onClick={() => {scrollToSection("contacts")}} className="header__link">Блог</NavLink>
            </nav>

            <div className="header__search">
            <img src={search} alt="Поиск" className="header__search-logo"/>
            <input type="text" className="header__search-input" placeholder="Поиск"/>
            </div>

            <Link to="" className="header__basket"><img src={basket} alt="Корзина" className="header__basket-image"/></Link>

            <button className="header__menu-button" onClick={openMenu}><img src={menu_button} alt="Открыть меню" className="header__menu-button-img" /></button>

            <div className="header__popup">
                <button className="header__popup__close" onClick={closeMenu}><img src={close_icon} alt="Закрыть меню" className="header__popup__close-img" /></button>

                <div className="header__search header__search__popup">
                    <img src={search_light} alt="Поиск" className="header__search-logo"/>
                    <input type="text" className="header__search-input header__search-input__popup" placeholder="Поиск"/>
                </div>

                <nav className="header__navbar header__navbar__popup">
                <NavLink to="/book_store/" onClick={() => {scrollToSection("catalog");}} className="header__link header__link__popup">Каталог</NavLink>
                <NavLink to="/book_store/" onClick={() => {scrollToSection("delivery");}} className="header__link header__link__popup">Доставка</NavLink>
                <NavLink to="/book_store/" onClick={() => {scrollToSection("about");}} className="header__link header__link__popup">О магазине</NavLink>
                <NavLink to="/book_store/" onClick={() => {scrollToSection("contacts")}} className="header__link header__link__popup">Блог</NavLink>
                </nav>
            </div>
        </header>
    );
}
 
export default Header;