import React, {useState, useEffect} from "react";
import axios from 'axios';

import { Link } from "react-router-dom";

import Book from "../../components/Book/Book";

import sqrollToHeader from "../../helpers/ScrollToHeader";

import { ApiCheckAuth, ApiGetUsers } from "../../API/API";

import './style.css';

const AdminOrders = () => {
    const [user, setUser] = useState({basketList: [], groups: [{name: 'Администратор'}]});

    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      if (localStorage.getItem("access_token") !== null) {
        setIsAuth(true);
      }
  
      console.log(isAuth);
    }, [isAuth]);
  
    useEffect(() => {
      (async () => {
        const dataAuth = await ApiCheckAuth();
        setUserData(dataAuth);
      })();
    }, [isAuth]);

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData]);

    useEffect(() => {
        if (user.groups) {
            console.log(user);
            if (!(user.groups.find(elem => elem.name === 'Администратор') || user.groups.find(elem => elem.name === 'Менеджер'))) {
                alert('Нет прав');
                window.location.href = '/book_store';
            }
        }
    }, [user])

    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        (async () => {
            const response = await ApiGetUsers();
            setData(response.data);
        })();
    }, [])

    useEffect(() => {
        if (data) {
            setUsers(data);
            console.log(users)
        }
    }, [data])

    return ( 
        <main className="main">
            {
                users.map((user) => {
                    return (
                    <div className="main__container orders__container">
                        <h1 className="main__title">{user.username}</h1>

                        <ul className="product-list orders__list">
                            {
                            
                                user.orders.length > 0
                                    ? user.orders.map((book) => {
                                            return (
                                                <li key={book.id} className="product-list__item">
                                                    <Link to={`/book_store/admin/orders/edit/${book.id}`} className="new-products__item-link">
                                                        <Book
                                                            key={book.book.id}
                                                            id={book.book.id}
                                                            userId={user.id}
                                                            orderId = {book.id}
                                                            img={'http://127.0.0.1:8000' + book.book.img}
                                                            title={book.book.title}
                                                            author={book.book.author}
                                                            price={book.book.price}
                                                            admin={true}
                                                            order={true}
                                                        />
                                                    </Link>
                                                </li>
                                            )     
                                    })
                                    : <li className="product-list__none">Пока что товаров нет</li>

                            }
                        </ul>
                    </div>
                    )
                })
            }
        </main>
     );
}
 
export default AdminOrders;