import "./styles/style.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./pages/Home/Home.js";
import Product from "./pages/Product/Product.js";
import Basket from "./pages/Basket/Basket.js";
import Category from "./pages/Category/Category.js";
import Auth from "./pages/Auth/Auth.js";
import Registration from "./pages/Registration/Registration.js";
import Buy from "./pages/Buy/Buy.js";
import Footer from "./components/Footer/Footer.js";

function App() {

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
            <Route path="/book_store/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/buy/:id" element={<Buy />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
