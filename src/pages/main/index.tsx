import styles from "./main.module.scss";
import chairy from "../../assets/gifs/Chairy.gif";
import FiveCardsTop from "../../components/mainPage/fiveCardsTop";
import FiveCardsMid from "../../components/mainPage/fiveCardsMid";
import FiveCardsBottom from "../../components/mainPage/fiveCardsBottom";

export default function MainPage() {
  //   console.log("this is the main page");
  console.log("check type", typeof styles.heading);
  return (
    <div className={styles.mainPage}>
      <img className={styles.chairy} src={chairy} alt="chair" />
      <div className={styles.heading}>
        <h1>
          <span className="">3D-просмотровщик,</span>
          <br></br>
          <span className={styles.Grey}>легко встраиваемый</span>
          <br></br>
          <span className={styles.GreyDark}>на любой сайт</span>
        </h1>
        <span className={styles.subHeader}>
          Свяжитесь с нами, чтобы попасть в мир новых методов продаж
        </span>
      </div>
      <FiveCardsTop />
      <div className={styles.heading}>
        <h2>
          <span className="">Взгляните своими глазами</span>
          <br></br>
          <span className={styles.Grey}>на 3D-просмотровщик </span>
          <br></br>
          <span className={styles.GreyDark}>NovaVision в действии </span>
        </h2>
      </div>
      <FiveCardsMid />
      <div className={styles.heading}>
        <h2>
          <span className="">Первый на рынке России</span>
          <br></br>
          <span className={styles.Grey}>просмотровщик со встроенной </span>
          <br></br>
          <span className={styles.GreyDark}>функцией AR-технологии </span>
        </h2>
      </div>
      <FiveCardsBottom />
    </div>
  );
}
