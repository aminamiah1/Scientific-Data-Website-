// import sgMail from '@sendgrid/mail';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from "next/server";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//     console.log("1");
//     if (req.method === 'POST') {
//     try {
//       const { name, email, phone, message } = JSON.parse(req.body);
//         console.log("1");
//       const msg = {
//         to: process.env.SMTP_FROM, 
//         from: 'your-email@example.com', // Verified SendGrid sender email
//         subject: `New Contact Form Submission from ${name}`,
//         text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
//       };
//       console.log("2");
//       await sgMail.send(msg);
//       console.log("3");
//       res.status(200).json({ message: 'Email sent successfully' });
//     } catch (error) {
//         console.log("4");
//       console.error(error);
//       res.status(500).json({ error: 'Error sending email' });
//     }
//   } else {
//     console.log("5");
//     res.status(405).json({ error: 'asdsaMethod not allowed' });
//   }
// }
// export async function POST() {
//    console.log('in it')
//    return NextResponse.json({ status: 200 });
//}