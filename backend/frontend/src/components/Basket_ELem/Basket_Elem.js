import "./style.css";

import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import sqrollToHeader from "../../helpers/ScrollToHeader";

const Basket_Elem = (props) => {
  let price = props.price;
  let [number, setNumber] = useState(props.number);

  const [BasketList, setBasketList] = useState([]);
  const [user, setUser] = useState({ basketList: [] });

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

      (async () => {
        const token = localStorage.getItem("access_token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          console.log(user);
          try {
            const response = await axios.get(
              `http://127.0.0.1:8000/basket/?userId=${user.id}`
            );
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
    <>
      <Link
        className="basket__elem__link"
        to={`/book_store/product/${props.id}`}
        onClick={sqrollToHeader}
      >
        <img
          src={`http://127.0.0.1:8000/${props.img}`}
          alt="Картинка книги"
          className="basket__elem__img"
        />
      </Link>

      <div className="basket__elem__info-block">
        <h1 className="basket__elem__title">{props.title}</h1>
        <h2 className="basket__elem__author">{props.author}</h2>
      </div>

      <div className="basket__elem__num-of-products">
        <button
          className="basket__elem__num-of-products__button"
          onClick={(event) => {
            let result = props.numOfProductsMinus(event, number, price);
            if (number > 1) {
              setNumber(number - 1);
              BasketList.find((el) => el.id === props.id).quantity = number - 1;
            } else {
              if (result) {
                BasketList.splice(
                  BasketList.findIndex((el) => el.id === props.id),
                  1
                );

              }
            }
          }}
          name={props.id}
        >
          -
        </button>
        <h2 className="basket__elem__num-of-products__number">{number}</h2>
        <button
          className="basket__elem__num-of-products__button"
          onClick={(event) => {
            props.numOfProductsPlus(event, price);
            setNumber(number + 1);

            BasketList.find((el) => el.id === props.id).quantity = number + 1;
          }}
          name={props.id}
        >
          +
        </button>
      </div>

      <h1 className="basket__elem__price">{price * number} руб.</h1>
    </>
  );
};

export default Basket_Elem;
