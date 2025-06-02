import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
import { ApiCheckAuth } from "../../API/API";


const ProfileEdit = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [oldUser, setOldUser] = useState({groups: [{ name: "" }] });
  
    const [isAuth, setIsAuth] = useState(false);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      if (localStorage.getItem("access_token") !== null) {
        setIsAuth(true);
      } else {
        alert('Вы не авторизованы!');
        window.location.href = "/book_store/profile";
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
        setOldUser(data);
        console.log(oldUser);
        document.getElementById('username').value = oldUser.username;
        document.getElementById('email').value = oldUser.email;
        setUserName(oldUser.username);
        setEmail(oldUser.email);
      }
    }, [data]);
    
    const submit = async (event) => {
        event.preventDefault();
        
        if (document.querySelector('#password').value === document.querySelector('#return-password').value){

            const user = {
                id: oldUser.id,
                username: userName,
                email: email,
                password: password,
                groups: oldUser.groups,
            };

            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };

            try {
                await axios.put('http://127.0.0.1:8000/user/', user, config)
                window.location.href ='/book_store/profile';

                alert('Ваши данные успешно изменены!');
            } catch(error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.email[0]);
                } else {
                    alert('Произошла ошибка');
                }
            }
        } else {
            alert('Пароли не совпадают');
        }   
    }
    
    return ( 
        <main className="main">
            <main className="main">
                <form action="" className="auth-form">
                    <h1 className="auth-form__title">Редактировать профиль</h1>

                    <input type="email" id='email' placeholder="Введите email" className="auth-form__input" 
                    onChange={event => {setEmail(event.target.value)}}/>
                    <input type="text" id='username' placeholder="Введите логин" className="auth-form__input" 
                    onChange={event => {setUserName(event.target.value)}}/>
                    <input type="password" placeholder="Введите пароль" className="auth-form__input"  
                    onChange={event => {setPassword(event.target.value)}} id="password"/>
                    <input type="password" placeholder="Повторите пароль" className="auth-form__input" id="return-password"/>

                    <button type="submit" className="auth-form__button reg-form__button" onClick={submit}>Сохранить</button>
                </form>
            </main> 
        </main>
     );
}
 
export default ProfileEdit;