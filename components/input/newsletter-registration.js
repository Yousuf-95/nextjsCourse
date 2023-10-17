import { useRef, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  let userEmailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    try {
      const result = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({
          userEmail: userEmailRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        notificationCtx.showNotification({
          title: "Error!",
          message: "Something went wrong!",
          status: "error",
        });

        return;
      }

      notificationCtx.showNotification({
        title: "Success!",
        message: "Registered for newsletter.",
        status: "success",
      });

      return;
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });

      return;
    }
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
