import "./style.css"

import React from "react";

import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import sqrollToHeader from "../../helpers/ScrollToHeader";
import { ApiGetBooks } from "../../API/API";

import logo from "../../img/logo.svg";
import search from "../../img/search_icon.svg";
import basket from "../../img/basket_icon.svg";
import menu_button from "../../img/menu_button.svg";
import close_icon from "../../img/close_icon.svg";
import search_light from "../../img/search_icon_light.svg";

import axios from "axios";


const Header = () => {
    const location = useLocation();

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }

        console.log(isAuth);
    }, [isAuth])

    function openMenu() {
        document.querySelector(".header__popup").style.transform = "translateX(0)";
    }

    function closeMenu() {
        document.querySelector(".header__popup").style.transform = "translateX(295px)";
    }

    function scrollToSection(section) {
        if (location.pathname !== '/book_store') {
            setTimeout(() => {
                document.querySelector(`.${section}`).scrollIntoView({behavior: 'smooth'});
            }, 100);
        }
        else {
            document.querySelector(`.${section}`).scrollIntoView({behavior: 'smooth'});
        }
    }

    let [searchValue, setSearchValue] = useState('');
    let [searchList, setSearchList] = useState([]);

    const [BooksList, setBooksList] = useState([]);
    const [BasketList, setBasketList] = useState([]);
    const [data, setData] = useState([])
    const [user, setUser] = useState({basketList: []});
    
        useEffect(() => {
            const fetchData = async () => {
              try {
                const data = await ApiGetBooks();
                setBooksList(data);
              } catch (err) {
                console.log(err);
              }
            }
        
            fetchData();
        }, [])

        useEffect(() => {
            (async () => {
              const token = localStorage.getItem("access_token");
              if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                try {
                  const response = await axios.get("http://127.0.0.1:8000/home/");
                  setData(response.data);
                } catch (error) {
                  console.error(error);
                }
              } else {
                console.error("Токен авторизации не найден");
              }
            })();
          }, [isAuth]);
        
          useEffect(() => {
            if (data) {
                setUser(data);
                console.log(user);
        
                (async () => {
                    const token = localStorage.getItem("access_token");
                    if (token) {
                      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                      console.log(user);
                      try {
                        const response = await axios.get(`http://127.0.0.1:8000/basket/?userId=${user.id}`);
                        setBasketList(response.data);
                      } catch (error) {
                        console.error(error);
                      }
                    } else {
                      console.error("Токен авторизации не найден");
                    }
                  })();
            }
          }, [data]);

    return (  
        <header className="header">
            <Link className="header__home-link" to="/book_store" onClick={sqrollToHeader}>
                <img src={logo} alt="Логотип" className="header__logo"/>
                <h1 className="header__title">BOOK STORE</h1>
            </Link>

            <nav className="header__navbar">
                <NavLink to="/book_store" onClick={() => {scrollToSection("catalog");}} className="header__link">Каталог</NavLink>
                <NavLink to="/book_store" onClick={() => {scrollToSection("about");}} className="header__link">О магазине</NavLink>
                <NavLink to="/book_store" onClick={() => {scrollToSection("contacts")}} className="header__link">Блог</NavLink>
            </nav>

            <div className="header__search">

                <div className="header__search__input-block">
                    <img src={search} alt="Поиск" className="header__search-logo"/>
                    <input type="text" className="header__search-input" placeholder="Поиск" onChange={
                        (event) => {
                            document.querySelector(".header__search__container").style.display = "flex";
                            setSearchValue(event.target.value);
                            setSearchList(BooksList.filter(book => book.title.toLowerCase().includes(searchValue.toLowerCase())));
                        }
                    } />
                </div>

                <ul className="header__search__container">
                    {
                        searchList.length === 0 || searchValue === ''
                            ?<li>Ничего не найдено</li>

                            :searchList.map((book) => {
                                return (
                                    <li className="header__search__item">
                                        <Link to={`/book_store/product/${book.id}`} className="header__search__link" onClick={() => {closeMenu();}}>
                                            <img src={book.img} alt={book.title} className="header__search__item-img" />

                                            <div className="header__search__item-about">
                                                <h1 className="header__search__item-title">{book.title}</h1>
                                                <p className="header__search__item-author">{book.author}</p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                        })
                    }
                </ul>
            </div>



            <button className="header__basket" onClick={() => {
                if (isAuth === false) {
                    alert("Вы должны авторизироваться.");
                    window.location.href = '/auth';
                }
            }}>
                <Link to="/book_store/basket" className="header__basket-link"><img src={basket} alt="Корзина" className="header__basket-image"/></Link>

                { 
                    isAuth
                    ? <div className="basket-counter">{BasketList.length}</div>
                    :<></>
                }
            </button>

            {
                isAuth
                    ? <Link to="/book_store/profile" className="header__auth">Профиль</Link>
                    :<Link to="/book_store/auth" className="header__auth">Войти</Link>
            }


            <button className="header__menu-button" onClick={openMenu}><img src={menu_button} alt="Открыть меню" className="header__menu-button-img" /></button>

            <div className="header__popup">
                <button className="header__popup__close" onClick={closeMenu}><img src={close_icon} alt="Закрыть меню" className="header__popup__close-img" /></button>

                <div className="header__search header__search__popup">

                    <div className="header__search__input-block">
                        <img src={search_light} alt="Поиск" className="header__search-logo"/>
                        <input type="text" className="header__search-input" placeholder="Поиск" onChange={
                            (event) => {
                                document.querySelector(".header__search__container__popup").style.display = "flex";
                                setSearchValue(event.target.value);
                                setSearchList(BooksList.filter(book => book.title.toLowerCase().includes(searchValue.toLowerCase())));
                            }
                        } />
                    </div>

                    <ul className="header__search__container header__search__container__popup">
                        {
                            searchList.length === 0 || searchValue === ''
                                ?<li className="header__search__popup__none">Ничего не найдено</li>

                                :searchList.map((book) => {
                                    return (
                                        <li className="header__search__item">
                                            <Link to={`/book_store/product/${book.id}`} className="header__search__link" onClick={() => {closeMenu();}}>
                                                <img src={book.img} alt={book.title} className="header__search__item-img" />

                                                <div className="header__search__item-about">
                                                    <h1 className="header__search__item-title">{book.title}</h1>
                                                    <p className="header__search__item-author">{book.author}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                            })
                        }
                    </ul>
                </div>

                <nav className="header__navbar header__navbar__popup">
                <NavLink to="/book_store" onClick={() => {scrollToSection("catalog");}} className="header__link header__link__popup">Каталог</NavLink>
                <NavLink to="/book_store" onClick={() => {scrollToSection("about");}} className="header__link header__link__popup">О магазине</NavLink>
                <NavLink to="/book_store" onClick={() => {scrollToSection("contacts")}} className="header__link header__link__popup">Блог</NavLink>
                </nav>

                {
                    isAuth
                        ?<Link to="/book_store/profile" className="header__auth header__auth__popup">Профиль</Link>
                        :<Link to="/book_store/auth" className="header__auth header__auth__popup">Войти</Link>
                }
            </div>
        </header>
    );
}
 
export default Header;