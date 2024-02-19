import { useContext } from "react";
import { PostCard } from "./PostCard";
import { AsideLeft } from "../AsideLeft";
import styles from "./style.module.scss";
import { AsideAds } from "../AsideAds";
import { PostContext } from "../../../providers/PostContext";


export const PostSection = () => {
  const {  postList, filteredPost } = useContext(PostContext);

  const postsToRender = filteredPost && filteredPost.length > 0 ? filteredPost : postList;
  // console.log(postsToRender);
  return (
    <section className="container">
      <div className={styles.flexBox}>
          <AsideAds/>
        <ul>
        {postsToRender.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          <strong>adSense</strong>
        </ul>
        <AsideLeft/>
      </div>
    </section>
  );
};


// {filteredPost ? 
//   filteredPost.map(post =>
//     <PostCard key={post.id} post={post} />)
// : (postList.map((post) => (
// <PostCard key={post.id} post={post} />
// )))}