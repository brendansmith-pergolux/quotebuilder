import type { PriceState } from './products';

// Fetches the active price state from the backend on load.
// Partner-facing app shows no indication of which state is active.
export async function fetchPriceState(): Promise<PriceState> {
  try {
    const res = await fetch('/api/price-state', { cache: 'no-store' });
    if (!res.ok) return 'regular';
    const data = await res.json();
    return data?.state === 'promo' ? 'promo' : 'regular';
  } catch {
    return 'regular';
  }
}
