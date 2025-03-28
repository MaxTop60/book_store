import "./styles/fonts/Montserrat-Bold.woff2";
import "./styles/fonts/Montserrat-Regular.woff2";
import "./styles/fonts/Montserrat-ExtraBold.woff2";
import "./styles/style.css";

import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";

import Header from "./components/header/Header";
import Home from "./pages/Home/Home.js";
import Product from "./pages/Product/Product.js";
import Basket from "./pages/Basket/Basket.js";
import Category from "./pages/Category/Category.js";
import Auth from "./pages/Auth/Auth.js";
import Registration from "./pages/Registration/Registration.js";
import Logout from "./components/Logout/Logout.js";
import Buy from "./pages/Buy/Buy.js";
import Profile from "./pages/Profile/Profile.js";
import Admin from "./pages/Admin/Admin.js";
import AdminBooks from "./pages/AdminBooks/AdminBooks.js";
import AdminBookComplete from "./pages/AdminBookComplete/AdminBookComplete.js";
import AdminBookEdit from "./pages/AdminBookEdit/AdminBookEdit.js";
import AdminUsers from "./pages/AdminUsers/AdminUsers.js";
import Footer from "./components/Footer/Footer.js";

import { ApiRegisterUser } from "./API/API.js";


const App = () => {
    return (
      <div className="App" onClick={(event) => {
        if (!event.target.classList.contains('header__search__container')) {
          document.querySelector('.header__search__container').style.display = 'none';
          document.querySelector('.header__search__container__popup').style.display = 'none';
        } else {
          document.querySelector('.header__search__container').style.display = 'flex';
        }
      }}>
        <Router>
          <Header />

          <main className="content"> {/* Добавил контейнер для основного контента */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/buy/:id" element={<Buy />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/admin' element={<Admin />} />
              <Route path="/admin/books" element={<AdminBooks />} />
              <Route path="/admin/books/complete" element={<AdminBookComplete />} />
              <Route path="/admin/books/edit/:id" element={<AdminBookEdit />} />
              <Route path="/admin/users" element={<AdminUsers />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </div>
    );
}


export default App;
