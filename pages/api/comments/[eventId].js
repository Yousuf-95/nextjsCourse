import CommentModel from "@/models/commentModel";
import dbConnect from "@/lib/mongodbConnect";

async function handler(req, res) {
  try {
    const eventId = req.query.eventId;

    if (req.method === "POST") {
      let { email, name, text } = req.body;

      if (
        !email.includes("@") ||
        !name ||
        name.trim() === "" ||
        !text ||
        text.trim() === ""
      ) {
        res.status(422).json({ message: "Invalid input" });
      }

      let newComment = new CommentModel({
        id: new Date().toISOString(),
        email,
        name,
        text,
        eventId,
      });

      await dbConnect();

      await newComment.save();

      return res.status(201).json({ message: "Added comment" });
    }
    if (req.method === "GET") {
      let comments = await CommentModel.find({eventId}, { _id: 0 }).lean();

      res.status(200).json({ comments });
    }
  } catch (error) {
    console.log(error);
  }
}

export default handler;
