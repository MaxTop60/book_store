import React, { useEffect, useState } from "react";
import axios from "axios";
import './style.css'

const User = (props) => {
    const [groups, setGroups] = useState(props.groups);
    const id = props.id;

    const changeGroup = (groupName) => {
        if (groupName === 'Пользователь') {
            setGroups([
                {
                    "name": "Пользователь",
                    "permissions": [
                        45,
                        46,
                        47,
                        48,
                        41,
                        42,
                        43,
                        44
                    ]
                }
            ])
        } else if (groupName === 'Менеджер') {
            setGroups([
                {
                    "name": "Менеджер",
                    "permissions": [
                        45,
                        46,
                        47,
                        48,
                        37,
                        38,
                        39,
                        40,
                        29,
                        30,
                        31,
                        32,
                        41,
                        42,
                        43,
                        44
                    ]
                }
            ])
        } else {
            setGroups([
                {
                    "name": "Администратор",
                    "permissions": [
                        45,
                        46,
                        47,
                        48,
                        37,
                        38,
                        39,
                        40,
                        41,
                        42,
                        43,
                        44
                    ]
                }
            ])
        }
    }

    const saveUser = (event) => {
        event.preventDefault();

        const newUser = {
            id: props.id,
            email: props.email,
            groups: groups,
            username: props.username
        }

        try {
            (async () => {
                axios.put('http://127.0.0.1:8000/user/', newUser);
            })();

            alert('Роль пользователя успешно изменена!');
        } catch (e) {
            console.log(e);
        }
    }


    return ( 
        <li className="user">
            <div className="user__info">
                <h1 className="user__title">{props.username}</h1>
                <h2 className="user__email">{props.email}</h2>
            </div>

            <form action="" className="user__form">
                <div className="user__inputs">
                    <div className="user__input-block">
                        <input type="radio" className="user__radio" name={`group-${id}`} id={`user-${id}`} checked={groups[0].name === 'Пользователь' ? true : false}
                        onClick={() => changeGroup('Пользователь')}/>
                        <label htmlFor={`user-${id}`}>Пользователь</label>
                    </div>
                    

                    <div className="user__input-block">
                        <input type="radio" className="user__radio" name={`group-${id}`} id={`manager-${id}`} checked={groups[0].name === 'Менеджер' ? true : false}
                        onClick={() => changeGroup('Менеджер')}/>
                        <label htmlFor={`manager-${id}`}>Менеджер</label>
                    </div>
                    

                    <div className="user__input-block">
                        <input type="radio" className="user__radio" name={`group-${id}`} id={`admin-${id}`} checked={groups[0].name === 'Администратор' ? true : false}
                        onClick={() => changeGroup('Администратор')}/>
                        <label htmlFor={`admin-${id}`}>Администратор</label>
                    </div>
                    
                </div>
                

                <button className="user__save-btn" onClick={saveUser}>Сохранить</button>
            </form>
        </li>
     );
}
 
export default User;

