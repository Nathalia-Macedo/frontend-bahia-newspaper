
import styles from "./style.module.scss";
import img from "../../../assets/imgs/publicidade-1.jpg"

export const AsideAds = () => {
  return (
    <aside className={styles.asideAds}>
      <div>
        <img src={img} alt="" />
        <img src={img} alt="" />
        <img src={img} alt="" />
      </div>
    </aside>
  );
};
