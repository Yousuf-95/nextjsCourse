import AllPosts from "@/components/posts/allPosts";

const DUMMY_POSTS = [
  {
    title: "Getting Started with NextJS",
    slug: "getting-started-nextjs",
    image: "getting-started-nextjs.png",
    excerpt:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta autem facere error magni, harum iure.",
    date: "2023-10-04",
  },
  {
    title: "Getting Started with NextJS",
    slug: "getting-started-nextjs",
    image: "getting-started-nextjs.png",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, minima labore quod natus possimus sequi.",
    date: "2023-10-08",
  },
];

function AllPostsPage() {
  return <AllPosts posts={DUMMY_POSTS} />;
}

export default AllPostsPage;
