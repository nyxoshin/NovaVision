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
      url: "/",
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
      url: "/",
      title: "Мебель",
      style: styles.cardEven,
    },
    {
      backGroundImage: Tv,
      url: "/",
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
          <button className={styles.buttonDemo}>Посмотреть демо</button>
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
