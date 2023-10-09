import { useState } from "react";
import { getAllFeedbacks } from "./api/feedback";

function FeedbackPage(props) {
  const { feedbackItems } = props;
  const [feedbackData, setFeedbackData] = useState();

  async function loadFeedbackHandler(id) {
    let result = await fetch(`/api/feedback/${id}`);
    let data = await result.json();
    setFeedbackData(data.feedback);
  }
  
  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item, key) => (
          <li key={item.id}>
            {/* {console.log(item.id)} */}
            {item.feedback}{" "}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FeedbackPage;

export async function getStaticProps() {
  const data = getAllFeedbacks();

  return {
    props: {
      feedbackItems: data,
    },
  };
}
