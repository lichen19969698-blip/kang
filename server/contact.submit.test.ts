import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type CallerContext = {
  user: null;
  req: {
    protocol: string;
    headers: Record<string, string>;
  };
  res: {
    clearCookie: (name: string, options: Record<string, unknown>) => void;
  };
};

function createPublicContext(): CallerContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    },
    res: {
      clearCookie: () => {},
    },
  };
}

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should reject submission with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "",
        email: "test@example.com",
        message: "This is a test message",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("姓名不能为空");
    }
  });

  it("should reject submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "Test User",
        email: "invalid-email",
        message: "This is a test message",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("邮箱格式不正确");
    }
  });

  it("should reject submission with short message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "Test User",
        email: "test@example.com",
        message: "abc",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("消息至少需要 5 个字符");
    }
  });

  it("should accept valid contact submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Test User",
      company: "Test Company",
      email: "test@example.com",
      phone: "123456789",
      message: "This is a test",
    });

    expect(result).toMatchObject({
      success: true,
      message: expect.stringContaining("感谢您的提交"),
    });
  }, { timeout: 15000 });

  it("should accept submission without optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Test User",
      email: "test@example.com",
      message: "This is a test",
    });

    expect(result).toMatchObject({
      success: true,
      message: expect.stringContaining("感谢您的提交"),
    });
  }, { timeout: 15000 });
});
