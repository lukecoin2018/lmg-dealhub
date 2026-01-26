"use client";

import { useState } from "react";
import { Platform, ContentType, Deliverable } from "@/lib/types/calculator";
import { InfoIcon } from "@/components/ui/InfoIcon";

interface AddDeliverableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (deliverable: Omit<Deliverable, "id">) => void;
  editingDeliverable?: Deliverable;
}

export function AddDeliverableModal({
  isOpen,
  onClose,
  onAdd,
  editingDeliverable,
}: AddDeliverableModalProps) {
  const [platform, setPlatform] = useState<Platform>(
    editingDeliverable?.platform || "instagram"
  );
  const [contentType, setContentType] = useState<ContentType>(
    editingDeliverable?.contentType || "reel-standard"
  );
  const [quantity, setQuantity] = useState(editingDeliverable?.quantity || 1);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onAdd({ platform, contentType, quantity });
    onClose();
  };

  const contentTypesByPlatform: Record<Platform, Array<{ value: ContentType; label: string; description: string }>> = {
    instagram: [
      { value: "reel-short", label: "Short Reel", description: "15-30 seconds" },
      { value: "reel-standard", label: "Standard Reel", description: "30-60 seconds" },
      { value: "reel-long", label: "Long Reel", description: "60-90 seconds" },
      { value: "post", label: "Feed Post", description: "Single image/video" },
      { value: "carousel", label: "Carousel", description: "Multiple images" },
      { value: "story", label: "Story", description: "24hr ephemeral" },
    ],
    tiktok: [
      { value: "video-short", label: "Short Video", description: "15-30 seconds" },
      { value: "video-standard", label: "Standard Video", description: "30-60 seconds" },
      { value: "video-long", label: "Long Video", description: "60-90 seconds" },
      { value: "series", label: "Series", description: "Multi-part content" },
    ],
    youtube: [
      { value: "short", label: "Short", description: "60 sec vertical" },
      { value: "integration", label: "Video Integration", description: "In-video sponsorship" },
    ],
  };

  const availableContentTypes = contentTypesByPlatform[platform];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-secondary border border-border-color rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-brand-yellow">
            {editingDeliverable ? "Edit Deliverable" : "Add Deliverable"}
          </h3>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Platform Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-text-primary">
            Platform
            <InfoIcon content="Choose which social media platform this content is for." />
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["instagram", "tiktok", "youtube"] as Platform[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPlatform(p);
                  // Reset content type when platform changes
                  setContentType(contentTypesByPlatform[p][0].value);
                }}
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  platform === p
                    ? "bg-brand-yellow text-black"
                    : "bg-bg-primary hover:bg-bg-tertiary text-text-primary border border-border-color"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-text-primary">
            Content Type
            <InfoIcon content="Different content formats have different production requirements and engagement rates." />
          </label>
          <div className="grid grid-cols-2 gap-3">
            {availableContentTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setContentType(type.value)}
                className={`py-4 px-4 rounded-lg font-medium transition-all duration-200 text-left ${
                  contentType === type.value
                    ? "bg-brand-blue text-white"
                    : "bg-bg-primary hover:bg-bg-tertiary text-text-primary border border-border-color"
                }`}
              >
                <div className="font-semibold">{type.label}</div>
                <div className="text-xs mt-1 opacity-80">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-text-primary">
            Quantity
            <InfoIcon content="How many of this exact content type? You can add different types separately." />
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full"
            placeholder="e.g., 3"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 px-6 bg-bg-primary text-text-primary border border-border-color rounded-lg font-medium hover:bg-bg-tertiary transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="flex-1 py-3 px-6 bg-brand-yellow text-black rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            {editingDeliverable ? "Update" : "Add"} Deliverable
          </button>
        </div>
      </div>
    </div>
  );
}