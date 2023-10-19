import  Image  from "next/image";
import styles from "./hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/profilePicture.jpg"
          alt="Profile image"
          width={400}
          height={400}
        />
      </div>
      <h1>Hi, I&apos;m David</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit amet nemo
        rem blanditiis inventore optio voluptates delectus! Officia, optio
        ullam.
      </p>
    </section>
  );
}

export default Hero;
