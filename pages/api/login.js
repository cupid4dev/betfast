import User from "../../db/Model/User";
import dbConnect from "../../db/db";

// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(
//   "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",
// );

// const sendEmail = async (to, subject, html) => {
//   return await sgMail.send({
//     from: "contact@atoplatform.com",
//     to,
//     subject,
//     html,
//   });
// };

export default async function POST(req, res) {
  if (req.method === "POST") {
    // Handle POST request logic here
    const data = req.body;
    await dbConnect();
    const user = await User.findOne({ email: data.email });
    if (user) {
      res.json({ success: true, user: user });
    } else {
      res.json({ success: false, error: "Please join first!" });
    }
  } else {
    // Handle other HTTP methods
    res.json({ message: "Method Not Allowed.." });
  }
}
