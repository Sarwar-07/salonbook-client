import { auth, getClientPromise } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

export const dynamic = 'force-dynamic';

const handlers = toNextJsHandler(auth);

export async function GET(request, ...args) {
  try {
    if (typeof getClientPromise === 'function') {
      await getClientPromise();
    }
    return await handlers.GET(request, ...args);
  } catch (err) {
    console.error('[BetterAuth Error]', err);
    return new Response(
      JSON.stringify({
        error: err?.message || 'Authentication error',
        status: 500,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(request, ...args) {
  try {
    if (typeof getClientPromise === 'function') {
      await getClientPromise();
    }
    return await handlers.POST(request, ...args);
  } catch (err) {
    console.error('[BetterAuth Error]', err);
    return new Response(
      JSON.stringify({
        error: err?.message || 'Authentication error',
        status: 500,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
