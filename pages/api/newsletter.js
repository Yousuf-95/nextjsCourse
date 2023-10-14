import dbConnect from "@/lib/mongodbConnect";
import UserModel from "@/models/userModel";

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const userEmail = req.body?.userEmail;

      if (!userEmail || !userEmail.includes("@")) {
        res.status(422).json({ message: "Invalid email address." });
        return;
      }

      try {
        await dbConnect();
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Connecting to database failed." });
        return;
      }

      const user = new UserModel({
        email: userEmail,
      });

      try {
        await user.save();
      } catch (error) {
        res.status(500).json({ message: "Inserting data failed!" });
        console.log(error);
        return;
      }

      res.status(201).json({ message: "Subscribed successfully." });
    }
  } catch (error) {
    console.log(error);
  }
}

export default handler;
