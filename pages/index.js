import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  async function formHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const feedback = feedbackInputRef.current.value;

    const result = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email,
        feedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(result);
  }

  async function loadFeedback(event) {
    event.preventDefault();

    const result = await fetch("/api/feedback");
    let data = await result.json();

    setFeedbackItems(data.feedback);
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={formHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedback}>Load Feedbacks</button>
      <ul>
        {feedbackItems.map((item, key) => (
          <li key={key}>{item.feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
