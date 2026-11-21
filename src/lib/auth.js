import dns from 'node:dns';

// Only override DNS servers in local development.
// Overriding DNS inside Vercel's AWS Lambda runtime can break MongoDB SRV resolution.
if (process.env.NODE_ENV !== 'production') {
  try {
    dns.setServers(['1.1.1.1', '8.8.8.8']);
  } catch {
    // Ignore DNS override errors in environments that restrict it
  }
}

import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

if (!globalThis._mongoClient) {
  globalThis._mongoClient = new MongoClient(process.env.MONGODB_URI);
}
const client = globalThis._mongoClient;

const dbName = process.env.DB_NAME || 'salonbook_db';
const db = client.db(dbName);

const hasGoogleCreds = Boolean(
  process.env.GOOGLE_CLIENT_ID &&
  !process.env.GOOGLE_CLIENT_ID.startsWith('your_') &&
  process.env.GOOGLE_CLIENT_SECRET &&
  !process.env.GOOGLE_CLIENT_SECRET.startsWith('your_')
);

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    'http://localhost:3000',
    'https://salonbook-client-three.vercel.app',
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_APP_URL,
  ].filter(Boolean),
  emailAndPassword: { enabled: true },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google'],
      requireLocalEmailVerified: false,
    },
  },
  ...(hasGoogleCreds
    ? {
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            prompt: 'select_account',
          },
        },
      }
    : {}),
});
