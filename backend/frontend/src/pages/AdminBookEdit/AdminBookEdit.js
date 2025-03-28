import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ApiGetBooks } from "../../API/API";

const AdminBookEdit = () => {
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


  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [BooksList, setBooksList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiGetBooks();
        setBooksList(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (BooksList.length > 0) {
        const item = BooksList.find((book) => book.id === parseInt(id));

        setTitle(item.title);
        setAuthor(item.author);
        setPrice(item.price);
        setCategories(item.category);
        setImg(item.img);
    } 
  }, [BooksList]);

  const completeBook = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", id)
    formData.append("title", title);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("img", img);

    categories.forEach((category) => {
      formData.append("category", category);
    });

    console.log(formData);

    const response = await axios.put(`http://127.0.0.1:8000`, formData);
    if (response && response.status) {
      console.log(response.status);
    }

    window.location.href = "/admin/books";
  };


  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setCategories([...categories, event.target.value]);
    } else {
      setCategories(
        categories.filter((category) => category !== event.target.value)
      );
    }
  };

  return (
    <main className="main">
      <form className="buy__form">
        <h1 className="buy__form__title">Добавить товар</h1>

        <div className="inputs-book">
          <input
            type="text"
            className="input-book"
            placeholder="Название"
            required
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <input
            type="text"
            className="input-book"
            placeholder="Автор"
            required
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
          <input
            type="text"
            className="input-book"
            placeholder="Цена"
            required
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <label htmlFor="" className="input-image-book-label">Изображение</label>
          <br />
          <input
            type="file"
            className="input-image-book"
            placeholder="Изображение"
            onChange={(event) => {
              setImg(event.target.files[0]);
            }}
          />

          <h2 className="categories__title">Выберите категории</h2>

          <div className="categories">

            <label>
              <input
                type="checkbox"
                value="books"
                className="category"
                onChange={handleCheckboxChange}
              />{" "}
              Книги
            </label>
            <label>
              <input
                type="checkbox"
                value="el-books"
                className="category"
                onChange={handleCheckboxChange}
              />{" "}
              Электронные книги
            </label>
            <label>
              <input
                type="checkbox"
                value="audio-books"
                className="category"
                onChange={handleCheckboxChange}
              />{" "}
              Аудиокниги
            </label>
            <label>
              <input
                type="checkbox"
                value="toys"
                className="category"
                onChange={handleCheckboxChange}
              />{" "}
              Игрушки, творчество
            </label>
            <label>
              <input
                type="checkbox"
                value="acessories"
                className="category"
                onChange={handleCheckboxChange}
              />{" "}
              Книжные аксессуары
            </label>
            <label>
              <input
                type="checkbox"
                value="notebooks"
                className="category"
                onChange={handleCheckboxChange}
              />{" "}
              Блокноты
            </label>
            <label>
              <input
                type="checkbox"
                value="table-games"
                className="category"
                onChange={handleCheckboxChange}
              />{" "}
              Настольные игры
            </label>
            <label>
              <input
                type="checkbox"
                value="presents"
                className="category"
                onChange={handleCheckboxChange}
              />{" "}
              Подарки
            </label>
            <label>
              <input
                type="checkbox"
                value="stocks"
                className="category"
                onChange={handleCheckboxChange}
              />{" "}
              Акции
            </label>
          </div>
        </div>

        <button
          className="popup__button popup-pay__button"
          onClick={completeBook}
        >
          Сохранить
        </button>
      </form>
    </main>
  );
};

export default AdminBookEdit;
