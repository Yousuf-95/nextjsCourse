import { hashPassword } from "@/lib/auth";
import dbConnect from "@/lib/mongodbUtils";
import UserModel from "@/models/userModel";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res
        .status(422)
        .json({ message: "Password should be atleast 7 characters long" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new UserModel({
      email,
      password: hashedPassword,
    });

    await dbConnect();

    try {
      await user.save();
    } catch (error) {
      res.status(500).json({ message: "Failed to create a user!" });
      console.log(error);
      return;
    }

    res.status(201).json({ message: "Signup successful!" });
  }
}

export default handler;
