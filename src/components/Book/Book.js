import "./style.css";

import { NavLink } from "react-router-dom";

const Book = (props) => {
    return ( 
        <>
            <img src={props.img} alt={props.title} className="new-products__item-image" />
            <h1 className="new-products__item-price">{props.price}</h1>
            <h2 className="new-products__item-title">{props.title}</h2>
            <p className="new-products__item-author">{props.author}</p>
            <button className="new-products__item-button">В КОРЗИНУ</button>
        </>
    );
}
 
export default Book;