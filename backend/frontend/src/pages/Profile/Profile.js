import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

import navArrow from "../../img/navigate_arrow.svg";

import sqrollToHeader from "../../helpers/ScrollToHeader";
import Book from "../../components/Book/Book";

import { ApiCheckAuth } from "../../API/API";

const Profile = () => {
  const [user, setUser] = useState({ basketList: [], groups: [{ name: "" }], orders: [] });
  const [alreadyView, setAlreadyView] = useState([]);

  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }

    console.log(isAuth);
  }, [isAuth]);

  useEffect(() => {
    (async () => {
      const dataAuth = await ApiCheckAuth();
                      setData(dataAuth);
    })();
  }, [isAuth]);

  useEffect(() => {
    if (data) {
      setUser(data);
      console.log(user);
    }
  }, [data]);


  useEffect(() => {
    if (user.username) {
      (async () => {
        const token = localStorage.getItem("access_token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          console.log(user);
          try {
            const response = await axios.get(
              `http://127.0.0.1:8000/already_view/?views_userId=${user.id}`
            );
            setAlreadyView(response.data.reverse());
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error("Токен авторизации не найден");
        }
      })();
    }
  }, [user])

  const scrollRight = (name) => {
    if (name === 'view') {
      document.querySelector('.new-products__books_a').scrollBy({
        left: 500,
        behavior: 'smooth'
      });
    } else {
      document.querySelector('.new-products__books_o').scrollBy({
        left: 500,
        behavior: 'smooth'
      });
    }
    
  }

  const scrollLeft = (name) => {
    if (name === 'view') {
      document.querySelector('.new-products__books_a').scrollBy({
        left: -500,
        behavior: 'smooth'
      });
    } else {
      document.querySelector('.new-products__books_o').scrollBy({
        left: -500,
        behavior: 'smooth'
      });
    }
      
  }

  return (
    <main className="main">
      <h1 className="profile__title">Добро пожаловать, {user.username}!</h1>

      <section className="new-products already-view">
        <h1 className="new-products__title">Уже смотрели</h1>
        <div className="new-products__container">
          <img
            src={navArrow}
            alt="Назад"
            onClick={() => scrollLeft('view')}
            className="new-products__nav-button new-products__nav-button_back"
          />
          {
            alreadyView.length > 0
            ? <ul className="new-products__books new-products__books_a">
                {alreadyView.reverse().map((book) => {
                  return (
                    <li className="new-products__item" key={book.id}>
                      <Link
                        to={`/book_store/product/${book.id}`}
                        className="new-products__item-link"
                        onClick={sqrollToHeader}
                      >
                        <Book
                          key={book.id}
                          id={book.id}
                          img={'http://127.0.0.1:8000' + book.img}
                          title={book.title}
                          author={book.author}
                          price={book.price}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            : <p className="new-products__text new-products__books_a">Вы ещё ничего не смотрели</p>
          }
          <img
            src={navArrow}
            alt="Вперёд"
            onClick={() => scrollRight('view')}
            className="new-products__nav-button new-products__nav-button_next"
          />
        </div>
      </section>

      <section className="new-products already-view">
        <h1 className="new-products__title">Ваши заказы</h1>
        <div className="new-products__container">
          <img
            src={navArrow}
            alt="Назад"
            onClick={() => scrollLeft('order')}
            className="new-products__nav-button new-products__nav-button_back"
          />
          {
            user.orders.length > 0
            ? <ul className="new-products__books new-products__books_o">
                {user.orders.map((book) => {
                  return (
                    <li className="new-products__item" key={book.book.id}>
                      <Link
                        to={`/book_store/order/${book.id}`}
                        className="new-products__item-link"
                        onClick={sqrollToHeader}
                      >
                        <Book
                          key={book.book.id}
                          id={book.book.id}
                          img={'http://127.0.0.1:8000' + book.book.img}
                          title={book.book.title}
                          author={book.book.author}
                          price={book.book.price}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            : <p className="new-products__text new-products__books_o">Список заказов пуст.</p>
          }
          <img
            src={navArrow}
            alt="Вперёд"
            onClick={() => scrollRight('order')}
            className="new-products__nav-button new-products__nav-button_next"
          />
        </div>
      </section>

      <div className="links">
        <Link to="/book_store/logout" className="link">
          Выйти
        </Link>

        <Link to="/book_store/profile/edit" className="link">Редактировать профиль</Link>

        {user.groups[0].name === "Администратор" ||
        user.groups[0].name === "Менеджер" ? (
          <Link to="/book_store/admin" className="link">
            Панель администратора
          </Link>
        ) : (
          <></>
        )}

        <Link to="/book_store/favourites" className="link">Избранное</Link>
      </div>
    </main>
  );
};

export default Profile;
