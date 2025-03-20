import React from "react";

import { data, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApiGetBooks, ApiPostReview, ApiGetReviews } from "../../API/API";
import Review from "../../components/Review/Review";
import axios from "axios";

import sqrollToHeader from "../../helpers/ScrollToHeader";

import "./style.css";

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

  const [user, setUser] = useState(null);
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
    }
  }, [BooksList]);

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
    if (isAuth) {
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
      const response = await axios.post(`http://127.0.0.1:8000/basket/`, {bookId: item.id, userId: user.id});
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
  
      (async () => {
        const response = await axios.post(`http://127.0.0.1:8000/basket/`, {bookId: item.id, userId: user.id});
      })()
      setCounter(counter + 1);
    } else {
      alert('Вы должны авторизироваться');
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

          <div className="product-info__links">
            <Link
              to={{ pathname: `/buy/${item.id}` }}
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
          </div>
        </div>
      </section>

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
