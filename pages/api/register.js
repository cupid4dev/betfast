import User from "../../db/Model/User";
import dbConnect from "../../db/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Handle POST request logic here
    const data = req.body;
    const db = await dbConnect();
    if (!db) {
      res.json({ success: false, error: "Mongo Error!" });
    } else {
      try {
        const user = new User(data);
        const userCreated = await user.save();
        res.json({ success: userCreated ? true : false, error: "Error." });
      } catch (e) {
        res.json({ success: false, error: e });
      }
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
