'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Loading } from '@/components/ui/Loading';
import { createClient } from '@/lib/supabase/client';
import { 
  Briefcase, 
  DollarSign, 
  Plus,
  Calendar,
  Trash2,
  MessageSquare,
  X
} from 'lucide-react';

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
        const { data, error } = await supabase
          .from('deals')
          .select('*')
          .order('created_at', { ascending: false });
    
        if (error) throw error;
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
              deal_name: `${brandName} - ${deliverables || 'Deal'}`,
              amount: parseFloat(value),
              status: 'lead',
              deliverables: deliverables || null,
              deadline: deadline || null,
              notes: notes || null,
            }
          ])
          .select();
    
        if (error) throw error;
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
    
    if (isLoading) {
      return (
        <DashboardLayout>
          <div className="flex items-center justify-center py-12">
            <Loading text="Loading deals..." />
          </div>
        </DashboardLayout>
      );
    }
    
    const totalPipeline = deals.reduce((sum, deal) => sum + Number(deal.amount), 0);
    const closedValue = getDealsByStatus('closed').reduce((sum, deal) => sum + Number(deal.amount), 0);
    const paidValue = getDealsByStatus('paid').reduce((sum, deal) => sum + Number(deal.amount), 0);
    
    return (
        <DashboardLayout>
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Deal Pipeline</h1>
                <p className="text-[var(--color-text-secondary)]">Track your brand deals from lead to payment</p>
              </div>
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                leftIcon={<Plus className="w-5 h-5" />}
              >
                New Deal
              </Button>
            </div>
    
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[var(--color-text-secondary)] text-sm">Total Pipeline</p>
                    <DollarSign className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                    ${totalPipeline.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
    
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[var(--color-text-secondary)] text-sm">Total Deals</p>
                    <Briefcase className="w-5 h-5 text-brand-pink" />
                  </div>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {deals.length}
                  </p>
                </CardContent>
              </Card>
    
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[var(--color-text-secondary)] text-sm">Closed Value</p>
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                    ${closedValue.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
    
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[var(--color-text-secondary)] text-sm">Paid</p>
                    <DollarSign className="w-5 h-5 text-brand-blue" />
                  </div>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                    ${paidValue.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>
    
            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <KanbanColumn
                title="Lead"
                count={getDealsByStatus('lead').length}
                color="bg-blue-500"
                deals={getDealsByStatus('lead')}
                onMove={moveDeal}
                onDelete={deleteDeal}
                onClick={openDealDetails}
              />
    
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
    
              <KanbanColumn
                title="Closed"
                count={getDealsByStatus('closed').length}
                color="bg-green-500"
                deals={getDealsByStatus('closed')}
                onMove={moveDeal}
                onDelete={deleteDeal}
                onClick={openDealDetails}
              />
    
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
    
          {/* Modals */}
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
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${color}`}></span>
                <CardTitle className="text-base">{title}</CardTitle>
                <Badge variant="default" size="sm">{count}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deals.length === 0 ? (
                  <EmptyState
                    icon={<Briefcase className="w-8 h-8" />}
                    title="No deals yet"
                    description="Deals will appear here"
                  />
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
            </CardContent>
          </Card>
        );
      }

        interface DealCardProps {
            deal: Deal;
            onMove: (id: string, status: Deal['status']) => void;
            onDelete: (id: string) => void;
            onClick: (deal: Deal) => void;
            onOpenNotes?: (dealId: string) => void;
          }
          
          function DealCard({ deal, onMove, onClick, onOpenNotes }: DealCardProps) {
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
              <Card interactive onClick={() => onClick(deal)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-[var(--color-text-primary)] text-sm">{deal.brand_name}</h4>
                      <p className="text-brand-yellow font-medium text-lg mt-1">
                        ${Number(deal.amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
          
                  {deal.deliverables && (
                    <p className="text-xs text-[var(--color-text-secondary)] mt-2">{deal.deliverables}</p>
                  )}
                  
                  {deal.deadline && (
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] mt-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(deal.deadline).toLocaleDateString()}
                    </div>
                  )}
          
                  {deal.status === 'negotiating' && onOpenNotes && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenNotes(deal.id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3"
                      leftIcon={<MessageSquare className="w-4 h-4" />}
                    >
                      View Notes
                    </Button>
                  )}
          
                  {nextStatus && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMove(deal.id, nextStatus);
                      }}
                      variant="secondary"
                      size="sm"
                      className="w-full mt-2"
                    >
                      {getNextStatusLabel()} →
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          }
          

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
                  className="bg-[var(--color-bg-secondary)] rounded-xl p-6 max-w-md w-full border border-[var(--color-border)] max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-brand-yellow">{title}</h3>
                    <button
                      onClick={onClose}
                      className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
          
                  <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                      label="Brand Name"
                      type="text"
                      value={brandName}
                      onChange={(e) => onBrandNameChange(e.target.value)}
                      placeholder="e.g., Nike, Adidas"
                      required
                    />
          
                    <Input
                      label="Deal Value ($)"
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
                  className="bg-[var(--color-bg-secondary)] rounded-xl p-6 max-w-md w-full border border-[var(--color-border)] max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-brand-yellow">Edit Deal</h3>
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                        Created: {new Date(deal.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
          
                  <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                      label="Brand Name"
                      type="text"
                      value={brandName}
                      onChange={(e) => onBrandNameChange(e.target.value)}
                      placeholder="e.g., Nike, Adidas"
                      required
                    />
          
                    <Input
                      label="Deal Value ($)"
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
                        className="px-4"
                        leftIcon={<Trash2 className="w-4 h-4" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            );
          }
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
                  className="bg-[var(--color-bg-secondary)] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[var(--color-border)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-brand-yellow">Negotiation Notes</h3>
                    <button
                      onClick={onClose}
                      className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
          
                  {/* Add Note Section */}
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Add New Note</h4>
          
                      <div className="mb-3">
                        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">
                          Note Type
                        </label>
                        <select
                          value={newNoteType}
                          onChange={(e) => onNewNoteTypeChange(e.target.value as NegotiationNote['note_type'])}
                          className="w-full px-3 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                        >
                          <option value="conversation">💬 Conversation</option>
                          <option value="action_item">✓ Action Item</option>
                          <option value="rate_change">💰 Rate Change</option>
                          <option value="contact">👤 Contact Info</option>
                          <option value="decision">⚡ Decision</option>
                        </select>
                      </div>
          
                      <Textarea
                        value={newNote}
                        onChange={(e) => onNewNoteChange(e.target.value)}
                        placeholder="Type your note here..."
                        rows={3}
                        className="mb-3"
                      />
          
                      <Button
                        onClick={onAddNote}
                        disabled={!newNote.trim()}
                        variant="primary"
                        className="w-full"
                      >
                        Add Note
                      </Button>
                    </CardContent>
                  </Card>
          
                  {/* Notes Timeline */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Timeline</h4>
          
                    {dealNotes.length === 0 ? (
                      <EmptyState
                        icon={<MessageSquare className="w-8 h-8" />}
                        title="No notes yet"
                        description="Add your first note above!"
                      />
                    ) : (
                      dealNotes.map(note => (
                        <Card key={note.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={
                                    note.note_type === 'conversation' ? 'info' :
                                    note.note_type === 'action_item' ? 'success' :
                                    note.note_type === 'rate_change' ? 'warning' :
                                    note.note_type === 'contact' ? 'brand' :
                                    'error'
                                  }
                                  size="sm"
                                >
                                  {note.note_type === 'conversation' && '💬 Conversation'}
                                  {note.note_type === 'action_item' && '✓ Action Item'}
                                  {note.note_type === 'rate_change' && '💰 Rate Change'}
                                  {note.note_type === 'contact' && '👤 Contact'}
                                  {note.note_type === 'decision' && '⚡ Decision'}
                                </Badge>
                                <span className="text-xs text-[var(--color-text-tertiary)]">
                                  {new Date(note.created_at).toLocaleString()}
                                </span>
                              </div>
                              <button
                                onClick={() => onDeleteNote(note.id)}
                                className="text-[var(--color-text-tertiary)] hover:text-error text-xs"
                              >
                                Delete
                              </button>
                            </div>
                            <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap">{note.content}</p>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          } 