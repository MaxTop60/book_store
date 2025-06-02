import "./style.css";

import del from "../../img/delete_icon.svg";

import React, {useEffect, useState} from "react";
import axios from "axios";

import { ApiCheckAuth, ApiDeleteReview } from "../../API/API";

const Review = (props) => {
    const [user, setUser] = useState({groups: [{name: ''}]});
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
          setUser(dataAuth.user);
      })()
  }, [isAuth]);
  
    useEffect(() => {
      setUser(data);
      console.log(user);
    }, [data]);

    const deleteReview = (id) => {
        const result = window.confirm('Удалить отзыв?');

        if (result) {
            ApiDeleteReview(id);
        }
    }

    return ( 
        <li className="reviews__item">
            <h1 className="reviews__item__user-name">{props.userName}</h1>

            <div className="reviews__item__mark">
                <h1 className="reviews__item__title">Оценка: </h1>
                <span className="reviews__item__mark-value">{props.mark}</span>
            </div>
            <div className="reviews__item__text">{props.value}</div>

            {
                user && (user.id === props.userId || user.groups[0].name === 'Администратор' || user.groups[0].name === 'Менеджер')
                    ? <img src={del} alt="" className="reviews__item__delete" onClick={() => {deleteReview(props.id)}}/>
                    : <></>
            }
        </li>
     );
}
 
export default Review;