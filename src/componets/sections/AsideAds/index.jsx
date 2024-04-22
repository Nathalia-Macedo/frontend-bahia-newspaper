import styles from "./style.module.scss";
import img from "../../../assets/imgs/publicidade-1.jpg"
import { useEffect, useState } from "react";


export const AsideAds = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth >= 980) {
        setIsVisible(true);
      }else {
        setIsVisible(false);
      }
    }
    handleResize();
  
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={isVisible ? styles.asideAds : styles.hidden}>
      <div>
        <img src={img} alt="" />
        <img src={img} alt="" />
        <img src={img} alt="" />
      </div>
    </aside>
  );
};
