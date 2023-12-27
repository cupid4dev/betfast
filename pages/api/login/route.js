import User from "../../../db/Model/User";
import dbConnect from "../../../db/db";
import { NextResponse } from 'next/server'

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

export default async function POST(req) {
  // Handle POST request logic here
  const data = req.body;
  await dbConnect();
  const user = await User.findOne({ email: data.email });
  if (user) {
    NextResponse.json({ success: true, user: user });
  } else {
    NextResponse.json({ success: false, error: "Please join first!" });
  }
}
