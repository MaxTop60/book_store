import "./style.css";

import React from "react";
import { Link } from "react-router-dom";
import sqrollToHeader from "../../helpers/ScrollToHeader";
import axios from "axios";

const Book = (props) => {
    const deleteBook = (event) => {
        event.preventDefault();

        if (!props.order) {
            axios.delete(`http://localhost:8000/`, {data: {id: props.id}});
        } else {
            axios.delete('http://localhost:8000/user/', {data: {user_id: props.userId, order_id: props.orderId}})
        } 

        event.target.parentNode.parentNode.remove();
    }

    return ( 
        <>  
            <div className="new-products__item-image-container">
                <img src={props.img} alt={props.title} className="new-products__item-image" />
            </div>
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