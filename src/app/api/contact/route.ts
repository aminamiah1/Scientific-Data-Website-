import { type NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';

export async function POST(request: NextRequest) {
  const { name, email, phone, message } = await request.json();

  const toEmail = process.env.SMTP_FROM;
  const fromEmail = process.env.SMTP_FROM;
  const apiKey = process.env.SMTP_PASSWORD;

  if (!toEmail || !fromEmail || !apiKey) {
    console.error('Environment variables for SendGrid are not properly set.');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  sendgrid.setApiKey(apiKey);

  const mailOptions = {
    to: toEmail,
    from: fromEmail,
    subject: `Message from ${name} (${email}) ${phone}`,
    text: message,
  };

  try {
    await sendgrid.send(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
