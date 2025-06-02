import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './style.css'
import { ApiCheckAuth, ApiPostBook } from '../../API/API';

const AdminBookComplete = () => {
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

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState(null);
    const [categories, setCategories] = useState([]);

    const completeBook = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('price', price);
        formData.append('img', img);
        
        categories.forEach(category => {
            formData.append('category', category);
        });

        console.log(formData);
    
        const response = ApiPostBook(formData);
        if (response && response.status) {
            console.log(response.status);
        }
    
        window.location.href = '/book_store/admin/books';
    }

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setCategories([...categories, event.target.value]);
        } else {
            setCategories(categories.filter(category => category !== event.target.value));
        }
    }

    return ( 
        <main className="main">
            <form className="buy__form">
                    <h1 className="buy__form__title">Добавить товар</h1>

                    <div className="inputs-book">
                        <input type="text" className="input-book" placeholder="Название" required
                         onChange={event => {
                            setTitle(event.target.value);
                         }}/>
                        <input type="text" className="input-book" placeholder="Автор" required
                         onChange={event => {
                            setAuthor(event.target.value);
                         }}/>
                        <input type="text" className="input-book" placeholder="Цена" required
                         onChange={event => {
                            setPrice(event.target.value);
                         }}/>
                        <label htmlFor="" className='input-image-book-label'>Изображение</label><br />
                        <input type="file" className="input-image-book" placeholder="Изображение" required
                         onChange={event => {
                            setImg(event.target.files[0]);
                         }}/>

                        <h2 className='categories__title'>Выберите категории</h2>  
                         
                        <div className="categories">

                            <label><input type="checkbox" value="books" className="category" onChange={handleCheckboxChange}/> Книги</label>
                            <label><input type="checkbox" value="el-books" className="category" onChange={handleCheckboxChange}/> Электронные книги</label>
                            <label><input type="checkbox" value="audio-books" className="category" onChange={handleCheckboxChange}/> Аудиокниги</label>
                            <label><input type="checkbox" value="toys" className="category" onChange={handleCheckboxChange}/> Игрушки, творчество</label>
                            <label><input type="checkbox" value="acessories" className="category" onChange={handleCheckboxChange}/> Книжные аксессуары</label>
                            <label><input type="checkbox" value="notebooks" className="category" onChange={handleCheckboxChange}/> Блокноты</label>
                            <label><input type="checkbox" value="table-games" className="category" onChange={handleCheckboxChange}/> Настольные игры</label>
                            <label><input type="checkbox" value="presents" className="category" onChange={handleCheckboxChange}/> Подарки</label>
                            <label><input type="checkbox" value="stocks" className="category" onChange={handleCheckboxChange}/> Акции</label>
                        </div>
                    </div>

                    <button className="popup__button popup-pay__button" onClick={completeBook}>Добавить</button>
            </form>
        </main> 
    );
}
 
export default AdminBookComplete;
