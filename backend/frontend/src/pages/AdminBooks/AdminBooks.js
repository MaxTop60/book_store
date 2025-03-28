import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { ApiGetBooks } from "../../API/API";
import Book from "../../components/Book/Book";
import sqrollToHeader from "../../helpers/ScrollToHeader";
import axios from 'axios';
import './style.css';


const Admin = () => {
    const [user, setUser] = useState({basketList: []});

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
        }
    }, [data]);

    useEffect(() => {
        if (user.groups) {
            console.log(user);
            if (!(user.groups.find(elem => elem.name === 'Администратор' || user.groups.find(elem => elem.name === 'Менеджер')))) {
                alert('Нет прав');
                window.location.href = '/';
            }
        }
    }, [user])


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
            <Link to='/admin/books/complete' className="link add-product_link">Добавить товар</Link>

            <div className="main__container">
                <ul className="product-list">
                    {
                    
                        BooksList.length > 0
                            ? BooksList.map((book) => {
                                    return (
                                        <li key={book.id} className="product-list__item">
                                            <Link to={`/admin/books/edit/${book.id}`} className="new-products__item-link" onClick={sqrollToHeader}>
                                                <Book
                                                    key={book.id}
                                                    id={book.id}
                                                    img={book.img}
                                                    title={book.title}
                                                    author={book.author}
                                                    price={book.price}
                                                    admin={true}
                                                />
                                            </Link>
                                        </li>
                                    )     
                            })
                            : <li className="product-list__none">Пока что товаров нет</li>

                    }
                </ul>
            </div>
            
        </main>
    );
}
 
export default Admin;