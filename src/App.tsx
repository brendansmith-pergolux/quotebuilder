import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, Printer } from 'lucide-react';
import { PRODUCTS, partnerPrice, type PriceState } from './products';
import { fetchPriceState } from './priceState';

// brand
const INK = '#121212';
const GREEN = '#01A339';
const PAPER = '#FFFFFF';
const WASH = '#F7F8FA';
const LINE = '#E6E8EC';
const MUTE = '#6B7280';

type LineItem = { id: string; productId: string; variant: string; size: string; qty: number };

const usd = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

export default function App() {
  // Price state comes from the backend. No UI control, no label. Defaults to regular.
  const [state, setState] = useState<PriceState>('regular');
  const [customer, setCustomer] = useState('');
  const [project, setProject] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<LineItem[]>([]);

  useEffect(() => {
    fetchPriceState().then(setState);
  }, []);

  const addItem = () => {
    const p = PRODUCTS[0];
    setItems((prev) => [...prev, {
      id: crypto.randomUUID(), productId: p.id, variant: p.variants[0], size: p.sizes[0].size, qty: 1,
    }]);
  };
  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const changeItem = (id: string, field: keyof LineItem, value: string | number) =>
    setItems((prev) => prev.map((i) => {
      if (i.id !== id) return i;
      const next = { ...i, [field]: value } as LineItem;
      if (field === 'productId') {
        const p = PRODUCTS.find((x) => x.id === value)!;
        next.variant = p.variants[0];
        next.size = p.sizes[0].size;
      }
      return next;
    }));

  const totals = useMemo(() => {
    let website = 0, partner = 0;
    items.forEach((i) => {
      const p = PRODUCTS.find((x) => x.id === i.productId);
      const row = p?.sizes.find((x) => x.size === i.size);
      if (!row) return;
      website += row.website * i.qty;
      partner += partnerPrice(row, state) * i.qty;
    });
    return { website, partner, savings: website - partner };
  }, [items, state]);

  const today = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());

  const cell: React.CSSProperties = { background: 'transparent', border: 'none', outline: 'none', font: 'inherit', color: 'inherit', width: '100%', cursor: 'pointer', padding: 0 };
  const lbl: React.CSSProperties = { fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTE, fontWeight: 700 };

  return (
    <div className="pgx-app" style={{ color: INK, background: WASH, minHeight: '100vh' }}>
      <style>{`
        input:focus, textarea:focus, select:focus { outline: none; }
        .pgx-grid { display: grid; grid-template-columns: 1.6fr 1.1fr 1fr 64px 1.1fr 1.1fr 36px; align-items: center; }
        .pgx-num { font-variant-numeric: tabular-nums; }
        .pgx-row:hover { background: ${WASH}; }
        .pgx-del { opacity: 0; transition: opacity .12s; }
        .pgx-row:hover .pgx-del { opacity: 1; }
        @media print {
          .no-print { display: none !important; }
          .pgx-app { min-height: 0 !important; background: #fff !important; }
          .pgx-container { margin: 0 !important; padding: 0 !important; max-width: none !important; }
          .pgx-sheet { box-shadow: none !important; border: none !important; border-radius: 0 !important; overflow: visible !important; }
          .print-head { display: flex !important; }
          .pgx-disclaimer { margin-top: 12px !important; }
        }
        .print-head { display: none; }
      `}</style>

      {/* control bar (screen only) */}
      <div className="no-print" style={{ background: INK, color: '#fff', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: 20 }}>PERGOLUX</span>
          <span style={{ color: '#9AA0A6', fontSize: 13, fontWeight: 500 }}>Partner Quote Builder</span>
        </div>
        <button onClick={() => window.print()} style={{ ...cell, width: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: GREEN, color: '#fff', padding: '8px 16px', borderRadius: 6, fontWeight: 700, fontSize: 13 }}>
          <Printer size={15} /> Export PDF
        </button>
      </div>

      <div className="pgx-container" style={{ maxWidth: 1080, margin: '24px auto', padding: '0 20px 60px' }}>
        <div className="pgx-sheet" style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>

          {/* print-only letterhead */}
          <div className="print-head" style={{ justifyContent: 'space-between', alignItems: 'flex-start', padding: '0 0 16px', borderBottom: `2px solid ${INK}`, marginBottom: 4 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>PERGOLUX</div>
              <div style={{ fontSize: 11, color: MUTE }}>Authorized Partner Quote</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 11, color: MUTE }}>
              <div>Partner Line: 1-909-293-9840</div>
              <div>partners@pergoluxshop.com</div>
            </div>
          </div>

          {/* meta */}
          <div style={{ display: 'flex', gap: 28, padding: '20px 24px', borderBottom: `1px solid ${LINE}`, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={lbl}>Customer</div>
              <input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer name"
                style={{ ...cell, cursor: 'text', borderBottom: `1px solid ${LINE}`, padding: '6px 0', fontWeight: 600, fontSize: 15 }} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={lbl}>Project</div>
              <input value={project} onChange={(e) => setProject(e.target.value)} placeholder="Project name"
                style={{ ...cell, cursor: 'text', borderBottom: `1px solid ${LINE}`, padding: '6px 0', fontWeight: 600, fontSize: 15 }} />
            </div>
            <div style={{ width: 160 }}>
              <div style={lbl}>Quote Date</div>
              <div style={{ padding: '6px 0', fontWeight: 600, fontSize: 15 }}>{today}</div>
            </div>
          </div>

          {/* items header */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px 6px' }}>
            <span style={lbl}>Line Items</span>
            <button onClick={addItem} style={{ ...cell, width: 'auto', display: 'flex', alignItems: 'center', gap: 5, color: GREEN, fontWeight: 700, fontSize: 13 }}>
              <Plus size={15} /> Add item
            </button>
          </div>

          <div style={{ padding: '0 24px' }}>
            <div className="pgx-grid" style={{ ...lbl, borderBottom: `1px solid ${LINE}`, padding: '10px 0' }}>
              <div>Product</div><div>Variant</div><div>Size</div>
              <div style={{ textAlign: 'center' }}>Qty</div>
              <div style={{ textAlign: 'right' }}>Website Price</div>
              <div style={{ textAlign: 'right' }}>Partner Price</div>
              <div />
            </div>

            {items.length === 0 && (
              <div className="no-print" style={{ textAlign: 'center', padding: '40px 0', color: MUTE, fontSize: 14 }}>
                No items yet. Click “Add item” to start the quote.
              </div>
            )}

            {items.map((i) => {
              const p = PRODUCTS.find((x) => x.id === i.productId)!;
              const row = p.sizes.find((x) => x.size === i.size)!;
              const lineTotal = partnerPrice(row, state) * i.qty;
              return (
                <div key={i.id} className="pgx-grid pgx-row" style={{ borderBottom: `1px solid ${LINE}`, padding: '12px 0', fontSize: 14 }}>
                  <div style={{ fontWeight: 700, paddingRight: 8 }}>
                    <select value={i.productId} onChange={(e) => changeItem(i.id, 'productId', e.target.value)} style={{ ...cell, fontWeight: 700 }}>
                      {PRODUCTS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
                    </select>
                  </div>
                  <div style={{ color: '#374151', paddingRight: 8 }}>
                    <select value={i.variant} onChange={(e) => changeItem(i.id, 'variant', e.target.value)} style={{ ...cell, color: '#374151' }}>
                      {p.variants.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div style={{ color: '#374151', paddingRight: 8 }}>
                    <select value={i.size} onChange={(e) => changeItem(i.id, 'size', e.target.value)} style={{ ...cell, color: '#374151' }}>
                      {p.sizes.map((x) => <option key={x.size} value={x.size}>{x.size}</option>)}
                    </select>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <input type="number" min="1" value={i.qty} onChange={(e) => changeItem(i.id, 'qty', parseInt(e.target.value) || 1)}
                      style={{ ...cell, cursor: 'text', width: 48, textAlign: 'center', border: `1px solid ${LINE}`, borderRadius: 4, padding: '3px 0' }} />
                  </div>
                  <div className="pgx-num" style={{ textAlign: 'right', color: MUTE, textDecoration: 'line-through' }}>{usd(row.website)}</div>
                  <div className="pgx-num" style={{ textAlign: 'right', fontWeight: 700 }}>{usd(lineTotal)}</div>
                  <div style={{ textAlign: 'right' }}>
                    <button className="pgx-del no-print" onClick={() => removeItem(i.id)} title="Remove" style={{ ...cell, width: 'auto', color: '#C0392B' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, padding: '24px', borderTop: `2px solid ${INK}`, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={lbl}>Notes</div>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Delivery details, project notes…"
                style={{ ...cell, cursor: 'text', resize: 'none', height: 64, width: '100%', border: `1px solid ${LINE}`, borderRadius: 6, padding: 8, marginTop: 4, fontSize: 13 }} />
              <div style={{ fontSize: 10.5, color: MUTE, marginTop: 10, lineHeight: 1.5, maxWidth: 380 }}>
                Pricing on your order is determined by what is live the moment the order is placed; quoted pricing is not held. Excludes applicable tax. Website Price shown for reference only.
              </div>
            </div>
            <div style={{ width: 300 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: MUTE, padding: '4px 0' }}>
                <span>Website Price total</span>
                <span className="pgx-num" style={{ textDecoration: 'line-through' }}>{usd(totals.website)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: GREEN, fontWeight: 600, padding: '4px 0' }}>
                <span>Partner savings</span>
                <span className="pgx-num">−{usd(totals.savings)}</span>
              </div>
              <div style={{ height: 1, background: LINE, margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={lbl}>Partner total</span>
                <span className="pgx-num" style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>{usd(totals.partner)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* estimation disclaimer band */}
        <div className="pgx-disclaimer" style={{ textAlign: 'center', marginTop: 20, padding: '14px 20px', fontSize: 12.5, color: MUTE, lineHeight: 1.5 }}>
          Note — this is only for quick estimation purposes; actual quotes and orders must be created on PERGOLUX's website.{' '}
          <a href="https://account.pergoluxshop.com/" target="_blank" rel="noopener noreferrer"
            style={{ color: GREEN, fontWeight: 700, textDecoration: 'none' }}>
            Login here
          </a>
        </div>

      </div>
    </div>
  );
}
