import ReactMarkdown from "react-markdown";
import PostHeader from "./postHeader";
import styles from "./postContent.module.css";

const DUMMY_POST = {
  title: "Getting Started with NextJS",
  slug: "getting-started-nextjs",
  image: "getting-started-nextjs.png",
  date: "2023-10-04",
  content: `## This is the first post`,
};

function PostContent() {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={styles.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
