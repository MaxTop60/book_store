import './style.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BasketList } from '../../helpers/BasketList';

const Basket_Elem = (props) => {
    let price = props.price;
    let [number, setNumber] = useState(props.number);


    console.log(BasketList);
    console.log(props.id);

    return ( 
        <>
                <Link className="basket__elem__link"to={`/product/${props.id}`}><img src={props.img} alt="Картинка книги" className="basket__elem__img" /></Link>

                <div className="basket__elem__info-block">
                    <h1 className="basket__elem__title">{props.title}</h1>
                    <h2 className="basket__elem__author">{props.author}</h2>
                </div>

                <div className="basket__elem__num-of-products">
                    <button className="basket__elem__num-of-products__button" onClick={(event) => {
                        let result =props.numOfProductsMinus(event, number, price);
                        if (number > 1) {
                            setNumber(number - 1);
                            BasketList.find((el) => el.id === props.id).number = number - 1;
                        } else {
                            if (result) {
                                BasketList.splice(BasketList.findIndex((el) => el.id === props.id), 1);
                            }
                        }
                        }}>-</button>
                    <h2 className="basket__elem__num-of-products__number">{number}</h2>
                    <button className="basket__elem__num-of-products__button" onClick={(event) => {
                        props.numOfProductsPlus(event, price);
                        setNumber(number + 1);

                        BasketList.find((el) => el.id === props.id).number = number + 1;
                        }}>+</button>
                </div>

                <h1 className="basket__elem__price">{price * number} руб.</h1>
        </>
     );
}
 
export default Basket_Elem;