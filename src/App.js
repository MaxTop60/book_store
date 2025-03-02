import "./styles/style.css";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./pages/Home/Home.js";
import Product from "./pages/Product/Product.js";
import Basket from "./pages/Basket/Basket.js";
import Footer from "./components/Footer/Footer.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/book_store/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
