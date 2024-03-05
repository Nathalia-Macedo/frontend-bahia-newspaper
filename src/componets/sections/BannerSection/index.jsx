import { Swiper, SwiperSlide } from "swiper/react";
import { useContext, useState } from "react";
import styles from "./style.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import { imgList } from "../../../data";
import { Pagination, Navigation } from "swiper/modules";
import { AsideRight } from "../AsideRight";
import { AsideLeft } from "../AsideLeft";
import { PostContext } from "../../../providers/PostContext";
import { useNavigate } from "react-router-dom";

export const BannerSection = () => {
  const [slidePerView, setSlidePerView] = useState(1);

  const { setFilteredPost, postList } = useContext(PostContext);
  // console.log(postList)
  // tirar o mock usar a requizicao 
  //corrigir a barra de pagnation
  // verificar quebra 

  const navigate = useNavigate();

  return (
    <section className="container">
      <div className={styles.flexBox}>
        <AsideRight />
        <Swiper
          className={styles.customSwiper}
          pagination={{ clickable: true }}
          navigation={true}
          slidesPerView={slidePerView}
          modules={[Pagination, Navigation]}
        >
          {imgList.map((item) => (
            <SwiperSlide className={styles.slideItem} key={item.id}>
              <div className={styles.imageContainer}>
                <img src={item.image} alt="Slider" />
                <div className={styles.overlay}>
                  <h1 className="title two">
                    {item.category.charAt(0).toUpperCase() +
                      item.category.slice(1)}
                  </h1>
                  <p className="title three">{item.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <strong>adSense</strong>
        </Swiper>
        <AsideLeft />
      </div>
    </section>
  );
};
