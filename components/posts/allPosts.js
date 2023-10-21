import styles from './allPosts.module.css';
import PostsGrid from './postsGrid';

function AllPosts(props) {
    return (
        <section className={styles.posts}>
            <h1>All Posts</h1>
            <PostsGrid posts={props.posts} />
        </section>
    );
}

export default AllPosts;