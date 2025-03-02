import book01 from "../img/book01.svg";
import book02 from "../img/book02.svg";
import book04 from "../img/book04.svg";

const BasketList = [
    {
        img: book01,
        price: "899 руб.",
        title: "Порядок в хаосе",
        author: "Константин Коптелов",
        reviews: [
            {
                userID: 0,
                userName: "Maxim",
                mark: 5,
                value: "Отличная книга!"
            },
            {
                userID: 1,
                userName: "Ivan",
                mark: 4,
                value: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?"
            },
            {
                userID: 0,
                userName: "Maxim",
                mark: 5,
                value: "Отличная книга!"
            },
            {
                userID: 1,
                userName: "Ivan",
                mark: 4,
                value: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?"
            },
            {
                userID: 0,
                userName: "Maxim",
                mark: 5,
                value: "Отличная книга!"
            },
            {
                userID: 1,
                userName: "Ivan",
                mark: 4,
                value: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?"
            }
        ]
    },

    {
        img: book02,
        price: "649 руб.",
        title: "Смарагдова книга",
        author: "Керстин Гир",
        reviews: [
            {
                userID: 0,
                userName: "Maxim",
                mark: 5,
                value: "Отличная книга!"
            },
            {
                userID: 1,
                userName: "Ivan",
                mark: 4,
                value: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?"
            },
            {
                userID: 0,
                userName: "Maxim",
                mark: 5,
                value: "Отличная книга!"
            },
            {
                userID: 1,
                userName: "Ivan",
                mark: 4,
                value: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?"
            },
            {
                userID: 0,
                userName: "Maxim",
                mark: 5,
                value: "Отличная книга!"
            },
            {
                userID: 1,
                userName: "Ivan",
                mark: 4,
                value: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?"
            }
        ]
    },

    {
        img: book04,
        price: "599 руб.",
        title: "Мотиватор",
        author: "Наталья Зотова",
        reviews: [
            {
                userID: 0,
                userName: "Maxim",
                mark: 5,
                value: "Отличная книга!"
            },
            {
                userID: 1,
                userName: "Ivan",
                mark: 4,
                value: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?"
            },
            {
                userID: 0,
                userName: "Maxim",
                mark: 5,
                value: "Отличная книга!"
            },
            {
                userID: 1,
                userName: "Ivan",
                mark: 4,
                value: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?"
            },
            {
                userID: 0,
                userName: "Maxim",
                mark: 5,
                value: "Отличная книга!"
            },
            {
                userID: 1,
                userName: "Ivan",
                mark: 4,
                value: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam vitae similique explicabo tempore ab repellat eum iure? Minus totam porro numquam ab quod possimus est aperiam ex sapiente debitis?"
            }
        ]
    }
]

for (let i = 0; i < BasketList.length; i++) {
    BasketList[i].id = i;
}

export {BasketList}