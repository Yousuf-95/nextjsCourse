import Hero from "@/components/homePage/hero";
import FeaturedPosts from "@/components/homePage/featuredPosts";
import { getFeaturedPosts } from "@/lib/postsUtil";
import Head from "next/head";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta
          name="description"
          content="I post about programming and web development"
        />
      </Head>
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
