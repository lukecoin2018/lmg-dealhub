'use client';

import { useState } from 'react';
import { useContract } from '@/contexts/ContractContext';
import { CLAUSE_LIBRARY } from '@/data/clauseLibrary';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface ContractPreviewProps {
  onBack: () => void;
}

export default function ContractPreview({ onBack }: ContractPreviewProps) {
  const { contract, saveToDatabase } = useContract();
  const [saving, setSaving] = useState(false);
  const router = useRouter(); 

  // Get all selected sections with their clauses
  const contractSections = contract.clauses.map((clause: any) => {
    const section = CLAUSE_LIBRARY.find((s: any) => s.id === clause.sectionId);
    const variation = section?.variations.find((v: any) => v.id === clause.variationId);
    
    if (!section || !variation) return null;

    // Replace variables in legal text
    let processedText = variation.legalText;
    
    variation.variables.forEach((variable: any) => {
      const value = clause.variableValues[variable.id];
      const placeholder = `{{${variable.id}}}`;
      
      // Format the value based on type
      let formattedValue = value;
      if (variable.type === 'number' && variable.id.toLowerCase().includes('amount')) {
        formattedValue = `$${Number(value).toLocaleString()}`;
      } else if (variable.type === 'date') {
        formattedValue = new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      processedText = processedText.replace(new RegExp(placeholder, 'g'), formattedValue);
    });

    return {
      section,
      variation,
      processedText
    };
  }).filter(Boolean);

  const handleSaveContract = async () => {
    setSaving(true);
    try {
      // Save the contract
      await saveToDatabase();
      
      // Extract deal data from contract
      const partiesClause = contract.clauses.find((c: any) => c.sectionId === 'parties');
      const paymentClause = contract.clauses.find((c: any) => c.sectionId === 'payment');
      const deliverablesClause = contract.clauses.find((c: any) => c.sectionId === 'deliverables');
      
      const brandName = partiesClause?.variableValues?.brandName || 'Unknown Brand';
      const totalAmount = paymentClause?.variableValues?.totalAmount || 0;
      const deadline = deliverablesClause?.variableValues?.dueDate || null;
      
      // Build deliverables description
      const platform = deliverablesClause?.variableValues?.platform || '';
      const quantity = deliverablesClause?.variableValues?.quantity || '';
      const contentType = deliverablesClause?.variableValues?.contentType || '';
      const deliverables = `${quantity} ${platform} ${contentType}`.trim();
      
      // Get user ID
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Create deal automatically
      const { error: dealError } = await supabase.from('deals').insert({
        user_id: user.id,
        brand_name: brandName,
        deal_name: `${brandName} - ${deliverables || 'Deal'}`,
        amount: parseFloat(totalAmount.toString()),
        status: 'lead', // Contract created but not yet signed
        deliverables: deliverables || null,
        deadline: deadline || null,
        notes: 'Automatically created from signed contract',
      });
      
      if (dealError) {
        console.error('Error creating deal:', dealError);
        // Don't fail the whole operation if deal creation fails
      }
      
      alert('✅ Contract saved and deal created successfully!');
      // Redirect to deals page
    setTimeout(() => {
      router.push('/deals');
    }, 1000); // Wait 1 second so user sees the success message

    } catch (error) {
      console.error('Error saving contract:', error);
      alert('Failed to save contract. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    const { jsPDF } = require('jspdf');
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;
  
    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number = 11, isBold: boolean = false, align: 'left' | 'center' = 'left') => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      if (align === 'center') {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
          const textWidth = doc.getTextWidth(line);
          const xPosition = (pageWidth - textWidth) / 2;
          
          if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }
          
          doc.text(line, xPosition, yPosition);
          yPosition += fontSize * 0.5;
        });
      } else {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
          if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }
          
          doc.text(line, margin, yPosition);
          yPosition += fontSize * 0.5;
        });
      }
      
      yPosition += 3;
    };
  
    // Get parties info
    const partiesClause = contract.clauses.find((c: any) => c.sectionId === 'parties');
    const creatorName = partiesClause?.variableValues?.creatorName || '[Creator Name]';
    const brandName = partiesClause?.variableValues?.brandName || '[Brand Name]';
  
    // Title
    addText('INFLUENCER MARKETING AGREEMENT', 18, true, 'center');
    yPosition += 5;
    
    // Parties
    addText(`Between: ${creatorName} ("Creator")`, 10, false, 'center');
    addText(`And: ${brandName} ("Brand")`, 10, false, 'center');
    addText(`Effective Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 10, false, 'center');
    
    yPosition += 10;
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  
    // Contract sections
    contractSections.forEach((item: any) => {
      if (!item) return;
      const { section, processedText } = item;
      
      // Section title
      addText(`${section.order}. ${section.title.toUpperCase()}`, 14, true);
      yPosition += 2;
      
      // Section content
      addText(processedText, 11, false);
      yPosition += 5;
    });
  
    // General Provisions
    addText(`${contractSections.length + 1}. GENERAL PROVISIONS`, 14, true);
    yPosition += 2;
    
    addText('Governing Law: This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.', 11, false);
    yPosition += 3;
    
    addText('Entire Agreement: This Agreement constitutes the entire agreement between the parties and supersedes all prior understandings and agreements, whether written or oral, relating to the subject matter of this Agreement.', 11, false);
    yPosition += 3;
    
    addText('Amendments: This Agreement may only be amended or modified by a written agreement signed by both parties.', 11, false);
    yPosition += 3;
    
    addText('Severability: If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.', 11, false);
    yPosition += 3;
    
    addText('Counterparts: This Agreement may be executed in counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument.', 11, false);
    yPosition += 10;
  
    // Signature block
    if (yPosition > pageHeight - 80) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
    
    const creatorBusinessName = partiesClause?.variableValues?.creatorBusinessName;
    const brandContactName = partiesClause?.variableValues?.brandContactName;
    
    // Two column signature layout
    const colWidth = (pageWidth - (margin * 3)) / 2;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('CREATOR:', margin, yPosition);
    doc.text('BRAND:', margin + colWidth + margin, yPosition);
    
    yPosition += 15;
    doc.line(margin, yPosition, margin + colWidth - 10, yPosition);
    doc.line(margin + colWidth + margin, yPosition, pageWidth - margin, yPosition);
    
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(creatorName, margin, yPosition);
    doc.text(brandName, margin + colWidth + margin, yPosition);
    
    if (creatorBusinessName) {
      yPosition += 5;
      doc.setFontSize(9);
      doc.text(creatorBusinessName, margin, yPosition);
    }
    
    if (brandContactName) {
      doc.setFontSize(9);
      doc.text(brandContactName, margin + colWidth + margin, yPosition);
    }
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.text('Date: _________________', margin, yPosition);
    doc.text('Date: _________________', margin + colWidth + margin, yPosition);
  
    // Save the PDF
    const fileName = `${brandName.replace(/[^a-z0-9]/gi, '_')}_${creatorName.replace(/[^a-z0-9]/gi, '_')}_Contract.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">Preview Your Contract</h2>
        <p className="text-text-secondary">
          Review your contract before downloading. Make sure all details are correct.
        </p>
      </div>

      {/* Contract Document */}
      <div className="bg-white text-black p-12 rounded-lg shadow-2xl mb-8">
        {/* Contract Header */}
        <div className="text-center mb-12 border-b-2 border-gray-300 pb-8">
          <h1 className="text-3xl font-bold mb-4">INFLUENCER MARKETING AGREEMENT</h1>
          <div className="text-sm text-gray-600 space-y-1">
            {(() => {
              const partiesClause = contract.clauses.find((c: any) => c.sectionId === 'parties');
              const creatorName = partiesClause?.variableValues?.creatorName || '[Creator Name]';
              const brandName = partiesClause?.variableValues?.brandName || '[Brand Name]';
              
              return (
                <>
                  <p>Between: <span className="font-semibold">{creatorName}</span> ("Creator")</p>
                  <p>And: <span className="font-semibold">{brandName}</span> ("Brand")</p>
                </>
              );
            })()}
            <p className="mt-4">Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Contract Sections */}
        <div className="space-y-8">
        {contractSections.map((item: any) => {
            if (!item) return null;
            const { section, variation, processedText } = item;
            
            return (
              <div key={section.id} className="contract-section">
                <h2 className="text-xl font-bold mb-4 text-gray-900">
                  {section.order}. {section.title}
                </h2>
                <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {processedText}
                </div>
                
                {/* Red Flags Warning */}
                {variation.redFlags && variation.redFlags.length > 0 && (
                  <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500">
                    <p className="font-semibold text-red-800 mb-2">⚠️ Important Notice:</p>
                    <ul className="text-sm text-red-700 space-y-1">
                    {variation.redFlags.map((flag: any, idx: number) => (
                        <li key={idx}>• {flag.message}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

          {/* Standard Clauses */}
          <div className="contract-section">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {contractSections.length + 1}. General Provisions
            </h2>
            <div className="text-gray-800 leading-relaxed space-y-4">
              <p><strong>Governing Law:</strong> This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.</p>
              
              <p><strong>Entire Agreement:</strong> This Agreement constitutes the entire agreement between the parties and supersedes all prior understandings and agreements, whether written or oral, relating to the subject matter of this Agreement.</p>
              
              <p><strong>Amendments:</strong> This Agreement may only be amended or modified by a written agreement signed by both parties.</p>
              
              <p><strong>Severability:</strong> If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
              
              <p><strong>Counterparts:</strong> This Agreement may be executed in counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument.</p>
            </div>
          </div>

          {/* Signature Block */}
          <div className="mt-12 pt-8 border-t-2 border-gray-300">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="font-bold mb-8">CREATOR:</p>
                <div className="border-t border-gray-400 pt-2">
                  {(() => {
                    const partiesClause = contract.clauses.find((c: any) => c.sectionId === 'parties');
                    const creatorName = partiesClause?.variableValues?.creatorName || '[Creator Name]';
                    const creatorBusinessName = partiesClause?.variableValues?.creatorBusinessName;
                    
                    return (
                      <>
                        <p className="font-semibold">{creatorName}</p>
                        {creatorBusinessName && (
                          <p className="text-sm text-gray-600">{creatorBusinessName}</p>
                        )}
                      </>
                    );
                  })()}
                </div>
                <p className="text-sm text-gray-600 mt-4">Date: _________________</p>
              </div>

              <div>
                <p className="font-bold mb-8">BRAND:</p>
                <div className="border-t border-gray-400 pt-2">
                  {(() => {
                    const partiesClause = contract.clauses.find((c: any) => c.sectionId === 'parties');
                    const brandName = partiesClause?.variableValues?.brandName || '[Brand Name]';
                    const brandContactName = partiesClause?.variableValues?.brandContactName;
                    
                    return (
                      <>
                        <p className="font-semibold">{brandName}</p>
                        {brandContactName && (
                          <p className="text-sm text-gray-600">{brandContactName}</p>
                        )}
                      </>
                    );
                  })()}
                </div>
                <p className="text-sm text-gray-600 mt-4">Date: _________________</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-semibold border-2 border-border-color text-text-primary hover:border-brand-yellow transition-colors"
        >
          ← Back to Customize
        </button>

        <div className="flex gap-4">
          <Button
            onClick={handleSaveContract}
            disabled={saving}
            variant="secondary"
          >
            {saving ? 'Saving...' : '💾 Save Contract'}
          </Button>
          
          <Button
            onClick={handleDownloadPDF}
            variant="primary"
          >
            📥 Download PDF
          </Button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
        <p className="text-sm text-text-secondary">
          <strong className="text-yellow-400">⚠️ Legal Disclaimer:</strong> This contract template is provided for informational purposes only and does not constitute legal advice. We strongly recommend having this agreement reviewed by a qualified attorney before signing, especially for high-value partnerships or complex arrangements.
        </p>
      </div>
    </div>
  );
}// rebuild
