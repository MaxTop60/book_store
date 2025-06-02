import axios from "axios";
import { data } from "react-router";
const BASE_URL = "http://127.0.0.1:8000/";

export const ApiGetBooks = async () => {
  let details;

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  details = await fetchData();

  return details;
};

export const ApiPostReview = (data) => {
  axios.post(`${BASE_URL}product/:id`, data);
};

export const ApiGetReviews = async (id) => {
  let details;

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}product/:id`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  details = await fetchData();

  return details;
};

export const ApiCheckAuth = async () => {
  const token = localStorage.getItem("access_token");
  const fetchData = async () => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(`${BASE_URL}home/`);
        let data = response.data;
        return data;
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Токен авторизации не найден");
    }
  };

  const data = await fetchData();

  return data;
};

export const ApiGetUserBasket = async (user) => {
  const token = localStorage.getItem("access_token");
  const fetchData = async (user) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(user);
      try {
        const response = await axios.get(
          `${BASE_URL}basket/?userId=${user.id}`
        );
        let data = response.data;
        return data;
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Токен авторизации не найден");
    }
  };

  const data = await fetchData(user);

  return data;
};

export const ApiDeleteReview = async (id) => {
  axios
    .delete(`${BASE_URL}product/:id`, { data: { id: id } })
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const ApiUserChangeRole = async (newUser) => {
  axios.put(`${BASE_URL}user/`, newUser);
};

export const ApiPostBook = async (newBook) => {
  const response = await axios.post(BASE_URL, newBook);
  return response;
};

export const ApiGetUsers = async () => {
  const response = await axios.get(`${BASE_URL}user/`);
  return response;
};

export const ApiChangeOrderStatus = async (item) => {
  const response = await axios.put(`${BASE_URL}orders/`, {
    id: item.id,
    status: item.status,
  });
  return response;
};

export const ApiLogin = async (user) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  try {
    const { data } = await axios.post(
      `${BASE_URL}token/`,
      user,
      config
    );

    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    window.location.href = "/book_store";
  } catch (error) {
    if (error.response && error.response.data) {
      alert("Неверный логин или пароль");
    } else {
      alert("Произошла ошибка");
    }
  }
};

export const ApiRegister = async (user) => {
  const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };

            try {
                await axios.post('http://127.0.0.1:8000/register/', user, config)
                window.location.href ='/book_store/auth';

                alert('Пользователь успешно зарегистрирован');
            } catch(error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.email[0]);
                } else {
                    alert('Произошла ошибка');
                }
            }
}
