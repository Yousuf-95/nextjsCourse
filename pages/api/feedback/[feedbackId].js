import { getAllFeedbacks } from "./index";

function handler(req, res) {
  try {
    const feedbackId = req.query.feedbackId;
    const data = getAllFeedbacks();

    let selectedFeedback = data.find(
      (feedback) => feedback.id === feedbackId
    );

    if(selectedFeedback) {
        res.status(200).json({ feedback: selectedFeedback });
    }
    else {
        res.status(500);
    }
  } catch (error) {
    console.log(error);
  }
}

export default handler;
