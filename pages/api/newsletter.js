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

      await dbConnect();

      const user = new UserModel({
        email: userEmail,
      });

      await user.save();

      res.status(201).json({ message: "Subscribed successfully." });
    }
  } catch (error) {
    console.log(error);
  }
}

export default handler;
