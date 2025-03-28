import React from "react";

import navArrow from "../../img/navigate_arrow.svg";
import facebook_icon from "../../img/facebook_icon.svg";
import twitter_icon from "../../img/twitter_icon.svg";
import vk_icon from "../../img/vk_icon.svg";
import inst_icon from "../../img/inst_icon.svg";
import youtube_icon from "../../img/youtube_icon.svg";

import axios from 'axios';

import "./style.css";

import {ApiGetBooks, ApiRegisterUser} from "../../API/API";

import Book from "../../components/Book/Book";
import YandexMap from "../../components/YandexMap/YandexMap";
import sqrollToHeader from "../../helpers/ScrollToHeader";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";




const Home = () => {
    const [BooksList, setBooksList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await ApiGetBooks();
            setBooksList(data.reverse());
          } catch (err) {
            console.log(err);
          }
        }
    
        fetchData();
    }, [])
    
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
                <section className="preview">
                    <div className="preview__info">
                        <h1 className="preview__info-title">Книги от А до Я</h1>
                        <p className="preview__info-text">
                            В нашем магазине можно найти книгу на любой вкус. 
                            Большой ассортимент. Приятные цены. Интересные сюжеты.
                        </p>

                        <a href="#catalog" className="preview__info-link">Перейти в каталог</a>
                    </div>
                </section>

                <section className="new-products">
                    <h1 className="new-products__title">Горячие поступления</h1>
                    <div className="new-products__container">
                        <img src={navArrow} alt="Назад" onClick={scrollLeft} className="new-products__nav-button new-products__nav-button_back" />
                        <ul className="new-products__books">
                            {
                                BooksList.map((book) => {
                                    return (
                                        <li className="new-products__item" key={book.id}>
                                            <Link to={`/product/${book.id}`} className="new-products__item-link" onClick={sqrollToHeader}>
                                                <Book key={book.id} id={book.id} img={book.img} title={book.title} author={book.author} price={book.price} />
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <img src={navArrow} alt="Вперёд" onClick={scrollRight} className="new-products__nav-button new-products__nav-button_next"  />
                    </div>
                </section>

                <section className="catalog" id="catalog">
                    <h1 className="catalog__title">Каталог</h1>
                    <div className="catalog__items">
                        <Link className="catalog__item" to="/category/books?name=Книги" onClick={sqrollToHeader}>Книги</Link>
                        <Link className="catalog__item" to='/category/el-books?name=Электронные книги' onClick={sqrollToHeader}>Электронные книги</Link>
                        <Link className="catalog__item" to='/category/audio-books?name=Аудиокнинги' onClick={sqrollToHeader}>Аудиокниги</Link>
                        <Link className="catalog__item" to='/category/toys?name=Игрушки, творчество' onClick={sqrollToHeader}>Игрушки, творчество</Link>
                        <Link className="catalog__item" to='/category/accessories?name=Книжные аксессуары' onClick={sqrollToHeader}>Книжные аксессуары</Link>
                        <Link className="catalog__item" to='/category/notebooks?name=Блокноты' onClick={sqrollToHeader}>Блокноты</Link>
                        <Link className="catalog__item" to='/category/table-games?name=Настольные игры' onClick={sqrollToHeader}>Настольные игры</Link>
                        <Link className="catalog__item" to='/category/presents?name=Подарки' onClick={sqrollToHeader}>Подарки</Link>
                        <Link className="catalog__item" to='/category/stocks?name=Акции' onClick={sqrollToHeader}>Акции</Link>
                    </div>
                </section>

                <section className="about" id="about">
                    <h1 className="about__title">О магазине</h1>
                    
                    <div className="about__items">
                        <div className="about__item">
                            <p className="about__item-num">35</p>
                            <p className="about__item-text">Филлиалов по всей стране</p>
                        </div>
                        <div className="about__item">
                            <p className="about__item-num">898</p>
                            <p className="about__item-text">Товаров в каталоге</p>
                        </div>
                        <div className="about__item">
                            <p className="about__item-num">8659</p>
                            <p className="about__item-text">Покупателей</p>
                        </div>
                        <div className="about__item">
                            <p className="about__item-num">72</p>
                            <p className="about__item-text">Часа доставка по городам</p>
                        </div>
                    </div>
                </section>
                
                <section className="map">
                    <h1 className="map__title">Наши магазины на карте</h1>

                    <YandexMap />
                </section>

                <section className="contacts" id="contacts">
                    <h1 className="contacts__title">Следите за нами в социальных сетях</h1>

                    <div className="contacts__items">
                        <Link className="contacts__item"><img src={facebook_icon} alt="" className="contacts__item-img" /></Link>
                        <Link className="contacts__item"><img src={twitter_icon} alt="" className="contacts__item-img" /></Link>
                        <Link className="contacts__item"><img src={vk_icon} alt="" className="contacts__item-img" /></Link>
                        <Link className="contacts__item"><img src={inst_icon} alt="" className="contacts__item-img" /></Link>
                        <Link className="contacts__item"><img src={youtube_icon} alt="" className="contacts__item-img" /></Link>
                    </div>
                </section>
            </main>
        );
    } 
 
export default Home;