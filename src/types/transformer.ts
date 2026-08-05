export type Purpose = 'Home' | 'Industrial' | 'Medical' | 'Laboratory' | 'Export' | 'Factory';
export type LoadType = 'Continuous' | 'Motor' | 'Heating' | 'Electronic' | 'Unknown';
export type Environment = 'Indoor' | 'Outdoor' | 'Special';
export type Phase = 'Single' | 'Three';
export type TransformerType = 'Dry' | 'Oil' | 'Down' | 'Up' | 'Isolation';

export interface SelectionCriteria {
  purpose: Purpose;
  inputVoltage: number;
  outputVoltage: number;
  powerConsumption: number; // in kW or kVA
  powerUnit: 'kW' | 'kVA';
  loadType: LoadType;
  environment: Environment;
  phase: Phase;
}

export interface RecommendedProduct {
  id: string;
  name: string;
  capacityKva: number;
  type: TransformerType;
  phase: Phase;
  inputVoltage: number;
  outputVoltage: number;
  description: string;
  features: string[];
  imageUrl?: string;
}

export interface EngineResult {
  requiredKva: number;
  safetyMarginFactor: number;
  recommendedPhase: Phase;
  recommendedType: TransformerType;
  products: RecommendedProduct[];
  rationale: string;
}

export interface QuoteForm {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  projectName: string;
  expectedQuantity: number;
  requiredDeliveryDate: string;
  notes: string;
}
