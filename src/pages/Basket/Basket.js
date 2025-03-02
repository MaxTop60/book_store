import Basket_Elem from "../../components/Basket_ELem/Basket_Elem";
import { BasketList } from "../../helpers/BasketList";

import "./style.css";

const Basket = () => {
    return ( 
        <main className="main">
            <div className="basket">
                <h1 className="basket__title">Корзина</h1>

                <ul className="basket__container">
                    {
                        BasketList.map(elem => {
                            return (
                                <Basket_Elem  key={elem.id} img={elem.img} title={elem.title} author={elem.author} price={elem.price} />
                            )
                        })
                    }
                </ul>
            </div>
        </main>
     );
}
 
export default Basket;