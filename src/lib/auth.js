import dns from 'node:dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);

import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

let client;
if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongoClient) {
    globalThis._mongoClient = new MongoClient(process.env.MONGODB_URI);
  }
  client = globalThis._mongoClient;
} else {
  client = new MongoClient(process.env.MONGODB_URI);
}

const db = client.db(process.env.DB_NAME || 'salonbook_db');

const hasGoogleCreds = Boolean(
  process.env.GOOGLE_CLIENT_ID &&
  !process.env.GOOGLE_CLIENT_ID.startsWith('your_') &&
  process.env.GOOGLE_CLIENT_SECRET &&
  !process.env.GOOGLE_CLIENT_SECRET.startsWith('your_')
);

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    'http://localhost:3000',
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_APP_URL,
  ].filter(Boolean),
  emailAndPassword: { enabled: true },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
      requireLocalEmailVerified: false,
    },
  },
  ...(hasGoogleCreds
    ? {
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            prompt: "select_account",
          },
        },
      }
    : {}),
});
