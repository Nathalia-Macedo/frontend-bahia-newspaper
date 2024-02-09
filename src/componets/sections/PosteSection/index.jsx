import { useContext } from "react";
import { PostCard } from "./PostCard";
import { PostContext } from "../../../providers/PostContexto";

export const PostSection = () => {
  const {  postList, filteredPost } = useContext(PostContext);

  return (
    <section>
      <ul className="container">
        {filteredPost ? 
            filteredPost.map(post =>
              <PostCard key={post.id} post={post} />)
        : (postList.map((post) => (
          <PostCard key={post.id} post={post} />
        )))}
      </ul>
    </section>
  );
};
