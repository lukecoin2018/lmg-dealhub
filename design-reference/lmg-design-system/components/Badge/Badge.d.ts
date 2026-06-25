import * as React from 'react';

export interface BadgeProps {
  /** Color-coding. pink = For Influencers, blue = For Brands, yellow = featured/brand. */
  tone?: 'neutral' | 'yellow' | 'pink' | 'blue' | 'dark' | 'outline';
  /** Optional Lucide icon name. */
  icon?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Small pill badge used for audience tags, levels, and status. */
export function Badge(props: BadgeProps): JSX.Element;
