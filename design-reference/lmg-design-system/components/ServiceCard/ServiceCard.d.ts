import * as React from 'react';

export interface ServiceCardProps {
  /** Audience color-coding. brand = blue, influencer = pink. */
  audience?: 'brand' | 'influencer';
  /** Pill label shown over the photo, e.g. "For Brands". */
  pill?: React.ReactNode;
  /** Background image URL for the photo area. */
  photo?: string;
  /** Lucide icon name for the badge. */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Key-feature bullet items. */
  features?: React.ReactNode[];
  /** Renders a "+N more features" link when set. */
  moreCount?: number;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

/** Audience-color-coded service card — photo, badge, key features, dual CTA. */
export function ServiceCard(props: ServiceCardProps): JSX.Element;
