"use client";

import { Deliverable, Platform, ContentType } from "@/lib/types/calculator";

interface DeliverableCardProps {
  deliverable: Deliverable;
  index: number;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  estimatedRate?: number;
}

export function DeliverableCard({
  deliverable,
  index,
  onEdit,
  onRemove,
  estimatedRate,
}: DeliverableCardProps) {
  const platformEmojis: Record<Platform, string> = {
    instagram: "📱",
    tiktok: "🎵",
    youtube: "▶️",
  };

  const formatContentType = (type: ContentType): string => {
    const names: Record<ContentType, string> = {
      "reel-short": "Short Reel (15-30s)",
      "reel-standard": "Standard Reel (30-60s)",
      "reel-long": "Long Reel (60-90s)",
      post: "Feed Post",
      carousel: "Carousel Post",
      story: "Story",
      "video-short": "Short Video (15-30s)",
      "video-standard": "Standard Video (30-60s)",
      "video-long": "Long Video (60-90s)",
      series: "Series",
      short: "YouTube Short",
      integration: "Video Integration",
    };
    return names[type] || type;
  };

  const formatPlatform = (platform: Platform): string => {
    const names: Record<Platform, string> = {
      instagram: "Instagram",
      tiktok: "TikTok",
      youtube: "YouTube",
    };
    return names[platform];
  };

  return (
    <div className="group relative bg-bg-secondary border border-border-color rounded-xl p-4 hover:border-brand-blue transition-all duration-200">
      {/* Number Badge */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-brand-yellow text-black rounded-full flex items-center justify-center font-bold text-sm">
        {index + 1}
      </div>

      <div className="flex items-start justify-between gap-4">
        {/* Content Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{platformEmojis[deliverable.platform]}</span>
            <span className="font-semibold text-brand-yellow">
              {formatPlatform(deliverable.platform)}
            </span>
          </div>
          <div className="text-text-primary font-medium">
            {formatContentType(deliverable.contentType)}
          </div>
          <div className="text-sm text-text-secondary mt-1">
            Quantity: {deliverable.quantity}
          </div>
        </div>

        {/* Rate Preview */}
        {estimatedRate && (
          <div className="text-right">
            <div className="text-xs text-text-tertiary mb-1">Estimated</div>
            <div className="text-xl font-bold text-brand-pink">
              ${Math.round(estimatedRate).toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(deliverable.id)}
          className="flex-1 py-2 px-3 bg-bg-primary hover:bg-bg-tertiary text-brand-blue rounded-lg text-sm font-medium transition-colors border border-brand-blue/20"
        >
          Edit
        </button>
        <button
          onClick={() => onRemove(deliverable.id)}
          className="flex-1 py-2 px-3 bg-bg-primary hover:bg-red-950 text-brand-pink hover:text-red-400 rounded-lg text-sm font-medium transition-colors border border-brand-pink/20"
        >
          Remove
        </button>
      </div>
    </div>
  );
}