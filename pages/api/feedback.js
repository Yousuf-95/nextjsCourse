import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "feedback.json");

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;
    const data = JSON.parse(fileData);

    data.push({
      email,
      feedback,
    });

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Received feedback successfully" });
  } else {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    res.status(200).json({ feedback: data });
  }
}

export default handler;
