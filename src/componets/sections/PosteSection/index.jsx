import { useContext } from "react";
import { PostCard } from "./PostCard";
import { AsideLeft } from "../AsideLeft";
import styles from "./style.module.scss";
import { AsideAds } from "../AsideAds";
import { PostContext } from "../../../providers/PostContext";

export const PostSection = () => {
  const {  postList, filteredPost, ads } = useContext(PostContext);

  const handleAds = (link) => {
    window.open(link, '_blank');
}

  const postsToRender = filteredPost && filteredPost.length > 0 ? filteredPost : postList;

  return (
    <section className="container1">
      <div className={styles.flexBox}>
          <AsideAds/>         
        <ul >
        {ads.slice(0,1).map((ad, index) => (
                <span key={index} onClick={() => handleAds(ad.link)} style={{ cursor: "pointer" }}>
                    {ad.videoUrl.length > 0 && (
                    <video controls>
                        <source src={ad.videoUrl} type="video/mp4" />
                    </video>
                    )}
                    {ad.imageUrl.length > 0 && (
                    <img src={ad.imageUrl} alt={`Anúncio ${index + 1}`} />
                    )}
                </span>
            ))}  
            {postsToRender.map(post => (
              <PostCard key={post.id} post={post} />
          ))}
        </ul>
        <AsideLeft/>
      </div>
    </section>
  );
};