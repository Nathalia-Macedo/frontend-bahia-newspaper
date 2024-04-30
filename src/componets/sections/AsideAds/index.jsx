import styles from "./style.module.scss";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../../providers/PostContext";


export const AsideAds = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { setLoading, loading, ads} = useContext(PostContext);

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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (link) => {
    window.open(link, '_blank');
  }

  return (
    <aside className={isVisible ? styles.asideAds : styles.hidden}>
      <div>
        {loading ? ( 
          <div>Loading...</div>
        ) : (
          ads.map((ad, index) => (
            <div key={index} onClick={() => handleClick(ad.link)} style={{ cursor: "pointer" }}>
              {ad.videoUrl.length > 0 ? (
                <video controls>
                  <source src={ad.videoUrl[0]} type="video/mp4" />
                </video>
              ) : (
                <img src={ad.imageUrl[0]} alt={`Anúncio ${index + 1}`} /> 
              )}
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
