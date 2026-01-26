import { NegotiationInput, ResponseOption, StrategyType } from './types';
import { EMAIL_TEMPLATES, getMatchingTemplates } from './templates';
import { calculateCompromiseRate, formatCurrency } from './calculations';

// Personalize a template with actual user data
function personalizeTemplate(template: string, input: NegotiationInput, compromiseRate?: number): string {
  let personalized = template;
  
  // Replace all variables
  personalized = personalized.replace(/\{\{brandName\}\}/g, input.brandName || '[Brand name]');
  personalized = personalized.replace(/\{\{creatorName\}\}/g, input.creatorName || '[Your name]');
  personalized = personalized.replace(/\{\{fairRate\}\}/g, formatCurrency(input.fairRate));
  personalized = personalized.replace(/\{\{brandOffer\}\}/g, formatCurrency(input.brandOffer));
  personalized = personalized.replace(/\{\{deliverables\}\}/g, input.deliverables);
  personalized = personalized.replace(/\{\{usageRights\}\}/g, input.usageRights);
  personalized = personalized.replace(/\{\{exclusivity\}\}/g, input.exclusivity);
  
  const gap = input.fairRate - input.brandOffer;
  const gapPercent = Math.round((gap / input.fairRate) * 100);
  personalized = personalized.replace(/\{\{gap\}\}/g, formatCurrency(gap));
  personalized = personalized.replace(/\{\{gapPercent\}\}/g, `${gapPercent}`);
  
  // Replace compromise rate placeholder
  if (compromiseRate) {
    personalized = personalized.replace(/\[COMPROMISE_RATE\]/g, formatCurrency(compromiseRate));
  }
  
  return personalized;
}

// Generate 3 response options based on user input
export function generateResponseOptions(input: NegotiationInput): ResponseOption[] {
  const strategies: StrategyType[] = ['firm', 'scope', 'compromise'];
  const options: ResponseOption[] = [];
  
  const compromiseRate = calculateCompromiseRate(input.fairRate, input.brandOffer);
  
  for (const strategy of strategies) {
    // Find matching templates
    const matchingTemplates = getMatchingTemplates(
      input.objectionType,
      input.stage,
      strategy
    );
    
    // Pick the first matching template (they're ordered by priority)
    const template = matchingTemplates[0];
    
    if (template) {
      options.push({
        strategy: template.strategy,
        title: getOptionTitle(template.strategy),
        subtitle: getOptionSubtitle(template.strategy),
        email: {
          subject: personalizeTemplate(template.subject, input, compromiseRate),
          body: personalizeTemplate(template.body, input, compromiseRate)
        },
        whenToUse: template.whenToUse,
        pros: template.pros,
        cons: template.cons
      });
    } else {
      // Fallback if no template found (shouldn't happen with good coverage)
      options.push(getFallbackOption(strategy, input, compromiseRate));
    }
  }
  
  return options;
}

// Get user-friendly titles for each strategy
function getOptionTitle(strategy: StrategyType): string {
  switch (strategy) {
    case 'firm':
      return 'Option A: Stand Your Ground';
    case 'scope':
      return 'Option B: Adjust Scope';
    case 'compromise':
      return 'Option C: Meet in Middle';
  }
}

function getOptionSubtitle(strategy: StrategyType): string {
  switch (strategy) {
    case 'firm':
      return 'Maintain your rate professionally';
    case 'scope':
      return 'Keep rate, adjust deliverables';
    case 'compromise':
      return 'Show flexibility, close the deal';
  }
}

// Fallback options if no template matches
function getFallbackOption(
  strategy: StrategyType,
  input: NegotiationInput,
  compromiseRate: number
): ResponseOption {
  const fallbackTemplates = {
    firm: EMAIL_TEMPLATES.find(t => t.id === 'budget-firm-1')!,
    scope: EMAIL_TEMPLATES.find(t => t.id === 'budget-scope-1')!,
    compromise: EMAIL_TEMPLATES.find(t => t.id === 'budget-compromise-1')!,
  };
  
  const template = fallbackTemplates[strategy];
  
  return {
    strategy,
    title: getOptionTitle(strategy),
    subtitle: getOptionSubtitle(strategy),
    email: {
      subject: personalizeTemplate(template.subject, input, compromiseRate),
      body: personalizeTemplate(template.body, input, compromiseRate)
    },
    whenToUse: template.whenToUse,
    pros: template.pros,
    cons: template.cons
  };
}