import type { VercelRequest, VercelResponse } from '@vercel/node';
import { get } from '@vercel/edge-config';

// Returns the active partner price state.
// Priority:
//   1. Edge Config key "priceState"  -> live flip from Vercel dashboard, NO redeploy
//   2. Env var PRICE_STATE            -> fallback (requires redeploy to change)
//   3. "regular"                      -> safe default
// The frontend calls this on load. Partners never see which state is active.
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  let state: 'regular' | 'promo' = 'regular';

  try {
    const cfg = await get('priceState'); // throws if Edge Config not connected
    if (cfg === 'promo' || cfg === 'regular') {
      state = cfg;
    } else if (process.env.PRICE_STATE === 'promo') {
      state = 'promo';
    }
  } catch {
    // Edge Config not connected yet — fall back to env var.
    if (process.env.PRICE_STATE === 'promo') state = 'promo';
  }

  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(200).json({ state });
}
