export interface StatTileProps {
  /** The headline figure, e.g. "35.6%". Keep numbers specific. */
  value: React.ReactNode;
  /** Short label under the figure, e.g. "YoY Growth". */
  label: React.ReactNode;
  /** Accent color. blue = data/brands, pink = influencers, yellow = brand. */
  tone?: 'blue' | 'pink' | 'yellow';
}

/** Signature stat callout tile. */
export function StatTile(props: StatTileProps): JSX.Element;
