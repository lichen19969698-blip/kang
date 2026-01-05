import nodemailer from "nodemailer";
import { ENV } from "./env";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  if (!ENV.smtpHost || !ENV.smtpPort || !ENV.smtpUser || !ENV.smtpPassword) {
    throw new Error("SMTP configuration is not complete");
  }

  const port = parseInt(ENV.smtpPort);
  
  transporter = nodemailer.createTransport({
    host: ENV.smtpHost,
    port: port,
    secure: port === 465, // true for 465 (SMTP_SSL), false for 587 (SMTP_TLS)
    auth: {
      user: ENV.smtpUser,
      pass: ENV.smtpPassword,
    },
    // For port 587, enable TLS upgrade
    ...(port === 587 && {
      requireTLS: true,
    }),
    // Additional options for better compatibility
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
    connectionTimeout: 5000,
    socketTimeout: 5000,
  });

  return transporter;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}): Promise<boolean> {
  try {
    const transporter = getTransporter();
    
    const result = await transporter.sendMail({
      from: options.from || ENV.smtpUser,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    console.log("[Mailer] Email sent successfully:", result.messageId);
    return true;
  } catch (error) {
    console.error("[Mailer] Failed to send email:", error);
    return false;
  }
}

export async function verifyConnection(): Promise<boolean> {
  try {
    const transporter = getTransporter();
    await transporter.verify();
    console.log("[Mailer] SMTP connection verified successfully");
    return true;
  } catch (error) {
    console.error("[Mailer] SMTP connection verification failed:", error);
    return false;
  }
}
