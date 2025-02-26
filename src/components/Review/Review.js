import "./style.css"

const Review = (props) => {
    return ( 
        <li className="reviews__item">
            <h1 className="reviews__item__user-name">{props.userName}</h1>

            <div className="reviews__item__mark">
                <h1 className="reviews__item__title">Оценка: </h1>
                <span className="reviews__item__mark-value">{props.mark}</span>
            </div>
            <div className="reviews__item__text">{props.value}</div>
        </li>
     );
}
 
export default Review;