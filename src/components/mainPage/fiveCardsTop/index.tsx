import React from "react";
import RotateTable from "../../../assets/images/rotateTable.png";
import ZoomIn from "../../../assets/images/zoomIn.png";
import LessSize from "../../../assets/images/lessSize.png";
import Reactive from "../../../assets/images/reactive.png";
import Degrees from "../../../assets/images/3D360.png";
import styles from "../cards.module.scss";

export default function FiveCardsTop() {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        <span>
          Возможность крутить во всех
          <p>плоскостях, а не на одной заданной оси</p>
        </span>
        <img src={RotateTable} className={styles.first} alt="1st_card" />
      </div>
      <div className={styles.card}>
        <span>
          Возможность зума
          <p>и чувство текстуры</p>
        </span>
        <img src={ZoomIn} className={styles.second} alt="1st_card" />
      </div>
      <div className={styles.card}>
        <span>
          Для хорошего разрешения
          <p>нужно меньше мегабайтов</p>
        </span>
        <img src={LessSize} className={styles.third} alt="1st_card" />
      </div>
      <div className={styles.card}>
        <span className={styles.spanSmall}>
          React — фреймворк,
          <p>который обеспечивает </p>
          <p className={styles.secondP}>высокую скорость загрузки </p>
        </span>
        <img src={Reactive} className={styles.fourth} alt="1st_card" />
      </div>
      <div className={styles.card}>
        <span className={styles.spanSmall}>
          Не мучайтесь,
          <p>пытаясь сделать </p>
          <p className={styles.secondP}>фотографии 360° </p>
        </span>
        <img src={Degrees} className={styles.fifth} alt="1st_card" />
      </div>
    </div>
  );
}
