import "./style.css";
import logo_light from "../../img/logo_light.svg";

const Footer = () => {
    return ( 
        <footer className="footer">
            <img src={logo_light} alt="" className="footer__logo" />
            <h1 className="footer__title">BOOK STORE</h1>
        </footer>
     );
}
 
export default Footer;