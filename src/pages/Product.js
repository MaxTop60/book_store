import { useParams } from "react-router-dom";
import { BooksList } from "../helpers/BooksList/BooksList";

const Product = (props) => {
    const { id } = useParams();
    const item = BooksList[id];

    return (
        <div>
          <h1>{item.title}</h1>
        </div>
      );
}
 
export default Product;