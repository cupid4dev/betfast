import { updateUser } from "../../db/db";
export default function handler(req, res) {
  if (req.method === "POST") {
    // Handle POST request logic here
    const data = req.body;

    updateUser(data, (result) => {
      if (result.success) {
        res.json({ success: true });
      } else {
        res.json({ success: false, error: result.error });
      }
    });
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
