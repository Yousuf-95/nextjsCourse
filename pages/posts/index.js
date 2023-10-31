import AllPosts from "@/components/posts/allPosts";
import { getAllPosts } from "@/lib/postsUtil";
import Head from "next/head";

function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="List of all posts" />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
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
