import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from "./style.module.scss";
import { imgList } from "../../../data/imgList";

import { Pagination, Navigation } from 'swiper/modules';
import { useState } from 'react';

export const BannerSection = () => {
    const [slidePerView, setSlidePerView] = useState(1);

    return(
        <section className='container'>
            <div className={styles.flexBox}>
                <aside className={styles.leftAside}>
                    <span>
                        <div>****MAIS LIDAS****</div>
                        <p> ****MAIS LIDAS**** </p>
                        <div>
                            <p>caixa 2 </p>
                            <h1>caixa 3</h1>
                        </div>
                    </span>     
                </aside>
                <Swiper
                    className={styles.customSwiper}
                    pagination={{clickable: true, dynamicBullets: true}}
                    navigation={true}
                    slidesPerView={slidePerView}
                    modules={[Pagination, Navigation]}
                    
                >   
                    {imgList.map( (item) => ( 
                        <SwiperSlide className={styles.slideItem} key={item.id}>
                            <div className={styles.imageContainer}>
                                <img src={item.image} alt='Slider'/>
                                <div className={styles.overlay}>
                                    <h1 
                                        className='title two'>
                                            {item.category
                                            .charAt(0)
                                            .toUpperCase() + item.category.slice(1)}
                                    </h1>
                                    <p className='title three'>
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <aside className={styles.rightAside}>
                    <span>
                        <div>****RAPIDINHAS****</div>
                        <p>**** RAPIDINHAS****</p>
                        <div>
                            <p>caixa 1 d</p>
                            <h1> eee</h1>
                        </div>
                    </span>     
                </aside>
            </div>
        </section>
    );
};




