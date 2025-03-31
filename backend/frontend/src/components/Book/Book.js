import "./style.css";

import React from "react";
import { Link } from "react-router-dom";
import sqrollToHeader from "../../helpers/ScrollToHeader";
import axios from "axios";

const Book = (props) => {
    const deleteBook = (event) => {
        event.preventDefault();
        axios.delete(`http://localhost:8000/`, {data: {id: props.id}});
        event.target.parentNode.parentNode.remove();
    }

    return ( 
        <>
            <img src={props.img} alt={props.title} className="new-products__item-image" />
            <h1 className="new-products__item-price">{props.price} руб.</h1>
            <h2 className="new-products__item-title">{props.title}</h2>
            <p className="new-products__item-author">{props.author}</p>

            {
                props.admin
                    ? <button className="new-products__item-button" onClick={deleteBook}>Удалить</button>
                    : <div className="new-products__item-button"><Link to={`/book_store/product/${props.id}`} className="new-products__item-button-link" onClick={sqrollToHeader}>В корзину</Link></div>
            }
        </>
    );
}
 
export default Book;