import Basket_Elem from "../../components/Basket_ELem/Basket_Elem";
import YandexMap from "../../components/YandexMap/YandexMap";

import { BasketList } from "../../helpers/BasketList";

import popupClose from "../../img/close_icon_dark.png";

import { useState, useMemo, useEffect } from "react";
import {ReactDOM} from "react-dom";

import "./style.css";

const Basket = () => {
    let [sum, setSum] = useState(0);
    let [count, setCount] = useState(0);

    const newSum = useMemo(() => {
        return BasketList.reduce((acc, elem) => acc + elem.price * elem.number, 0);
    }, [BasketList]);
    
    useEffect(() => {
        setSum(newSum);
    }, [newSum]);

    function openPopup(popup) {
        popup.style.display = 'block';
        setTimeout(function () {
            popup.style.opacity = '1';
        }, 10);
    }

    function closePopup(popup) {
        popup.style.opacity = '0';
        setTimeout(function () {
            popup.style.display = 'none';
        }, 100)
    }

    function numOfProductsPlus(event, price) {
        setSum(sum + price)
    }

    function numOfProductsMinus(event, number, price) {
        if (number === 1) {
            let result = window.confirm('Удалить этот товар из корзины?');
            if (result) {
                setSum(sum - price);
                return result;
            }
        }

        if (document.querySelectorAll('.basket__elem').length === 0) {
            document.querySelector('.basket__container').innerHTML = '<p class="basket__empty">Ваша корзина пуста</p>';
        }
    }

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


    return (
        <main className="main">
            <section className="basket">
                <h1 className="basket__title">Корзина</h1>

                <ul className="basket__container">
                {
                    BasketList.length === 0
                        ? <p className="basket__empty">Ваша корзина пуста</p>
                        : BasketList.map(elem => {
                            return (
                                <li className="basket__elem">
                                        <Basket_Elem 
                                            key={elem.id}
                                            id={elem.id}
                                            number={elem.number} 
                                            img={elem.img} 
                                            title={elem.title} 
                                            author={elem.author} 
                                            price={elem.price} 
                                            numOfProductsPlus={numOfProductsPlus}
                                            numOfProductsMinus={numOfProductsMinus}/>
                                </li>)
                        })
                }
                </ul>
            </section>

            <section className="delivery">
                <h1 className="delivery__title">Доставка</h1>

                <p className="delivery__text">Все товары в корзине будут доставлены в течение 3 дней после оплаты</p>

                <button className="button delivery__button" onClick={() => openPopup(document.querySelector('.delivery-popup'))}>Выберите адрес доставки</button>
            </section>

            <section className="pay">
                <h1 className="pay__title">Итого</h1>
                <h2 className="pay__sum">Сумма заказа: {sum} руб.</h2>

                <button className=" button pay__button" onClick={() => openPopup(document.querySelector('.popup-pay'))}>Заказать</button>
            </section>

            <div className="popup delivery-popup">
                <button className="popup__close delivery-popup__close" onClick={(event) => closePopup(event.target.closest('.popup'))}><img src={popupClose} alt="" className="popup__close__img delivery-popup__close__img" /></button>

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
                    <h1 className="popup__title delivery-popup__title">Выберите адрес доставки</h1>
                    <input type="text" placeholder="Введите адрес" className="delivery-popup__input" required/>
                    <button className="popup__button delivery-popup__button" type="submit">Выбрать</button>
                </form>

                <form action="" className="popup__form delivery-popup__form pickup">
                    <h1 className="popup__title delivery-popup__title">Выберите пункт выдачи</h1>
                    <YandexMap />
                    <button className="popup__button delivery-popup__button" type="submit">Выбрать</button>
                </form>
            </div>

            <div className="popup popup-pay">
                <button className="popup__close popup-pay__close" onClick={(event) => closePopup(event.target.closest('.popup'))}><img src={popupClose} alt="" className="popup__close__img popup-pay__close__img" /></button>

                <form className="popup__form popup-pay__form">
                    <h1 className="popup__title popup-pay__title">Введите данные для оплаты</h1>

                    <div className="popup-pay__inputs">
                        <input className="popup-pay__input popup-pay__card-number__input" placeholder="Номер карты" required type="text" id="card-number" name="card-number" inputMode="numeric" autoComplete="cc-number" pattern="[0-9]+" />
                        <input className="popup-pay__input popup-pay__date__input popup-pay__input-short" required type="text" id="expiry-date" name="expiry-date" autoComplete="cc-exp" placeholder="MM/YY" minLength="4" pattern="[0-9/]+" />
                        <input className="popup-pay__input popup-pay__code__input popup-pay__input-short" placeholder="CVC2/CVV2"required type="text" id="security-code" name="security-code" inputMode="numeric" minLength="3" maxLength="4" pattern="[0-9]+" />
                    </div>

                    <button className="popup__button popup-pay__button">Оплатить {sum} руб.</button>
                </form>
            </div>
        </main>
    );
}

export default Basket;