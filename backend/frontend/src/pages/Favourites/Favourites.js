import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Book from "../../components/Book/Book";
import sqrollToHeader from "../../helpers/ScrollToHeader";

const Favourites = () => {
    const [BooksList, setBooksList] = useState([]);
    const [user, setUser] = useState({ basketList: [], groups: [{ name: "" }], orders: [] });

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
            setBooksList(data.favourites.books);
            console.log(user);
        }
    }, [data]);

    return ( 
        <main className="main">
            <h1 className="main__title">Избранное</h1>

            <div className="main__container">
                <ul className="product-list">
                    {
                    
                        BooksList.length > 0
                            ? BooksList.map((book) => {
                                 
                                    return (
                                        <li key={book.id} className="product-list__item">
                                            <Link to={`/book_store/product/${book.id}`} className="new-products__item-link" onClick={sqrollToHeader}>
                                                <Book
                                                    key={book.id}
                                                    id={book.id}
                                                    img={'http://127.0.0.1:8000' + book.img}
                                                    title={book.title}
                                                    author={book.author}
                                                    price={book.price}
                                                />
                                            </Link>
                                        </li>
                                    )
                              
                            })
                            : <li className="product-list__none">Пока что товаров в этой категории нет</li>

                    }
                </ul>
            </div>

        </main>
     );
}
 
export default Favourites;