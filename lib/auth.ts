import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";
import { Resend } from "resend";
import { render } from "@react-email/render";
import nodemailer, { Transporter } from "nodemailer";
import PasswordResetEmail from "@/components/emails/reset-email-password";

const resend = new Resend(process.env.RESEND_API_KEY);

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const emailHtml = await render(
        PasswordResetEmail({
          userEmail: user.email,
          resetUrl: url,
          requestTime: new Date().toLocaleString(),
        })
      );
      console.log("Reset link:", url);
      const emailResponse = await transporter.sendMail({
        from: `"Inflyte support" <${process.env.EMAIL_USER}>`,
        to: [user.email],
        subject: "Reset your password",
        html: emailHtml,
      });
      console.log("Email sent response:", emailResponse);
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  plugins: [nextCookies()],
});
