import React, {useState, useEffect} from "react";
import axios from 'axios';
import User from "../../components/User/User";
import './style.css'

import { ApiCheckAuth, ApiGetUsers } from "../../API/API";

const AdminUsers = () => {
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
            if (!user.groups.find(elem => elem.name === 'Администратор')) {
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
            <ul className="users">
                {
                    users.map((user) => {
                        return(
                            <User key={user.id} id={user.id} username={user.username} groups={user.groups} email={user.email}/>
                        )
                    })
                }
            </ul>
        </main>
     );
}
 
export default AdminUsers;