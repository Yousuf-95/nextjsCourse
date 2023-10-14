import CommentModel from "@/models/commentModel";
import dbConnect from "@/lib/mongodbConnect";

let client;

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

      if (!client) {
        try {
          await dbConnect();
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .json({ message: "Connecting to the database failed!" });
          return;
        }
      }

      let newComment = new CommentModel({
        id: new Date().toISOString(),
        email,
        name,
        text,
        eventId,
      });

      try {
        await newComment.save();
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Inserting comment failed!" });
        return;
      }

      return res.status(201).json({ message: "Added comment" });
    }

    if (req.method === "GET") {
      if (!client) {
        try {
          await dbConnect();
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .json({ message: "Connecting to the database failed!" });
          return;
        }
      }

      try {
        let comments = await CommentModel.find({ eventId }, { _id: 0 }).lean();
        res.status(200).json({ comments });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default handler;
