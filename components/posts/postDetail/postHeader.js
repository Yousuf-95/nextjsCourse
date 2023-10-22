import Image from "next/image";
import styles from "./postHeader.module.css";

function PostHeader(props) {
    const {title, image} = props;

    return (
        <header className={styles.header}> 
            <h1>{title}</h1>
            <Image src="/images/posts/getting-started-nextjs/getting-started-nextjs.png" alt={title} width={200} height={150} />
        </header>
    );
}

export default PostHeader;