import * as React from 'react';

export interface ButtonProps {
  /** Visual style. Audience colors: secondary = pink (influencers), blue = brands, primary = yellow. */
  variant?: 'primary' | 'secondary' | 'blue' | 'ghost' | 'outline' | 'dark';
  /** Height/padding preset. */
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name rendered before the label. */
  icon?: string;
  /** Lucide icon name rendered after the label. */
  iconRight?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
}

/** LMG Media primary button. Active, two- or three-word imperative labels. */
export function Button(props: ButtonProps): JSX.Element;
