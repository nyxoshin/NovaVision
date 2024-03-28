import React, { Fragment } from "react";
import WhyAR from "../../../assets/images/botCards/WhyAR.png";
import ClientLoyalty from "../../../assets/images/botCards/ClientLoyalty.png";
import LifeStyle from "../../../assets/images/botCards/LifeStyle.png";
import PercentageGrad from "../../../assets/images/botCards/PercentageGrad.png";
import NinetyFour from "../../../assets/images/botCards/94.png";
import NinetyFive from "../../../assets/images/botCards/95.png";
import styles from "../cards.module.scss";
import { IBotFiveCards } from "../../../interfaces/components";

export default function FiveCardsMid() {
  const cards: Array<IBotFiveCards> = [
    {
      backGroundImage: WhyAR,
      url: "/",
      title: "Зачем AR ",
      title_two: "для ретейла?",
      subtext: "",
      style: styles.cardRetail,
    },
    {
      backGroundImage: NinetyFive,
      url: "/",
      title: (
        <span className={styles.percentageValue}>
          95<p className={styles.percentageLow}>%</p>
        </span>
      ),
      title_two: null,
      subtext:
        "Увеличение зрительного внимания по сравнению с другими каналами",
      style: styles.cardPercentage,
      titleStyle: styles.titleCentered,
    },
    {
      backGroundImage: NinetyFour,
      url: "/",
      title: (
        <span className={styles.percentageValue}>
          94<p className={styles.percentageLow}>%</p>
        </span>
      ),
      title_two: null,
      subtext: "Более высокий коэффициент конверсии для продуктов с AR/3D",
      style: styles.cardPercentage,
      titleStyle: styles.titleCentered,
    },
    {
      backGroundImage: PercentageGrad,
      url: "/",
      title: (
        <span className={styles.percentageValue}>
          100<p className={styles.percentageLow}>million</p>
        </span>
      ),
      title_two: null,
      subtext:
        "Потребители совершают покупки с помощью AR онлайн и в магазинах",
      style: styles.cardPercentage,
      titleStyle: styles.titleCentered,
    },
    {
      backGroundImage: ClientLoyalty,
      url: "/",
      title: "Выстраивайте ",
      title_two: "лоялность клиентов",
      subtext:
        "Повышайте лояльность и увеличивайте количество повторных посещений с помощью более эффективных розничных кампаний, которые запоминаются до 70% и приносят пользу благодаря схемам цифровых вознаграждений и предметам коллекционирования, которые укрепляют эмоциональную связь с вашим брендом",
      style: styles.cardLoyal,
    },
    {
      backGroundImage: LifeStyle,
      url: "/",
      title: "Продавайте не продукт, ",
      title_two: "а образ жизни",
      subtext:
        "Маркетинг уже давно говорит о том, что продавать нужно не продукт, а образ жизни. AR-технология помогает пользователю посмотреть, насколько подходит ему то, что он смотрит, а когда он уже поставил у себя в комнате, он уже представил, как будет этим пользоваться, что уже статистически поднимет процент продаж.",
      style: styles.cardLoyal,
    },
  ];

  return (
    <div className={`${styles.cardsContainer} ${styles.containerThird}`}>
      {cards.map((a: IBotFiveCards, key: number) => (
        <div className={a.style} key={key} tabIndex={key}>
          <span
            className={`${styles.title} ${
              typeof a.titleStyle == "undefined" ? "" : a.titleStyle
            }`}
          >
            <span>{a.title}</span>
            {"\n"}
            {a.title_two !== null && (
              <span className={styles.title_two}>{a.title_two}</span>
            )}
            <p className={styles.subtext}>{a.subtext}</p>
          </span>
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
