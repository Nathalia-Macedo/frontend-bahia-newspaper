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
import img from "../../../assets/imgs/fake.png";

export const BannerSection = () => {
  const [slidePerView, setSlidePerView] = useState(1);
  const { setFilteredPost, postList} = useContext(PostContext);

  const navigate = useNavigate()
  // Ordena os posts pelas mais recentes
  const sortedPosts = postList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleCategoryClick = (postId, e) => {
    e.preventDefault();
    const post = sortedPosts.find(post => post.id === postId);
    if (post) {
      setFilteredPost([post]);
      navigate(`/post/${postId}`); 
    } else {
      console.log("Post não encontrado.");
    }
  };

  return (
    <section className="container">
      <div className={styles.flexBox}>
        <AsideRight />
        <Swiper
          className={styles.customSwiper}
          pagination={{ clickable: true }}
          slidesPerView={slidePerView}
          modules={[Pagination, Navigation, EffectFade]}
          effect="fade"
        >
          {sortedPosts.map((item) => (
            <SwiperSlide className={styles.slideItem} key={item.id}>
              <div className={styles.imageContainer} onClick={(e) => handleCategoryClick(item.id, e)}>
              {item.photoUrls && item.photoUrls.map((photoUrl, index) => (
                <div key={index}>
                  <img src={photoUrl} alt="Slider" />
                  <div className={styles.overlay}>
                    {item.categories && item.categories.map((category) => (
                      <h1 key={category.id} className="title two">{category.name}</h1>
                    ))}
                    <p className="title three">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
          ))}
            <strong>
              <img src={img} alt="" />
            </strong>
        </Swiper>
        <AsideLeft />
      </div>
    </section>
  );
};
