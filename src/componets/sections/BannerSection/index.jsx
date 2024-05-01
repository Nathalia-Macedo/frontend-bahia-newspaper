import { Swiper, SwiperSlide } from "swiper/react";
import { useContext, useState } from "react";
import styles from "./style.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { AsideRight } from "../AsideRight";
import { AsideLeft } from "../AsideLeft";
import { PostContext } from "../../../providers/PostContext";
import { useNavigate } from "react-router-dom";
import { PostSection } from "../PosteSection";
import { PostCard } from "../PosteSection/PostCard";
import { NewSection } from "../NewSection";

export const BannerSection = () => {
  const [slidePerView] = useState(1);
  const { setFilteredPost, postList, ads} = useContext(PostContext);

  const navigate = useNavigate()
  // Ordena os posts pelas noticias mais recentes
  const sortedPosts = postList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleAds = (link) => {
    window.open(link, '_blank');
  }

  const handleCategoryClick = (postId, e) => {
    e.preventDefault();
    const post = sortedPosts.find(post => post.id === postId);
    if (post) {
      setFilteredPost([post]);
      navigate(`/post/${postId}`); 
    } else {
      console.error("Post não encontrado.", error);
    }
  };

  return (
    <section className="container1">
      <div className={styles.displayFlex}> 
      
        <AsideRight />
      <div className={styles.flexBox}>
          <Swiper
            className={styles.customSwiper}
            autoHeight={true}
            pagination={{ clickable: true }}
            slidesPerView={slidePerView}
            modules={[Pagination, Navigation, EffectFade]}
            effect="fade"
          >
            {sortedPosts.map((item) => (
            <SwiperSlide 
                className={styles.slideItem} 
                key={item.id}
            >
                <div 
                  onClick={(e) => handleCategoryClick(item.id, e)}  
                  className={styles.imageContainer}
                >
                  {item.videoUrls.length !== 0 ? (
                    <video controls>
                      <source src={item.videoUrls[0]} type="video/mp4"/>
                    </video>                                
                  ) : (
                    <img 
                      src={item.photoUrls.length !== 0 && item.photoUrls[0] } 
                      alt="Slider"                   
                    />                  
                  )}            
                <div className={styles.overlay}>
                  {item.categories.length !== 0 ? (
                    <h1 className="title one">
                      {item.categories[0].name}
                    </h1>
                  ) : (
                    <h1 className="title one">
                      Sem categoria
                    </h1>
                  )}
                  {item.title && (
                    <p className="title three">
                      {item.title}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
          {ads.slice(0,1).map((ad, index) => (
            <strong 
              key={index} 
              onClick={() => handleAds(ad.link)}
              className={styles.Strong} 
              style={{ cursor: "pointer" }}>
              {ad.videoUrl.length > 0 && (
                <video controls>
                  <source src={ad.videoUrl} type="video/mp4" />
                </video>
              )}
                {ad.imageUrl.length > 0 && (
                  <img src={ad.imageUrl} alt={`Anúncio ${index + 1}`} />
                )}
              </strong>
          ))}
            <NewSection/>
      </div>
      <AsideLeft />
      </div>
  </section>
  
  );
};
