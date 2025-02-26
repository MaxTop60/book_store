import "./styles/style.css";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Component } from "react";

import Header from "./components/header/Header";
import Home from "./pages/Home/Home.js";
import Product from "./pages/Product/Product.js";
import Footer from "./components/Footer/Footer.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/book_store/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
