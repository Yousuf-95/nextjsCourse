import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  let userEmailRef = useRef();

  async function registrationHandler(event) {
    event.preventDefault();

    const result = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        userEmail: userEmailRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={userEmailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
