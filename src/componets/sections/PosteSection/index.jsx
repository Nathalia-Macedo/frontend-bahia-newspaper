import { useContext } from "react";
import { PostCard } from "./PostCard";
import { AsideLeft } from "../AsideLeft";
import styles from "./style.module.scss";
import { AsideAds } from "../AsideAds";
import { PostContext } from "../../../providers/PostContext";
import img from "../../../assets/imgs/fake.png"

export const PostSection = () => {
  const {  postList, filteredPost } = useContext(PostContext);

  const postsToRender = filteredPost && filteredPost.length > 0 ? filteredPost : postList;

  return (
    <section className="container">
      <div className={styles.flexBox}>
          <AsideAds/>         
        <ul>
          <img src={img} alt="img fixa" />
            {postsToRender.map(post => (
              <PostCard key={post.id} post={post} />
          ))}
        </ul>
        <AsideLeft/>
      </div>
    </section>
  );
};