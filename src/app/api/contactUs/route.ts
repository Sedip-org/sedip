// route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email və mesaj boş ola bilməz" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Message from ${name || "Anonymous"}`,
      text: message,
      html: `<p>${message}</p><p>From: ${email}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Email göndərmək mümkün olmadı" },
      { status: 500 }
    );
  }
}
