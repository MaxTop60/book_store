import { Link, useParams } from "react-router-dom";
import { useState} from "react";
import { BooksList } from "../../helpers/BooksList";
import { BasketList } from "../../helpers/BasketList";
import Review from "../../components/Review/Review";

import sqrollToHeader from "../../helpers/ScrollToHeader";

import "./style.css";

const Product = (props) => {
    const { id } = useParams();
    const item = BooksList[id];
    const [reviews, setReviews] = useState(item.reviews);
    const [counter, setCounter] = useState(0);

    function selectMark(event) {
      let starLabel = event.target;
      let star = document.querySelector(`#${starLabel.htmlFor}`);
      const starsLabels = document.querySelectorAll('.reviews__form__star-label');
      
      starsLabels.forEach(elem => {
        elem.classList.remove("reviews__form__star-label_active");
      })

      if (star.checked === false) {
        starsLabels.forEach((elem) => {
          if (parseInt(elem.htmlFor[elem.htmlFor.length - 1]) <= parseInt(star.id[star.id.length - 1])) {
            elem.classList.add("reviews__form__star-label_active");
            star.checked = true;
          }
        })
      }
    }

    function formSubmit(event) {
      event.preventDefault();

      const review = document.querySelector('.reviews__form__put-review').value;
      const marks = document.querySelectorAll('.reviews__form__star');
      const starsLabels = document.querySelectorAll('.reviews__form__star-label');

      let mark
      marks.forEach(el => {
        if (el.checked) {
          mark = parseInt(el.id[el.id.length - 1]);
        } 
      });

      let isSelectedMark = false;

      document.querySelectorAll('.reviews__form__star-label').forEach(el => {
        if (el.classList.contains("reviews__form__star-label_active")) {
          isSelectedMark = true;
        }
      })

      if (!review || !isSelectedMark) {
        alert("Пожалуйста, заполните все поля");
        return;
      }

      const newReview = {
        userID: 0,
        userName: "Максим",
        value: review,
        mark: mark,
      }

      console.log(newReview);
      
      addReview(newReview); 
      
      starsLabels.forEach(elem => {
        elem.classList.remove("reviews__form__star-label_active");
      })

      document.querySelector('.reviews__form').reset()
    }

    function addReview(newReview) {
      setReviews(prevReviews => [newReview, ...prevReviews]);
    }

    function numberPlus(event) {
      BasketList.find((el) => el.id === item.id).number++;
      event.target.previousElementSibling.innerText = item.number;
    }
    
    function numberMinus(event) {
        if (item.number > 1) {
            BasketList.find((el) => el.id === item.id).number--;
            event.target.nextElementSibling.innerText = item.number;
            BasketList.find((el) => el.id === item.id).number = item.number;
        } else {
            BasketList.pop(item);

            setCounter(counter + 1);
        }
    }
    
    function toBasket(event) {
        event.target.style.display = 'none';
        item.number = 1;
        BasketList.push(item);

        setCounter(counter + 1);
    }
    

    return (
        <main className="main">
          <section className="product-info">
            <img src={item.img} alt={item.title} className="product-info__img" />

            <div className="product-info__about">
              <h1 className="product-info__title">{item.title}</h1>
              <h2 className="product-info__author">{item.author}</h2>
              <h2 className="product-info__price">{item.price} руб.</h2>

              <div className="product-info__links">
                <Link to={{pathname: `/buy/${item.id}` }} className="product-info__link product-info__link_buy" onClick={sqrollToHeader}>Купить сейчас</Link>

                {
                  BasketList.find((el) => el.id === item.id) 
                    ? <div className="basket__elem__num-of-products" >
                        <button className="basket__elem__num-of-products__button" onClick={(numberMinus)}>-</button>
                        <h2 className="basket__elem__num-of-products__number">{BasketList.find((el) => el.id === item.id).number}</h2>
                        <button className="basket__elem__num-of-products__button" onClick={(numberPlus)}>+</button>
                      </div>
                    : <button className="product-info__link product-info__link_to-basket" onClick={toBasket}>В корзину</button>
                }
              </div>
            </div>
          </section>

          <section className="reviews">
            <form className="reviews__form">
              <h1 className="reviews__form__title">Оцените товар и оставьте комментарий</h1>

              <div className="reviews__form__rating">
                <input type="radio" id="star5" name="star" className="reviews__form__star" required />
                <label onClick={selectMark} htmlFor="star5" className="reviews__form__star-label"></label>

                <input type="radio" id="star4" name="star" className="reviews__form__star" required />
                <label onClick={selectMark} htmlFor="star4" className="reviews__form__star-label"></label>

                <input type="radio" id="star3" name="star" className="reviews__form__star" required />
                <label onClick={selectMark} htmlFor="star3" className="reviews__form__star-label"></label>

                <input type="radio" id="star2" name="star" className="reviews__form__star" required />
                <label onClick={selectMark} htmlFor="star2" className="reviews__form__star-label"></label>

                <input type="radio" id="star1" name="star" className="reviews__form__star" required />
                <label onClick={selectMark} htmlFor="star1" className="reviews__form__star-label"></label>
              </div>

              <input type="text" className="reviews__form__put-review" placeholder="Оставьте комментарий" required />

              <button type="submit" onClick={formSubmit} className="reviews__form__submit">Отправить</button>
            </form>

            <h1 className="reviews__title">Отзывы</h1>
            <ul className="reviews__container">
              {reviews.map((review, index) => {
                return (
                  <Review key={index} userName={review.userName} mark={review.mark} value={review.value} />
                )}
                )
              }
            </ul>
          </section>
        </main>
      );
}
 
export default Product;