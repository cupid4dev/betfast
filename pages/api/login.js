import { getUserByEmail } from "../../db/db";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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",
);

const sendEmail = async (to, subject, html) => {
  return await sgMail.send({
    from: "contact@atoplatform.com",
    to,
    subject,
    html,
  });
};

export default function handler(req, res) {
  if (req.method === "POST") {
    // Handle POST request logic here
    const data = req.body;
    getUserByEmail(data.email, (result) => {
      if (!result.success || result.user.length == 0) {
        res.json({ success: false, error: "Please join first!" });
        return;
      }
      sendEmail(
        data.email,
        "No Reply",
        "Your verification code for betfast is " + data.code,
      );
      res.json({ success: true, user: result.user[0] });
    });
  } else {
    // Handle other HTTP methods
    res.json({ message: "Method Not Allowed" });
  }
}
