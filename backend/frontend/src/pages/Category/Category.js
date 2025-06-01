import React, {useState, useEffect} from "react";

import { Link, useLocation } from "react-router-dom";

import { ApiGetBooks } from "../../API/API";

import Book from '../../components/Book/Book';
import sqrollToHeader from "../../helpers/ScrollToHeader";

import "./style.css";

const Category = () => {
    let location = useLocation();
    let linkText = new URLSearchParams(location.search).get("name");
    
    let url = window.location.href;
    url = url.split('/');
    let category = url[url.length - 1];
    category = category.split('?')[0];

    console.log(category);

    const [BooksList, setBooksList] = useState([]);

    useEffect(() => {
            const fetchData = async () => {
              try {
                const data = await ApiGetBooks();
                setBooksList(data);
              } catch (err) {
                console.log(err);
              }
            }
        
            fetchData();
    }, [])

    return ( 
        <main className="main">
            <h1 className="main__title">{linkText}</h1>

            <div className="main__container">
                <ul className="product-list">
                    {
                    
                        BooksList.find((el) => el.category.find(el => el === category))
                            ? BooksList.map((book) => {
                                if (book.category.find(el => el === category)) {
                                    return (
                                        <li key={book.id} className="product-list__item">
                                            <Link to={`/book_store/product/${book.id}`} className="new-products__item-link" onClick={sqrollToHeader}>
                                                <Book
                                                    key={book.id}
                                                    id={book.id}
                                                    img={book.img}
                                                    title={book.title}
                                                    author={book.author}
                                                    price={book.price}
                                                />
                                            </Link>
                                        </li>
                                    )
                                }        
                            })
                            : <li className="product-list__none">Пока что товаров в этой категории нет</li>

                    }
                </ul>
            </div>
            
        </main>
     );
}
 
export default Category;