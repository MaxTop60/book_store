import { useParams } from "react-router-dom";
import { BooksList } from "../../helpers/BooksList";

import YandexMap from "../../components/YandexMap/YandexMap";

import "./style.css";

const Buy = () => {
    let {id} = useParams();
    const item = BooksList[id];

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
            <section className="product-info">
                <img src={item.img} alt={item.title} className="product-info__img" />

                <div className="product-info__about">
                <h1 className="product-info__title">{item.title}</h1>
                <h2 className="product-info__author">{item.author}</h2>
                <h2 className="product-info__price">{item.price} руб.</h2>
                </div>
            </section>

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
                        <input className="popup-pay__input popup-pay__card-number__input" placeholder="Номер карты" required type="text" id="card-number" name="card-number" inputMode="numeric" autoComplete="cc-number" pattern="[0-9]+" />
                        <input className="popup-pay__input popup-pay__date__input popup-pay__input-short" required type="text" id="expiry-date" name="expiry-date" autoComplete="cc-exp" placeholder="MM/YY" minLength="4" pattern="[0-9/]+" />
                        <input className="popup-pay__input popup-pay__code__input popup-pay__input-short" placeholder="CVC2/CVV2"required type="text" id="security-code" name="security-code" inputMode="numeric" minLength="3" maxLength="4" pattern="[0-9]+" />
                    </div>

                    <button className="popup__button popup-pay__button">Оплатить {item.price} руб.</button>
                </form>
            </section>

            <section className="pay">

            </section>
        </main>
     );
}
 
export default Buy;