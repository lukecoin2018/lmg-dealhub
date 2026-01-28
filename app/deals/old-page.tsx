'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { createClient } from '@/lib/supabase/client';

type Deal = {
  id: string;
  user_id?: string | null;
  brand_id?: string | null;
  deal_name?: string | null;
  brand_name: string;
  amount: number;
  status: 'lead' | 'negotiating' | 'closed' | 'paid';
  deliverables: string | null;
  deadline: string | null;
  payment_status?: string | null;
  payment_received?: number | null;
  notes: string | null;
  contract_id?: string | null;
  created_at: string;
  updated_at: string;
};

type NegotiationNote = {
  id: string;
  user_id?: string | null;
  deal_id: string;
  note_type: 'conversation' | 'action_item' | 'rate_change' | 'contact' | 'decision';
  content: string;
  created_at: string;
};

export default function DealsPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [dealNotes, setDealNotes] = useState<NegotiationNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [newNoteType, setNewNoteType] = useState<NegotiationNote['note_type']>('conversation');
  const [showNotesModal, setShowNotesModal] = useState<string | false>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Form state
  const [brandName, setBrandName] = useState('');
  const [value, setValue] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');

  // Check authentication and load deals
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      setUserId(user.id);
      await loadDeals();
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/login');
    }
  };

  const loadDeals = async () => {
    try {
      console.log('Starting loadDeals...');
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });
  
      console.log('Query result:', { data, error });
  
      if (error) {
        console.error('Supabase error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
  
      console.log('Deals loaded successfully:', data);
      setDeals(data || []);
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDeal = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!userId) {
      console.error('User not authenticated');
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('deals')
        .insert([
          {
            user_id: userId,
            brand_name: brandName,
            deal_name: `${brandName} - ${deliverables || 'Deal'}`,  // ADD THIS LINE
            amount: parseFloat(value),
            status: 'lead',
            deliverables: deliverables || null,
            deadline: deadline || null,
            notes: notes || null,
          }
        ])
        .select();
  
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
  
      console.log('Deal added successfully:', data);
      await loadDeals();
      setIsAddModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding deal:', error);
    }
  };

  const handleEditDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeal) return;
  
    try {
      const { error } = await supabase
        .from('deals')
        .update({
          brand_name: brandName,
          amount: parseFloat(value),
          deliverables: deliverables || null,
          deadline: deadline || null,
          notes: notes || null,
        })
        .eq('id', selectedDeal.id);
  
      if (error) throw error;
  
      console.log('Deal updated successfully');
      await loadDeals();
      setSelectedDeal(null);
      resetForm();
    } catch (error) {
      console.error('Error updating deal:', error);
    }
  };

  const openDealDetails = (deal: Deal) => {
    setSelectedDeal(deal);
    setBrandName(deal.brand_name);
    setValue(deal.amount.toString());
    setDeliverables(deal.deliverables || '');
    setDeadline(deal.deadline || '');
    setNotes(deal.notes || '');
  };

  const resetForm = () => {
    setBrandName('');
    setValue('');
    setDeliverables('');
    setDeadline('');
    setNotes('');
  };

  const moveDeal = async (dealId: string, newStatus: Deal['status']) => {
    try {
      const { error } = await supabase
        .from('deals')
        .update({ status: newStatus })
        .eq('id', dealId);

      if (error) throw error;

      await loadDeals();
    } catch (error) {
      console.error('Error moving deal:', error);
      alert('Failed to move deal. Please try again.');
    }
  };

  const deleteDeal = async (dealId: string) => {
    if (!confirm('Are you sure you want to delete this deal?')) return;

    try {
      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('id', dealId);

      if (error) throw error;

      await loadDeals();
      setSelectedDeal(null);
    } catch (error) {
      console.error('Error deleting deal:', error);
      alert('Failed to delete deal. Please try again.');
    }
  };

  const loadDealNotes = async (dealId: string) => {
    try {
      const { data, error } = await supabase
        .from('deal_notes')
        .select('*')
        .eq('deal_id', dealId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDealNotes(data || []);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const addNote = async () => {
    if (!showNotesModal || !newNote.trim() || !userId) return;

    try {
      const { error } = await supabase
        .from('deal_notes')
        .insert([
          {
            user_id: userId,
            deal_id: showNotesModal,
            note_type: newNoteType,
            content: newNote,
          }
        ]);

      if (error) throw error;

      setNewNote('');
      setNewNoteType('conversation');
      await loadDealNotes(showNotesModal);
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note');
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!confirm('Delete this note?')) return;

    try {
      const { error } = await supabase
        .from('deal_notes')
        .delete()
        .eq('id', noteId);

      if (error) throw error;

      if (showNotesModal) {
        await loadDealNotes(showNotesModal);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    }
  };

  const openNotesModal = async (dealId: string) => {
    setShowNotesModal(dealId);
    await loadDealNotes(dealId);
  };

  const getDealsByStatus = (status: Deal['status']) => {
    return deals.filter(deal => deal.status === status);
  };

  const totalPipeline = deals.reduce((sum, deal) => sum + Number(deal.amount), 0);
  const closedValue = getDealsByStatus('closed').reduce((sum, deal) => sum + Number(deal.amount), 0);
  const paidValue = getDealsByStatus('paid').reduce((sum, deal) => sum + Number(deal.amount), 0);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <p className="text-text-secondary">Loading deals...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Deal Pipeline</h1>
          <p className="text-text-secondary">Track your brand deals from lead to payment</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-bg-secondary border border-border-color rounded-lg p-4">
            <p className="text-text-secondary text-sm">Total Pipeline</p>
            <p className="text-2xl font-bold text-text-primary mt-1">
              ${totalPipeline.toLocaleString()}
            </p>
          </div>
          <div className="bg-bg-secondary border border-border-color rounded-lg p-4">
            <p className="text-text-secondary text-sm">Total Deals</p>
            <p className="text-2xl font-bold text-text-primary mt-1">
              {deals.length}
            </p>
          </div>
          <div className="bg-bg-secondary border border-border-color rounded-lg p-4">
            <p className="text-text-secondary text-sm">Closed Value</p>
            <p className="text-2xl font-bold text-text-primary mt-1">
              ${closedValue.toLocaleString()}
            </p>
          </div>
          <div className="bg-bg-secondary border border-border-color rounded-lg p-4">
            <p className="text-text-secondary text-sm">Paid</p>
            <p className="text-2xl font-bold text-text-primary mt-1">
              ${paidValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Deal Pipeline - Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Lead Column */}
          <KanbanColumn
            title="Lead"
            count={getDealsByStatus('lead').length}
            color="bg-blue-500"
            deals={getDealsByStatus('lead')}
            onMove={moveDeal}
            onDelete={deleteDeal}
            onClick={openDealDetails}
          />

          {/* Negotiating Column */}
          <KanbanColumn
            title="Negotiating"
            count={getDealsByStatus('negotiating').length}
            color="bg-yellow-500"
            deals={getDealsByStatus('negotiating')}
            onMove={moveDeal}
            onDelete={deleteDeal}
            onClick={openDealDetails}
            onOpenNotes={openNotesModal}
          />

          {/* Closed Column */}
          <KanbanColumn
            title="Closed"
            count={getDealsByStatus('closed').length}
            color="bg-green-500"
            deals={getDealsByStatus('closed')}
            onMove={moveDeal}
            onDelete={deleteDeal}
            onClick={openDealDetails}
          />

          {/* Paid Column */}
          <KanbanColumn
            title="Paid"
            count={getDealsByStatus('paid').length}
            color="bg-purple-500"
            deals={getDealsByStatus('paid')}
            onMove={moveDeal}
            onDelete={deleteDeal}
            onClick={openDealDetails}
          />
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 right-6 rounded-full bg-brand-yellow w-14 h-14 flex items-center justify-center text-2xl font-bold text-black shadow-lg hover:opacity-90 transition-all transform hover:scale-110 z-40"
        title="Add New Deal"
      >
        +
      </button>

      {/* Add Deal Modal */}
      {isAddModalOpen && (
        <DealModal
          title="Add New Deal"
          brandName={brandName}
          value={value}
          deliverables={deliverables}
          deadline={deadline}
          notes={notes}
          onBrandNameChange={setBrandName}
          onValueChange={setValue}
          onDeliverablesChange={setDeliverables}
          onDeadlineChange={setDeadline}
          onNotesChange={setNotes}
          onSubmit={handleAddDeal}
          onClose={() => {
            setIsAddModalOpen(false);
            resetForm();
          }}
        />
      )}

      {/* Edit Deal Modal */}
      {selectedDeal && (
        <DealDetailsModal
          deal={selectedDeal}
          brandName={brandName}
          value={value}
          deliverables={deliverables}
          deadline={deadline}
          notes={notes}
          onBrandNameChange={setBrandName}
          onValueChange={setValue}
          onDeliverablesChange={setDeliverables}
          onDeadlineChange={setDeadline}
          onNotesChange={setNotes}
          onSubmit={handleEditDeal}
          onClose={() => {
            setSelectedDeal(null);
            resetForm();
          }}
          onDelete={() => deleteDeal(selectedDeal.id)}
        />
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <NotesModal
          dealNotes={dealNotes}
          newNote={newNote}
          newNoteType={newNoteType}
          onNewNoteChange={setNewNote}
          onNewNoteTypeChange={setNewNoteType}
          onAddNote={addNote}
          onDeleteNote={deleteNote}
          onClose={() => setShowNotesModal(false)}
        />
      )}
    </DashboardLayout>
  );
}

// Kanban Column Component
interface KanbanColumnProps {
  title: string;
  count: number;
  color: string;
  deals: Deal[];
  onMove: (id: string, status: Deal['status']) => void;
  onDelete: (id: string) => void;
  onClick: (deal: Deal) => void;
  onOpenNotes?: (dealId: string) => void;
}

function KanbanColumn({ 
  title, 
  count, 
  color, 
  deals, 
  onMove, 
  onDelete, 
  onClick,
  onOpenNotes 
}: KanbanColumnProps) {
  return (
    <div className="bg-bg-secondary border border-border-color rounded-lg p-4">
      <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color}`}></span>
        {title} ({count})
      </h3>
      <div className="space-y-3">
        {deals.length === 0 ? (
          <p className="text-center py-8 text-text-tertiary text-sm">No deals yet</p>
        ) : (
          deals.map(deal => (
            <DealCard
              key={deal.id}
              deal={deal}
              onMove={onMove}
              onDelete={onDelete}
              onClick={onClick}
              onOpenNotes={onOpenNotes}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Deal Card Component
interface DealCardProps {
  deal: Deal;
  onMove: (id: string, status: Deal['status']) => void;
  onDelete: (id: string) => void;
  onClick: (deal: Deal) => void;
  onOpenNotes?: (dealId: string) => void;
}

function DealCard({ deal, onMove, onDelete, onClick, onOpenNotes }: DealCardProps) {
  const getNextStatus = (): Deal['status'] | null => {
    switch (deal.status) {
      case 'lead': return 'negotiating';
      case 'negotiating': return 'closed';
      case 'closed': return 'paid';
      case 'paid': return null;
    }
  };

  const getNextStatusLabel = (): string => {
    switch (deal.status) {
      case 'lead': return 'Start Negotiating';
      case 'negotiating': return 'Mark as Closed';
      case 'closed': return 'Mark as Paid';
      case 'paid': return 'Completed';
    }
  };

  const nextStatus = getNextStatus();

  return (
    <div
      className="rounded-lg bg-bg-tertiary p-4 border border-border-color hover:border-brand-yellow transition-colors cursor-pointer"
      onClick={() => onClick(deal)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-text-primary text-sm">{deal.brand_name}</h4>
          <p className="text-brand-yellow font-medium text-lg mt-1">
            ${Number(deal.amount).toLocaleString()}
          </p>
        </div>
      </div>

      {deal.deliverables && (
        <p className="text-xs text-text-secondary mt-2">{deal.deliverables}</p>
      )}
      {deal.deadline && (
        <p className="text-xs text-text-tertiary mt-1">
          Due: {new Date(deal.deadline).toLocaleDateString()}
        </p>
      )}

      {/* Notes button for Negotiating stage */}
      {deal.status === 'negotiating' && onOpenNotes && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenNotes(deal.id);
          }}
          className="mt-3 w-full text-xs py-2 rounded bg-brand-pink/20 hover:bg-brand-pink/30 text-brand-pink transition-colors border border-brand-pink/30"
        >
          💬 View Notes
        </button>
      )}

      {/* Move to next status button */}
      {nextStatus && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMove(deal.id, nextStatus);
          }}
          className="mt-3 w-full text-xs py-2 rounded bg-bg-secondary hover:bg-border-color text-text-primary transition-colors border border-border-color"
        >
          {getNextStatusLabel()} →
        </button>
      )}
    </div>
  );
}

// Deal Modal Component
interface DealModalProps {
  title: string;
  brandName: string;
  value: string;
  deliverables: string;
  deadline: string;
  notes: string;
  onBrandNameChange: (v: string) => void;
  onValueChange: (v: string) => void;
  onDeliverablesChange: (v: string) => void;
  onDeadlineChange: (v: string) => void;
  onNotesChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

function DealModal({
  title,
  brandName,
  value,
  deliverables,
  deadline,
  notes,
  onBrandNameChange,
  onValueChange,
  onDeliverablesChange,
  onDeadlineChange,
  onNotesChange,
  onSubmit,
  onClose,
}: DealModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-bg-secondary rounded-lg p-6 max-w-md w-full border border-border-color"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-brand-yellow">{title}</h3>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Brand Name *"
            type="text"
            value={brandName}
            onChange={(e) => onBrandNameChange(e.target.value)}
            placeholder="e.g., Nike, Adidas"
            required
          />

          <Input
            label="Deal Value ($) *"
            type="number"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="5000"
            required
          />

          <Input
            label="Deliverables"
            type="text"
            value={deliverables}
            onChange={(e) => onDeliverablesChange(e.target.value)}
            placeholder="3 Instagram posts, 2 stories"
          />

          <Input
            label="Deadline"
            type="date"
            value={deadline}
            onChange={(e) => onDeadlineChange(e.target.value)}
          />

          <Textarea
            label="Notes"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Any additional details..."
            rows={3}
          />

          <Button type="submit" variant="primary" className="w-full">
            {title}
          </Button>
        </form>
      </div>
    </div>
  );
}

// Deal Details Modal Component
interface DealDetailsModalProps {
  deal: Deal;
  brandName: string;
  value: string;
  deliverables: string;
  deadline: string;
  notes: string;
  onBrandNameChange: (v: string) => void;
  onValueChange: (v: string) => void;
  onDeliverablesChange: (v: string) => void;
  onDeadlineChange: (v: string) => void;
  onNotesChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  onDelete: () => void;
}

function DealDetailsModal({
  deal,
  brandName,
  value,
  deliverables,
  deadline,
  notes,
  onBrandNameChange,
  onValueChange,
  onDeliverablesChange,
  onDeadlineChange,
  onNotesChange,
  onSubmit,
  onClose,
  onDelete,
}: DealDetailsModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-bg-secondary rounded-lg p-6 max-w-md w-full border border-border-color max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-brand-yellow">Edit Deal</h3>
            <p className="text-xs text-text-tertiary mt-1">
              Created: {new Date(deal.created_at).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Brand Name *"
            type="text"
            value={brandName}
            onChange={(e) => onBrandNameChange(e.target.value)}
            placeholder="e.g., Nike, Adidas"
            required
          />

          <Input
            label="Deal Value ($) *"
            type="number"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="5000"
            required
          />

          <Input
            label="Deliverables"
            type="text"
            value={deliverables}
            onChange={(e) => onDeliverablesChange(e.target.value)}
            placeholder="3 Instagram posts, 2 stories"
          />

          <Input
            label="Deadline"
            type="date"
            value={deadline}
            onChange={(e) => onDeadlineChange(e.target.value)}
          />

          <Textarea
            label="Notes"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Any additional details..."
            rows={3}
          />

          <div className="flex gap-3">
            <Button type="submit" variant="primary" className="flex-1">
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={onDelete}
              variant="secondary"
              className="bg-red-600 hover:bg-red-700 text-white border-red-600"
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Notes Modal Component
interface NotesModalProps {
  dealNotes: NegotiationNote[];
  newNote: string;
  newNoteType: NegotiationNote['note_type'];
  onNewNoteChange: (v: string) => void;
  onNewNoteTypeChange: (v: NegotiationNote['note_type']) => void;
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  onClose: () => void;
}

function NotesModal({
  dealNotes,
  newNote,
  newNoteType,
  onNewNoteChange,
  onNewNoteTypeChange,
  onAddNote,
  onDeleteNote,
  onClose,
}: NotesModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-bg-secondary rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border-color"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-brand-yellow">Negotiation Notes</h3>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        {/* Add Note Section */}
        <div className="bg-bg-tertiary p-4 rounded-lg border border-border-color mb-6">
          <h4 className="text-sm font-semibold text-text-primary mb-3">Add New Note</h4>

          <div className="mb-3">
            <label className="block text-xs font-medium text-text-secondary mb-2">
              Note Type
            </label>
            <select
              value={newNoteType}
              onChange={(e) => onNewNoteTypeChange(e.target.value as NegotiationNote['note_type'])}
              className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            >
              <option value="conversation">💬 Conversation</option>
              <option value="action_item">✓ Action Item</option>
              <option value="rate_change">💰 Rate Change</option>
              <option value="contact">👤 Contact Info</option>
              <option value="decision">⚡ Decision</option>
            </select>
          </div>

          <textarea
            value={newNote}
            onChange={(e) => onNewNoteChange(e.target.value)}
            placeholder="Type your note here..."
            rows={3}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary placeholder-text-tertiary text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow mb-3 resize-none"
          />

          <Button
            onClick={onAddNote}
            disabled={!newNote.trim()}
            variant="primary"
            className="w-full"
          >
            Add Note
          </Button>
        </div>

        {/* Notes Timeline */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-text-primary mb-3">Timeline</h4>

          {dealNotes.length === 0 ? (
            <p className="text-center py-8 text-text-tertiary text-sm">
              No notes yet. Add your first note above!
            </p>
          ) : (
            dealNotes.map(note => (
              <div key={note.id} className="bg-bg-tertiary p-4 rounded-lg border border-border-color">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      note.note_type === 'conversation' ? 'bg-blue-500/20 text-blue-400' :
                      note.note_type === 'action_item' ? 'bg-green-500/20 text-green-400' :
                      note.note_type === 'rate_change' ? 'bg-yellow-500/20 text-yellow-400' :
                      note.note_type === 'contact' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {note.note_type === 'conversation' && '💬 Conversation'}
                      {note.note_type === 'action_item' && '✓ Action Item'}
                      {note.note_type === 'rate_change' && '💰 Rate Change'}
                      {note.note_type === 'contact' && '👤 Contact'}
                      {note.note_type === 'decision' && '⚡ Decision'}
                    </span>
                    <span className="text-xs text-text-tertiary">
                      {new Date(note.created_at).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="text-text-tertiary hover:text-red-400 text-xs"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-text-secondary whitespace-pre-wrap">{note.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}