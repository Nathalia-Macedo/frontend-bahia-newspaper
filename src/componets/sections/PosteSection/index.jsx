import { useContext } from "react";
import { PostCard } from "./PostCard";
import { PostContext } from "../../../providers/PostContexto";
import { AsideRight } from "../AsideRight";
import { AsideLeft } from "../AsideLeft";

export const PostSection = () => {
  const {  postList, filteredPost } = useContext(PostContext);

  return (
    <section>
        <AsideRight/>
      <ul className="container">
        {filteredPost ? 
            filteredPost.map(post =>
              <PostCard key={post.id} post={post} />)
        : (postList.map((post) => (
          <PostCard key={post.id} post={post} />
        )))}

      </ul>
      <AsideLeft/>
    </section>
  );
};
