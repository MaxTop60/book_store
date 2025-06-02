import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import './style.css';

import loading from '../../img/loading.png';

import { ApiCheckAuth, ApiGetUsers, ApiChangeOrderStatus } from "../../API/API";

const AdminOrdersEdit = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
      basketList: [],
      groups: [{ name: "" }],
      orders: [],
    });
  
    const [isAuth, setIsAuth] = useState(false);
    const [data, setData] = useState(null);
    const [users, setUsers] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [orders, setOrders] = useState([])
  
    const [item, setItem] = useState({
      id: 1,
      title: "",
      author: "",
      price: 0,
      img: "",
      category: ["books", "stocks"],
    });
  
    useEffect(() => {
      if (localStorage.getItem("access_token") !== null) {
        setIsAuth(true);
      }
  
      console.log(isAuth);
    }, [isAuth]);
  
    useEffect(() => {
      (async () => {
        const dataAuth = await ApiCheckAuth();
        setData(dataAuth);
      })();
    }, [isAuth]);
  
    useEffect(() => {
      if (data) {
        setUser(data);
        console.log(data);
      }
    }, [data]);
  
    useEffect(() => {
      if (item.book) {
        console.log(item);
      }
    }, [item]);

    useEffect(() => {
        if (user.username) {
            if (!(user.groups[0].name === 'Менеджер' || user.groups[0].name === 'Администратор')) {
                alert("У вас нет прав для просмотра этой страницы");
                window.location.href = '/book_store';
            }
        }
    }, [user])

    useEffect(() => {
        (async () => {
            const response = await ApiGetUsers();
            setUsersData(response.data);
        })();
    }, [])

    useEffect(() => {
        if (usersData) {
            setUsers(usersData);
            console.log(usersData);
            usersData.forEach(el => {
                setOrders(prevOrders => [...prevOrders, ...el.orders]);
            })
        }
    }, [data])

    useEffect(() => {
        if (orders) {
            console.log(orders);
            const order = orders.find(el => el.id == id);
            if (order) {
                setItem(order);
                setIsLoading(true);
            }
        }
    }, [orders]);
    
    const statusSubmit = () => {
        try {
            (async () => {
                const response = await ApiChangeOrderStatus(item);
                console.log(response);
            })();

            alert('Статус заказа изменен');
        } catch (error) {
            console.error(error);
            alert('Ошибка');
        }
        
    }
    

    return ( 
        <main className="main">
            {isLoading ? (
                    <section className="product-info">
                      <img
                        src={"http://127.0.0.1:8000" + item.book.img}
                        alt={item.book.title}
                        className="product-info__img"
                      />
            
                      <div className="product-info__about">
                        <h1 className="product-info__title">{item.book.title}</h1>
                        <h2 className="product-info__author">{item.book.author}</h2>
                        <h2 className="product-info__price">{item.book.price} руб.</h2>
                      </div>
                    </section>
                  ) : (
                    <img src={loading} className="loading" />
                  )}
            
            <div className="status status-edit">
                <h2 className="status__title">Статус заказа</h2>
                <select
                    value={item.status}
                    onChange={event => {
                        setItem({ ...item, status: event.target.value });
                    }}

                    className="status__change"
                >
                    <option value="processing">В обработке</option>
                    <option value="assembling">На сборке</option>
                    <option value="in_transit">В пути</option>
                    <option value="ready_to_pick_up">Можно забирать</option>
                </select>

                <button className="status__submit link" onClick={statusSubmit}>Сохранить</button>
            </div>
        </main>
     );
}
 
export default AdminOrdersEdit;