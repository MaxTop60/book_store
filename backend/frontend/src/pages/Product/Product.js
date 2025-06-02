import React, { use } from "react";

import { data, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApiGetBooks, ApiPostReview, ApiGetReviews, ApiCheckAuth, ApiGetUserBasket } from "../../API/API";
import Review from "../../components/Review/Review";
import axios from "axios";

import sqrollToHeader from "../../helpers/ScrollToHeader";

import "./style.css";
import loading from '../../img/loading.png';
import heart from '../../img/heart.png';
import heart_active from '../../img/heart_active.png'

const Product = () => {
  const [BooksList, setBooksList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filterReviews, setFilterReviews] = useState(reviews);
  const [BasketList, setBasketList] = useState([]);
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
  const [isLoading, setIsLoading] = useState(false)
  const [isFav, setIsFav] = useState(false);

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
      
      (async () => {
        const basketData = await ApiGetUserBasket(data);
                            console.log(basketData);
                            if (basketData) {
                                setBasketList(basketData);
                            }
      })();
    }
    
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiGetBooks();
        setBooksList(response);

        const reviewsData = await ApiGetReviews();
        setReviews(reviewsData);
        console.log(reviews);
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

  useEffect(() => {
    if (BooksList.length > 0 && isAuth) {
      (async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/already_view/', {bookId: item.id, view_userId: user.id});
        } catch (err) {
          console.log(err);
        }
        const response = await axios.put('http://127.0.0.1:8000/already_view/', {bookId: item.id, view_userId: user.id});
      })();
    }
  }, [item])

  useEffect(() => {
    if (user.favourites && user.favourites.books.find((el) => el.id == item.id)) {
      console.log('fav');
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [user, item])

  useEffect(() => {
    setFilterReviews(reviews.filter((el) => el.bookId === item.id));
  }, [reviews]);



  const [counter, setCounter] = useState(0);

  function selectMark(event) {
    let starLabel = event.target;
    let star = document.querySelector(`#${starLabel.htmlFor}`);
    const starsLabels = document.querySelectorAll(".reviews__form__star-label");

    starsLabels.forEach((elem) => {
      elem.classList.remove("reviews__form__star-label_active");
    });

    if (star.checked === false) {
      starsLabels.forEach((elem) => {
        if (
          parseInt(elem.htmlFor[elem.htmlFor.length - 1]) <=
          parseInt(star.id[star.id.length - 1])
        ) {
          elem.classList.add("reviews__form__star-label_active");
          star.checked = true;
        }
      });
    }
  }

  function formSubmit(event) {
    event.preventDefault();
  
    const review = document.querySelector(".reviews__form__put-review").value;
    const marks = document.querySelectorAll(".reviews__form__star");
    const starsLabels = document.querySelectorAll(
      ".reviews__form__star-label"
    );
  
    let mark;
    marks.forEach((el) => {
      if (el.checked) {
        mark = parseInt(el.id[el.id.length - 1]);
      }
    });
  
    let isSelectedMark = false;
  
    document.querySelectorAll(".reviews__form__star-label").forEach((el) => {
      if (el.classList.contains("reviews__form__star-label_active")) {
        isSelectedMark = true;
      }
    });
  
    if (!review || !isSelectedMark) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
  
    console.log(item.id);
  
    const newReview = {
      userId: user.id,
      bookId: item.id,
      userName: user.username,
      value: review,
      mark: mark,
    };
  
    console.log(newReview);
  
    addReview(newReview);
  
    starsLabels.forEach((elem) => {
      elem.classList.remove("reviews__form__star-label_active");
    });
  
    document.querySelector(".reviews__form").reset();
  
    if (isAuth) {
      ApiPostReview(newReview);
    } else {
      alert("Вы должны авторизоваться");
    }
  }

  function addReview(newReview) {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  }

  function numberPlus(event) {
    BasketList.find((el) => el.id === item.id).quantity++;
    event.target.previousElementSibling.innerText = BasketList.find((el) => el.id === item.id).quantity;
  
    (async () => {
      const response = await axios.put(`http://127.0.0.1:8000/basket/`, {bookId: item.id, user: user.id});
    })()
  }
  
  function numberMinus(event) {
    (async () => {
      const response = await axios.delete(`http://127.0.0.1:8000/basket/`, {data:{bookId: item.id, userId: user.id}});

    })()

    if (BasketList.find((el) => el.id === item.id).quantity === 1) {
      window.location.reload();
    } else {
      BasketList.find((el) => el.id === item.id).quantity--;
      event.target.nextElementSibling.innerText = BasketList.find((el) => el.id === item.id).quantity;
    }
    
  }
  
  function toBasket(event) {
    if (isAuth) {
      event.target.style.display = "none";
      item.quantity = 1;
      BasketList.push(item);
      document.querySelector('.basket-counter').innerHTML = BasketList.length;
      (async () => {
        try {
          const response = await axios.post(`http://127.0.0.1:8000/basket/`, {bookId: item.id, userId: user.id});
        } catch (err) {
          console.log(err);
          const response = await axios.put(`http://127.0.0.1:8000/basket/`, {bookId: item.id, user: user.id});
        }
      })()
      setCounter(counter + 1);
    } else {
      alert('Вы должны авторизироваться');
    }
  }

  function toFavouriets(event) {
    if (isAuth) {
      if (isFav) {
        setIsFav(false);
        axios.delete('http://127.0.0.1:8000/favourites/', {data: {book_id: item.id}})
      } else {
        axios.post('http://127.0.0.1:8000/favourites/', {book_id: item.id, userId: user.id})
        setIsFav(true);
      }
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

              <div className="product-info__links">
                <Link
                  to={{ pathname: `/book_store/buy/${item.id}` }}
                  className="product-info__link product-info__link_buy"
                  onClick={sqrollToHeader}
                >
                  Купить сейчас
                </Link>

                {BasketList.find((el) => el.id === item.id) ? (
                  <div className="basket__elem__num-of-products">
                    <button
                      className="basket__elem__num-of-products__button"
                      onClick={numberMinus}
                    >
                      -
                    </button>
                    <h2 className="basket__elem__num-of-products__number">
                      {BasketList.find((el) => el.id === item.id).quantity}
                    </h2>
                    <button
                      className="basket__elem__num-of-products__button"
                      onClick={numberPlus}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="product-info__link product-info__link_to-basket"
                    onClick={toBasket}
                  >
                    В корзину
                  </button>
                )}

                <button className="to-favouriets" onClick={toFavouriets}><img src={isFav ? heart_active : heart} alt="" className="to-favouriets__img" /></button>
              </div>
            </div>
          </section>
          :<img src={loading} className="loading"/>
      }
      

      <section className="reviews">
        <form className="reviews__form">
          <h1 className="reviews__form__title">
            Оцените товар и оставьте комментарий
          </h1>

          <div className="reviews__form__rating">
            <input
              type="radio"
              id="star5"
              name="star"
              className="reviews__form__star"
              required
            />
            <label
              onClick={selectMark}
              htmlFor="star5"
              className="reviews__form__star-label"
            ></label>

            <input
              type="radio"
              id="star4"
              name="star"
              className="reviews__form__star"
              required
            />
            <label
              onClick={selectMark}
              htmlFor="star4"
              className="reviews__form__star-label"
            ></label>

            <input
              type="radio"
              id="star3"
              name="star"
              className="reviews__form__star"
              required
            />
            <label
              onClick={selectMark}
              htmlFor="star3"
              className="reviews__form__star-label"
            ></label>

            <input
              type="radio"
              id="star2"
              name="star"
              className="reviews__form__star"
              required
            />
            <label
              onClick={selectMark}
              htmlFor="star2"
              className="reviews__form__star-label"
            ></label>

            <input
              type="radio"
              id="star1"
              name="star"
              className="reviews__form__star"
              required
            />
            <label
              onClick={selectMark}
              htmlFor="star1"
              className="reviews__form__star-label"
            ></label>
          </div>

          <input
            type="text"
            className="reviews__form__put-review"
            placeholder="Оставьте комментарий"
            required
          />

          <button
            type="submit"
            onClick={formSubmit}
            className="reviews__form__submit"
          >
            Отправить
          </button>
        </form>

        <h1 className="reviews__title">Отзывы</h1>
        <ul className="reviews__container">
          {filterReviews.length === 0 ? (
            <li class="reviews__none">Отзывов пока нет</li>
          ) : (
            filterReviews.map((review, index) => {
              return (
                <Review
                  key={index}
                  userName={review.userName}
                  userId={review.userId}
                  mark={review.mark}
                  value={review.value}
                  id={review.id}
                />
              );
            })
          )}
        </ul>
      </section>
    </main>
  );
};

export default Product;
