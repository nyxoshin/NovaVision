import styles from "./root.module.scss";
import LogoIcon from "../assets/icons/svg/logoIcon";
import { Outlet } from "react-router-dom";
import LogoIconSmall from "../assets/icons/svg/logoIcon_Small";
import PhoneIcon from "../assets/icons/svg/phoneSvg";
import MailIcon from "../assets/icons/svg/mailIcon";
import ArrowDown from "../assets/icons/svg/arrowDown";
// import "../assets/Styles/Index.scss";

function NavBar() {
  // const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <div className={styles.navBar} id="navBar">
        {/* <!-- Кнопка раскрытия и скрытия бокового меню --> */}
        <a className={styles.logoLink}>
          <LogoIcon />
        </a>

        <div className={styles.navLinks}>
          {/* <!-- Наши проекты --> */}
          {/* <select /> */}

          {/* <!-- Перейти к демо --> */}
          <button className={styles.blue}>Перейти к демо</button>

          {/* <!-- Связаться с нами --> */}
          <button className={styles.white}>Связаться с нами</button>
        </div>
        <div className={styles.navLinksSmall}>☰</div>
      </div>
      <div
        // id="detail"
        // style={isOpen ? { marginLeft: "300px" } : { marginLeft: "72px" }}
        className={styles.main_block}
      >
        <Outlet />
      </div>
      <div className={styles.footer}>
        <LogoIconSmall />
        <button className={styles.ourProjects}>
          Наши проекты <ArrowDown />
        </button>
        <div className={styles.contactUs}>
          <button>Связаться с нами</button>
          <div className={styles.directContacts}>
            <div className={styles.phones}>
              <PhoneIcon />
              <span>+7 999 999 99 99</span>
            </div>
            <div className={styles.phones}>
              <MailIcon />
              <span>novavision@ya.ru</span>
            </div>
          </div>
          <span className={styles.directContacts}>
            <div className={styles.phones}>
              <span className={styles.seo}>
                ИП Воронцов Даниил Алексеевич | 2024
              </span>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}

export default NavBar;
