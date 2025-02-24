import "./styles/style.css";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./pages/Home.js";
import Product from "./pages/Product.js";
import Footer from "./components/Footer/Footer.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
