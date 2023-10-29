import dbConnect from "@/lib/mongodbConnect";
import ContactModel from "@/models/contactModel";

async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const { email, name, message } = req.body;

      if (
        !email ||
        !email.includes("@") ||
        !name ||
        name.trim() === "" ||
        !message ||
        message.trim() === ""
      ) {
        res.status(422).json({ message: "Invalid input" });
      }

      //   Store data in database
      const newMessage = {
        email,
        name,
        message,
      };

      const result = await new ContactModel(newMessage).save();

      if(result) {
        res.status(201).json({ message: "Successfully stored message" });
      }
      
    }
  } catch (error) {
    console.log(error);
  }
}

export default handler;
