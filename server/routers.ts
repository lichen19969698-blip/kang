import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContactSubmission } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendEmail } from "./_core/mailer";
import { ENV } from "./_core/env";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "姓名不能为空"),
        company: z.string().optional(),
        email: z.string().email("邮箱格式不正确"),
        phone: z.string().optional(),
        message: z.string().min(5, "消息至少需要 5 个字符"),
      }))
      .mutation(async ({ input }) => {
        try {
          // Save to database
          await createContactSubmission({
            name: input.name,
            company: input.company || null,
            email: input.email,
            phone: input.phone || null,
            message: input.message,
          });

          const ownerEmail = "15829053969@163.com";
          const senderEmail = ENV.smtpUser;

          // 1. 发送给客户的确认邮件
          const customerEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <div style="background-color: #1e3a8a; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <h2 style="margin: 0;">感谢您的询价</h2>
              </div>
              
              <div style="padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
                <p>亲爱的 ${input.name}，</p>
                <p>感谢您对西安达康电子材料有限公司的关注！我们已收到您的询价，我们的销售团队会尽快与您联系。</p>
                
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #1e3a8a;">您的询价信息</h3>
                  <p><strong>姓名：</strong> ${input.name}</p>
                  ${input.company ? `<p><strong>公司：</strong> ${input.company}</p>` : ""}
                  <p><strong>邮箱：</strong> ${input.email}</p>
                  ${input.phone ? `<p><strong>电话：</strong> ${input.phone}</p>` : ""}
                  <p><strong>询价内容：</strong></p>
                  <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px;">${input.message}</p>
                </div>

                <p style="margin-top: 30px; font-weight: bold;">如有任何问题，请随时与我们联系：</p>
                <ul style="list-style: none; padding: 0;">
                  <li>📞 电话：13926962928</li>
                  <li>📧 邮箱：15829053969@163.com</li>
                  <li>📍 地址：陕西省西安市经济技术开发区二环北路东段1375号亚冠大厦1号楼2单元</li>
                </ul>

                <p style="color: #6b7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                  此邮件由系统自动发送，请勿直接回复。
                </p>
              </div>

              <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #6b7280;">
                <p>西安达康电子材料有限公司</p>
              </div>
            </div>
          `;

          // 2. 发送给管理员的通知邮件
          const adminEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <div style="background-color: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <h2 style="margin: 0;">🔔 新的客户询价</h2>
              </div>
              
              <div style="padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
                <p>您收到了一条新的客户询价。</p>
                
                <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
                  <h3 style="margin-top: 0;">客户信息</h3>
                  <p><strong>姓名：</strong> ${input.name}</p>
                  ${input.company ? `<p><strong>公司：</strong> ${input.company}</p>` : ""}
                  <p><strong>邮箱：</strong> ${input.email}</p>
                  ${input.phone ? `<p><strong>电话：</strong> ${input.phone}</p>` : ""}
                  <p><strong>询价内容：</strong></p>
                  <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px;">${input.message}</p>
                </div>

                <p style="color: #6b7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                  此邮件由系统自动发送。
                </p>
              </div>
            </div>
          `;

	          // 发送两封邮件
	          // 1. 发送给客户的确认邮件 (发件人是 163 邮箱，收件人是用户输入的邮箱)
	          const customerEmailSent = await sendEmail({
	            to: input.email,
	            subject: "询价确认 - 西安达康电子材料有限公司",
	            html: customerEmailHtml,
	            from: senderEmail,
	          });

	          // 2. 发送给管理员的通知邮件 (发件人是 163 邮箱，收件人也是 163 邮箱作为管理员通知)
	          const adminEmailSent = await sendEmail({
	            to: ownerEmail,
	            subject: `新的客户询价 - ${input.name}`,
	            html: adminEmailHtml,
	            from: senderEmail,
	          });

          // 如果邮件发送失败，尝试使用 Manus 通知系统
          if (!adminEmailSent) {
            await notifyOwner({
              title: "新的联系表单提交",
              content: `来自 ${input.name} (${input.email}) 的新询价：\n\n${input.message}`,
            });
          }

          return {
            success: true,
            message: "感谢您的提交，我们会尽快与您联系！",
          };
        } catch (error) {
          console.error("Contact submission error:", error);
          throw new Error("提交失败，请稍后重试");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
