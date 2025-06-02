import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import loading from "../../img/loading.png";
import "./style.css";
import { ApiCheckAuth } from "../../API/API";

const Order = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    basketList: [],
    groups: [{ name: "" }],
    orders: [],
  });

  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState(null);

  const [item, setItem] = useState({
    id: 1,
    title: "",
    author: "",
    price: 0,
    img: "",
    category: ["books", "stocks"],
  });

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
      console.log(data);
      setItem(data.orders.find((el) => el.id == id));
      setIsLoading(true);
    }
  }, [data]);

  useEffect(() => {
    if (item.book) {
      console.log(item);
    }
  }, [item]);

  return (
    <main className="main">
      {isLoading ? (
        <section className="product-info">
          <img
            src={"http://127.0.0.1:8000" + item.book.img}
            alt={item.book.title}
            className="product-info__img"
          />

          <div className="product-info__about">
            <h1 className="product-info__title">{item.book.title}</h1>
            <h2 className="product-info__author">{item.book.author}</h2>
            <h2 className="product-info__price">{item.book.price} руб.</h2>
          </div>
        </section>
      ) : (
        <img src={loading} className="loading" />
      )}

      <div className="status">
        <h2 className="status__title">Статус заказа</h2>
        <div className="status__line">
          <div
            className="status__fill"
            style={{
              width: `${
                item.status === "processing"
                  ? 0
                  : item.status === "assembling"
                  ? 33
                  : item.status === "in_transit"
                  ? 66
                  : 100
              }%`,
            }}
          ></div>
          <div
            className='status__point status__point--active'
          >
            <div className="status__label">В обработке</div>
          </div>
          <div
            className={`status__point ${
                item.status === "assembling" || item.status === "in_transit" || item.status === "ready_to_pick_up" ? "status__point--active" : ""
            }`}
          >
            <div className="status__label">На сборке</div>
          </div>
          <div
            className={`status__point ${
                item.status === "in_transit" || item.status === "ready_to_pick_up" ? "status__point--active" : ""
            }`}
          >
            <div className="status__label">В пути</div>
          </div>
          <div
            className={`status__point ${
              item.status === "ready_to_pick_up" ? "status__point--active" : ""
            }`}
          >
            <div className="status__label">Можно забирать</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Order;
