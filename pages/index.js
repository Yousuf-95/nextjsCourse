import Hero from "@/components/homePage/hero";
import FeaturedPosts from "@/components/homePage/featuredPosts";
import { getFeaturedPosts } from "@/lib/postsUtil";

function HomePage(props) {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export default HomePage;

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
