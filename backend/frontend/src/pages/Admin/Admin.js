import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

    return ( 
        <main className="main">
            <h1 className="title">Панель администратора</h1>

            <div className="links">
              <Link to='/admin/books' className="link">Товары</Link>

              {
                user.groups[0].name === 'Администратор'
                  ? <Link to='/admin/users' className="link">Пользователи</Link>
                  : <></>
              }
            </div>
        </main>
     );
}
 
export default Admin;