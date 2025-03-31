import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

import navArrow from "../../img/navigate_arrow.svg";

import sqrollToHeader from "../../helpers/ScrollToHeader";
import Book from "../../components/Book/Book";

const Profile = () => {
  const [user, setUser] = useState({ basketList: [], groups: [{ name: "" }] });
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

  const scrollRight = () => {
    document.querySelector('.new-products__books').scrollBy({
      left: 500,
      behavior: 'smooth'
    });
  }

  const scrollLeft = () => {
      document.querySelector('.new-products__books').scrollBy({
        left: -500,
        behavior: 'smooth'
      });
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
            onClick={scrollLeft}
            className="new-products__nav-button new-products__nav-button_back"
          />
          {
            alreadyView.length > 0
            ? <ul className="new-products__books">
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
            : <p className="new-products__text">Вы ещё ничего не смотрели</p>
          }
          <img
            src={navArrow}
            alt="Вперёд"
            onClick={scrollRight}
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
      </div>
    </main>
  );
};

export default Profile;
