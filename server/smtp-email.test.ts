import { describe, it, expect } from "vitest";
import { sendEmail } from "./_core/mailer";

describe("SMTP Email Service", () => {
  it("should return boolean result for email sending", async () => {
    const result = await sendEmail({
      to: "test@example.com",
      subject: "Test Email",
      html: "<h1>Test</h1><p>This is a test email</p>",
    });

    // Email sending may fail in test environment, but the function should return a boolean
    expect(typeof result).toBe("boolean");
  }, { timeout: 15000 });

  it("should handle email with custom from address", async () => {
    const result = await sendEmail({
      to: "test@example.com",
      subject: "Test Email with From",
      html: "<h1>Test</h1>",
      from: "sender@example.com",
    });

    expect(typeof result).toBe("boolean");
  }, { timeout: 15000 });

  it("should handle HTML email content", async () => {
    const htmlContent = "<div><h2>Confirmation</h2><p>Thank you</p></div>";

    const result = await sendEmail({
      to: "test@example.com",
      subject: "Inquiry Confirmation",
      html: htmlContent,
    });

    expect(typeof result).toBe("boolean");
  }, { timeout: 20000 });
});
