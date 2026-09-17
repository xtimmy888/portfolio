import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  message: z
    .string()
    .min(10, "Your message is a little short.")
    .max(5000, "Your message is too long."),
  // Honeypot — real users never see/fill this.
  company: z.string().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { name, email, message, company } = parsed.data;

  // Bot caught by the honeypot: pretend success, send nothing.
  if (company && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  // Not configured yet — log so the form is testable locally without keys.
  if (!apiKey || !to) {
    console.warn(
      "[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not set — submission logged, not emailed:",
      { name, email, message },
    );
    return NextResponse.json({
      ok: true,
      note: "Email delivery is not configured on the server yet.",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to: [to],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
