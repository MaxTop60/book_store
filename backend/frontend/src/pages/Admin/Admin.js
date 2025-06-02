import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ApiCheckAuth } from "../../API/API";

const Admin = () => {
    const [user, setUser] = useState({basketList: [], groups: [{name: 'Менеджер'}]});

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
        const dataAuth = await ApiCheckAuth();
        setData(dataAuth);
      })()
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
                window.location.href = '/book_store';
            }
        }
    }, [user])

    return ( 
        <main className="main">
            <h1 className="title">Панель администратора</h1>

            <div className="links">
              <Link to='/book_store/admin/books' className="link">Товары</Link>

              <Link to='/book_store/admin/orders' className="link">Заказы</Link>

              {
                user.groups[0].name === 'Администратор'
                  ? <Link to='/book_store/admin/users' className="link">Пользователи</Link>
                  : <></>
              }
            </div>
        </main>
     );
}
 
export default Admin;