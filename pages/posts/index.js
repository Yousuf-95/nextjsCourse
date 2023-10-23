import AllPosts from "@/components/posts/allPosts";
import { getAllPosts } from "@/lib/postsUtil";

function AllPostsPage(props) {
  return <AllPosts posts={props.posts} />;
}

export default AllPostsPage;

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}
