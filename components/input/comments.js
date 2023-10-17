import { useEffect, useState, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "@/store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    try {
      notificationCtx.showNotification({
        title: "Adding comment...",
        message: "Adding new comment.",
        status: "pending",
      });

      // send data to API
      let result = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "content-Type": "application/json",
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
        message: "Your comment was added successfully.",
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
