# PERGOLUX Partner Quote Builder

Internal/partner tool. Build a quote, export a clean branded PDF.
Partner pricing is driven from the backend — partners never see whether
Regular (Evergreen) or Promo pricing is active.

## Run locally
1. `npm install`
2. `npm run dev`  → http://localhost:5173
   (Locally, price state falls back to the `PRICE_STATE` value in `.env`.)

## Deploy to Vercel
1. Push this repo to GitHub.
2. In Vercel: New Project → import the repo. Framework auto-detects as **Vite**.
3. Deploy. It works immediately and defaults to **Regular (Evergreen)** pricing.

## Flipping to Promo pricing — LIVE, no redeploy (recommended)
Uses Vercel Edge Config so a price-state change propagates in ~milliseconds.

1. Vercel project → **Storage** → create an **Edge Config** store, connect it to
   this project (this auto-sets the `EDGE_CONFIG` env var).
2. In the Edge Config store, add an item:
   - key: `priceState`
   - value: `regular`  (or `promo`)
3. To run a promo window: set `priceState` = `promo`. Save.
   All new quotes immediately use Promo Partner Price.
4. When the window ends: set it back to `regular`.

## Flipping via env var (simpler, but requires a redeploy)
If you don't use Edge Config, set an env var in Vercel:
- `PRICE_STATE` = `regular` or `promo`
Changing it requires a redeploy to take effect. Edge Config always wins if both are set.

## Updating prices
All pricing lives in `src/products.ts`. Edit values there and redeploy.
Each SKU carries: Website Price (reference), Regular Partner Price, Promo Partner Price.

## Notes
- No tiers, no MSRP language, no MAP logic. MAP governs advertised price only and is
  intentionally out of scope for this tool.
- "Quoted pricing is not held" is printed on every quote.
