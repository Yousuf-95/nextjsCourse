import PostsGrid from "../posts/postsGrid";
import styles from "./featuredPosts.module.css";

function FeaturedPosts(props) {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default FeaturedPosts;