import book01 from "../../img/book01.png";
import book02 from "../../img/book02.png";
import book03 from "../../img/book03.png";
import book04 from "../../img/book04.png";
import book05 from "../../img/book05.png";

const BooksList = [
    {
        img: book01,
        price: "899 руб.",
        title: "Порядок в хаосе",
        author: "Константин Коптелов",
    },

    {
        img: book02,
        price: "649 руб.",
        title: "Смарагдова книга",
        author: "Керстин Гир",
    },

    {
        img: book03,
        price: "349 руб.",
        title: "Зося с улицы кошачей",
        author: "Агнешка Тишка",
    },

    {
        img: book04,
        price: "599 руб.",
        title: "Мотиватор",
        author: "Наталья Зотова",
    },

    {
        img: book05,
        price: "1499 руб.",
        title: "Без маски",
        author: "Михаил Бурняшев",
    },

    {
        img: book05,
        price: "1499 руб.",
        title: "Без маски",
        author: "Михаил Бурняшев",
    },
    
    {
        img: book05,
        price: "1499 руб.",
        title: "Без маски",
        author: "Михаил Бурняшев",
    }
]

for (let i = 0; i < BooksList.length; i++) {
    BooksList[i].id = i;
}

export {BooksList};