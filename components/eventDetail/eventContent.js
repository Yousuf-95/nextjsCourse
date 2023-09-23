import styles from './eventContent.module.css';

function EventContent(props) {
  return (
    <section className={styles.content}>
      {props.children}
    </section>
  );
}

export default EventContent;
