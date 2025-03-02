import img from '../../img/book01.svg';

import './style.css'

const Basket_Elem = (props) => {
    return ( 
        <li className="basket__elem">
            <img src={props.img} alt="Картинка книги" className="basket__elem__img" />

            <div className="basket__elem__info-block">
                <h1 className="basket__elem__title">{props.title}</h1>
                <h2 className="basket__elem__author">{props.author}</h2>
            </div>

            <div className="basket__elem__num-of-products">
                <button className="basket__elem__num-of-products__button">-</button>
                <h2 className="basket__elem__num-of-products__number">1</h2>
                <button className="basket__elem__num-of-products__button">+</button>
            </div>

            <h1 className="basket__elem__price">{props.price}</h1>
        </li>
     );
}
 
export default Basket_Elem;