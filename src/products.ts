// PERGOLUX Authorized Partner Price List — US — valid as of June 4, 2026.
// Source of truth for the quote builder. Update values here when the list changes.
// Variants within a product share identical pricing per the published list.

export type PriceState = 'regular' | 'promo';

export type SizeRow = {
  size: string;
  website: number;   // consumer reference price ("Website Price")
  regular: number;   // Regular Evergreen Partner Price
  promo: number;     // Promo Partner Price
};

export type Product = {
  id: string;
  name: string;
  variants: string[];
  sizes: SizeRow[];
};

const r = (size: string, website: number, regular: number, promo: number): SizeRow =>
  ({ size, website, regular, promo });

export const PRODUCTS: Product[] = [
  {
    id: 'p4', name: 'Pergola 4', variants: ['Freestanding', 'Wall Mounted'],
    sizes: [
      r("10' x 10'", 6490, 3861.55, 3309.90), r("10' x 13'", 7990, 5093.62, 4414.48),
      r("10' x 16'", 10290, 6559.88, 5685.23), r("10' x 19'", 12290, 7834.88, 6790.23),
      r("13' x 13'", 10990, 7006.12, 6071.98), r("13' x 16'", 12490, 7962.38, 6900.73),
      r("13' x 19'", 14490, 9237.38, 8005.73),
    ],
  },
  {
    id: 'p4pro', name: 'Pergola 4 Pro', variants: ['Freestanding', 'Wall Mounted'],
    sizes: [
      r("10' x 10'", 7990, 4754.05, 4074.90), r("10' x 13'", 9990, 6368.62, 5519.48),
      r("10' x 16'", 11490, 7324.88, 6348.23), r("10' x 19'", 15990, 10193.62, 8834.48),
      r("13' x 13'", 13990, 8918.62, 7729.48), r("13' x 16'", 16490, 10512.38, 9110.73),
      r("13' x 19'", 17990, 11468.62, 9939.48),
    ],
  },
  {
    id: 'p4promax', name: 'Pergola 4 Pro Max', variants: ['Freestanding', 'Wall Mounted'],
    sizes: [
      r("10' x 10'", 11490, 6836.55, 5859.90), r("10' x 13'", 14490, 9237.38, 8005.73),
      r("10' x 16'", 17990, 11468.62, 9939.48), r("10' x 19'", 21490, 13699.88, 11873.23),
      r("13' x 13'", 20990, 13381.12, 11596.98), r("13' x 16'", 23990, 15293.62, 13254.48),
      r("13' x 19'", 25990, 16568.62, 14359.48),
    ],
  },
  {
    id: 'ps3', name: 'Pergola S3', variants: ['Freestanding', 'Wall Mounted'],
    sizes: [
      r("10' x 10'", 6660, 3962.70, 3396.60), r("10' x 13'", 7850, 5004.38, 4337.12),
      r("10' x 16'", 10200, 6502.50, 5635.50), r("10' x 19'", 12000, 7650.00, 6630.00),
      r("13' x 13'", 11000, 7012.50, 6077.50), r("13' x 16'", 13000, 8287.50, 7182.50),
      r("13' x 19'", 14600, 9307.50, 8066.50),
    ],
  },
  {
    id: 'sundreams3', name: 'Sundream S3', variants: ['Freestanding', 'Wall Mounted'],
    sizes: [
      r("10' x 10'", 8300, 4938.50, 4233.00), r("10' x 13'", 9700, 6183.75, 5359.25),
      r("10' x 16'", 11500, 7331.25, 6353.75), r("10' x 19'", 15650, 9976.88, 8646.62),
      r("13' x 13'", 13520, 8619.00, 7469.80), r("13' x 16'", 16000, 10200.00, 8840.00),
      r("13' x 19'", 17400, 11092.50, 9613.50),
    ],
  },
  {
    id: 'skydances3', name: 'Skydance S3', variants: ['Freestanding'],
    sizes: [
      r("10' x 10'", 11330, 6741.35, 5778.30), r("10' x 13'", 14100, 8988.75, 7790.25),
      r("13' x 13'", 20400, 13005.00, 11271.00), r("13' x 19'", 26200, 16702.50, 14475.50),
    ],
  },
  {
    id: 'zipscreen', name: 'Zip Screen', variants: ['Manual Operation'],
    sizes: [
      r("10'", 1730, 882.30, 735.25), r("13'", 1947, 1075.72, 910.22),
      r("16'", 2379, 1314.40, 1112.18), r("19'", 2730, 1508.33, 1276.28),
    ],
  },
  {
    id: 'glasswall', name: 'Glass Wall', variants: ['Fixed', 'Frameless', 'Frame (Sliding)'],
    sizes: [
      r("10'", 2379, 1516.61, 1415.51), r("13'", 3116, 1986.45, 1854.02),
      r("16'", 4017, 2560.84, 2390.11), r("19'", 4815, 3069.56, 2864.93),
    ],
  },
  {
    id: 'ledlights', name: 'LED Lights', variants: ['RGB', 'Warm White'],
    sizes: [
      r("10' x 10'", 505, 279.01, 214.62), r("10' x 13'", 577, 318.79, 245.22),
      r("10' x 16'", 633, 349.73, 269.02), r("10' x 19'", 742, 409.95, 315.35),
      r("13' x 13'", 695, 383.99, 295.38), r("13' x 16'", 798, 440.89, 339.15),
      r("13' x 19'", 855, 472.39, 363.38),
    ],
  },
  { id: 'heatlamp', name: 'Heatlamp 1500w', variants: ['Standard'], sizes: [r('One Size', 412, 227.63, 175.10)] },
  { id: 'everglowmed', name: 'Everglow Medium', variants: ['Standard'], sizes: [r('One Size', 412, 227.63, 175.10)] },
  { id: 'everglowlrg', name: 'Everglow Large', variants: ['Standard'], sizes: [r('One Size', 450, 248.62, 191.25)] },
];

export const partnerPrice = (row: SizeRow, state: PriceState): number =>
  state === 'promo' ? row.promo : row.regular;
