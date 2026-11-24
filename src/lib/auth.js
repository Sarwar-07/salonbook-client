import dns from 'node:dns';

// Only override DNS servers in local development.
// Custom DNS overrides inside Vercel's AWS Lambda runtime cause querySrv timeouts/500 errors.
if (!process.env.VERCEL && process.env.NODE_ENV !== 'production') {
  try {
    dns.setServers(['1.1.1.1', '8.8.8.8']);
  } catch {
    // Ignore DNS override errors in environments that restrict it
  }
}

import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const mongoUri = (process.env.MONGODB_URI || '').trim();

if (!globalThis._mongoClient) {
  globalThis._mongoClient = new MongoClient(mongoUri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
  });
}
const client = globalThis._mongoClient;

const dbName = (process.env.DB_NAME || 'salonbook_db').trim();
const db = client.db(dbName);

const hasGoogleCreds = Boolean(
  process.env.GOOGLE_CLIENT_ID &&
  !process.env.GOOGLE_CLIENT_ID.startsWith('your_') &&
  process.env.GOOGLE_CLIENT_SECRET &&
  !process.env.GOOGLE_CLIENT_SECRET.startsWith('your_')
);

const baseURL = (
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  'http://localhost:3000'
).trim();

const secret = process.env.BETTER_AUTH_SECRET?.trim();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL,
  secret,
  trustedOrigins: [
    'http://localhost:3000',
    'https://salonbook-client-three.vercel.app',
    baseURL,
    process.env.BETTER_AUTH_URL?.trim(),
    process.env.NEXT_PUBLIC_APP_URL?.trim(),
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
            clientId: process.env.GOOGLE_CLIENT_ID?.trim(),
            clientSecret: process.env.GOOGLE_CLIENT_SECRET?.trim(),
            prompt: 'select_account',
          },
        },
      }
    : {}),
});
