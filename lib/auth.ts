import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema/auth-schema";
import { sendEmail } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }) => {
      void sendEmail({
        toEmail: user.email,
        subject: "Silent Board - Reset your password",
        htmlBody: `<p>Hi ${user.name},</p>
         <p><a href="${url}">Click here to reset your password</a></p>`,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        toEmail: user.email,
        subject: "Silent Board - Verify your email address",
        htmlBody: `<p>Hi ${user.name},</p>
         <p><a href="${url}">Click here to verify your email</a></p>`,
      });
    },
  },

  plugins: [nextCookies(), username()],
});
