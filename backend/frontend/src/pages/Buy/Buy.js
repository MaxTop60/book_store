import React, {useState, useEffect} from "react";
import axios from "axios";

import { ApiGetBooks, ApiCheckAuth } from "../../API/API";

import { useParams } from "react-router-dom";

import YandexMap from "../../components/YandexMap/YandexMap";

import "./style.css";
import loading from '../../img/loading.png';

import emailjs from 'emailjs-com'

const Buy = () => {
    const [BooksList, setBooksList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [item, setItem] = useState({
      id: 1,
      title: "",
      author: "",
      price: 0,
      img: "",
      category: ["books", "stocks"],
    });
  
    const [user, setUser] = useState({id: 1});
    const [isAuth, setIsAuth] = useState(false);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      if (localStorage.getItem("access_token") !== null) {
        setIsAuth(true);
      } else {
        alert("Вы не авторизованы!");
        window.location.href = "/book_store";
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
      const fetchData = async () => {
        try {
          const response = await ApiGetBooks();
          setBooksList(response);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      if (BooksList.length > 0) {
        console.log(BooksList);
        setItem(BooksList.find((el) => el.id === parseInt(id)));
        setIsLoading(true);
      }
    }, [BooksList]);

    function changeDelivery(event) {
        document.querySelector('.delivery-popup__change-button_active').classList.remove('delivery-popup__change-button_active');
        event.target.classList.toggle('delivery-popup__change-button_active');

        if (event.target.name === 'delivery') {
            document.querySelector('.pickup').style.display = 'none';
            document.querySelector('.del').style.display = 'flex';
        } else {
            document.querySelector('.pickup').style.display = 'flex';
            document.querySelector('.del').style.display = 'none';
        }
    }

    function buySubmit(event) {
      event.preventDefault();

      try {
        (async () => {
          await axios.post('http://127.0.0.1:8000/home/', { user, book_id: item.id });

          emailjs.send('service_nv3ifui', 'template_n0g5tdp', { email: user.email }, 'L8SmviZVaTGGCa4kn')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
        })();

        alert('Спасибо за покупку!')
        window.location.href = "/book_store/profile";

      } catch (err) {
        console.log(err);
        alert('Ошибка при оформлении заказа');
      }      
    }

    return ( 
        <main className="main">
          {
            isLoading
              ?<section className="product-info">
                  <img src={item.img} alt={item.title} className="product-info__img" />

                  <div className="product-info__about">
                  <h1 className="product-info__title">{item.title}</h1>
                  <h2 className="product-info__author">{item.author}</h2>
                  <h2 className="product-info__price">{item.price} руб.</h2>
                  </div>
              </section>
              :<img src={loading} className="loading"/>
          }
            

            <section className="buy">
                <h1 className="buy__title">Выберите адрес доставки</h1>

                <div className="delivery-popup__change">
                    <button className="delivery-popup__change-button" 
                    onClick={
                        changeDelivery
                    }
                    name="pickup"
                    >Самовывоз</button>
                    <button className="delivery-popup__change-button delivery-popup__change-button_active" 
                    onClick={
                        changeDelivery
                    }
                    name="delivery"
                    >Доставка</button>
                </div>

                <form action="" className="popup__form delivery-popup__form del">
                    <input type="text" placeholder="Введите адрес" className="delivery-popup__input" required/>
                </form>

                <form action="" className="popup__form delivery-popup__form pickup">
                    <YandexMap />
                </form>

                <form className="buy__form">
                    <h1 className="buy__form__title">Введите данные для оплаты</h1>

                    <div className="popup-pay__inputs">
                        <input className="popup-pay__input popup-pay__card-number__input" placeholder="Номер карты" type="text" id="card-number" name="card-number" inputMode="numeric" autoComplete="cc-number" pattern="[0-9]+" />
                        <input className="popup-pay__input popup-pay__date__input popup-pay__input-short" type="text" id="expiry-date" name="expiry-date" autoComplete="cc-exp" placeholder="MM/YY" minLength="4" pattern="[0-9/]+" />
                        <input className="popup-pay__input popup-pay__code__input popup-pay__input-short" placeholder="CVC2/CVV2" type="text" id="security-code" name="security-code" inputMode="numeric" minLength="3" maxLength="4" pattern="[0-9]+" />
                    </div>

                    <button className="popup__button popup-pay__button" onClick={buySubmit}>Оплатить {item.price} руб.</button>
                </form>
            </section>

            <section className="pay">

            </section>
        </main>
     );
}
 
export default Buy;