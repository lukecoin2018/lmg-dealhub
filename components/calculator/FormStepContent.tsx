"use client";

import { useState } from "react";
import { Deliverable } from "@/lib/types/calculator";
import { DeliverableCard } from "./DeliverableCard";
import { AddDeliverableModal } from "./AddDeliverableModal";

interface FormStepContentProps {
  deliverables: Deliverable[];
  onChange: (deliverables: Deliverable[]) => void;
}

export function FormStepContent({ deliverables, onChange }: FormStepContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeliverable, setEditingDeliverable] = useState<Deliverable | undefined>();

  const handleAddDeliverable = (newDeliverable: Omit<Deliverable, "id">) => {
    if (editingDeliverable) {
      // Update existing
      const updated = deliverables.map((d) =>
        d.id === editingDeliverable.id ? { ...newDeliverable, id: d.id } : d
      );
      onChange(updated);
      setEditingDeliverable(undefined);
    } else {
      // Add new
      const deliverable: Deliverable = {
        ...newDeliverable,
        id: Date.now().toString(),
      };
      onChange([...deliverables, deliverable]);
    }
  };

  const handleEdit = (id: string) => {
    const deliverable = deliverables.find((d) => d.id === id);
    setEditingDeliverable(deliverable);
    setIsModalOpen(true);
  };

  const handleRemove = (id: string) => {
    onChange(deliverables.filter((d) => d.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDeliverable(undefined);
  };

  const totalDeliverables = deliverables.reduce((sum, d) => sum + d.quantity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-text-primary">Build Your Package</h2>
        <p className="text-text-secondary">
          Add all the deliverables for this partnership. Mix platforms and content types freely.
        </p>
      </div>

      {/* Deliverables List */}
      {deliverables.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-text-primary">Your Deliverables</h3>
            <span className="text-sm text-text-secondary">
              {totalDeliverables} item{totalDeliverables !== 1 ? "s" : ""} total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.map((deliverable, index) => (
              <DeliverableCard
                key={deliverable.id}
                deliverable={deliverable}
                index={index}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Bundle Discount Info */}
          {totalDeliverables >= 3 && (
            <div className="p-4 bg-brand-blue/10 border border-brand-blue/30 rounded-lg">
              <p className="text-sm text-brand-blue">
                💡 Bundle discount will be applied: {totalDeliverables >= 5 ? "15%" : "10%"} off total package
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {deliverables.length === 0 && (
        <div className="text-center py-12 bg-bg-primary rounded-xl border-2 border-dashed border-border-color">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2 text-text-primary">No deliverables yet</h3>
          <p className="text-text-secondary mb-6">
            Add your first deliverable to start building your package
          </p>
        </div>
      )}

      {/* Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-4 px-6 bg-brand-yellow text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <span className="text-xl">+</span>
        Add Deliverable
      </button>

      {/* Modal */}
      <AddDeliverableModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddDeliverable}
        editingDeliverable={editingDeliverable}
      />
    </div>
  );
}