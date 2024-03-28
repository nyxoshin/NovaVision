import React from "react";
import Table from "../../../assets/images/midCards/Table.png";
import Dozer from "../../../assets/images/midCards/Dozer.png";
import Piza from "../../../assets/images/midCards/Piza.png";
import Trainee from "../../../assets/images/midCards/Trainee.png";
import Tv from "../../../assets/images/midCards/Tv.png";
import styles from "../cards.module.scss";
import { IMidFiveCards } from "../../../interfaces/components";

export default function FiveCardsMid() {
  const cards: Array<IMidFiveCards> = [
    {
      backGroundImage: Trainee,
      url: "/item/123",
      title: "Спортивное оборудование",
      style: styles.cardEven,
    },
    {
      backGroundImage: Dozer,
      url: "/",
      title: "Техника и автомобили",
      style: styles.cardEven,
    },
    {
      backGroundImage: Table,
      url: "/item/132",
      title: "Мебель",
      style: styles.cardEven,
    },
    {
      backGroundImage: Tv,
      url: "/item/321",
      title: "Бытовая техника",
      style: styles.cardEven,
    },
    {
      backGroundImage: Piza,
      url: "/",
      title: "Декоративные предметы",
      style: styles.cardEven,
    },
  ];

  return (
    <div className={`${styles.cardsContainer} ${styles.containerEven}`}>
      {cards.map((a: IMidFiveCards, key: number) => (
        <div className={a.style} key={key} tabIndex={key}>
          <span className={styles.title}>{a.title}</span>
          <a className={styles.buttonDemo} href={a.url}>
            Посмотреть демо
          </a>
          <img
            src={a.backGroundImage}
            className={styles.first}
            alt="1st_card"
          />
        </div>
      ))}
    </div>
  );
}
