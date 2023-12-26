import User from "../../db/Model/User";
import dbConnect from "../../db/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Handle POST request logic here
    const data = req.body;
    await dbConnect();
    const updatedResult = await User.updateOne(
      {
        email: data.email,
      },
      {
        $set: data,
      },
    );
    if (updatedResult) {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: result.error });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
