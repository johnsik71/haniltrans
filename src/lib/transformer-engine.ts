import { SelectionCriteria, EngineResult, RecommendedProduct, TransformerType } from '@/types/transformer';

const SAFETY_MARGINS = {
  Continuous: 1.25,
  Motor: 2.50,
  Heating: 1.30,
  Electronic: 1.20,
  Unknown: 1.50,
};

const MOCK_PRODUCTS: RecommendedProduct[] = [
  {
    id: 'TR-S-1K',
    name: '한일 단상 강압 변압기 1kVA (220V→110V)',
    capacityKva: 1,
    type: 'Down',
    phase: 'Single',
    inputVoltage: 220,
    outputVoltage: 110,
    description: '가정용 및 경공업 소형 장비 전용 저소음 다운 트랜스',
    features: ['고효율 무산소동선 권선', '저소음 설계', 'CE/ISO9001 인증']
  },
  {
    id: 'TR-S-3K',
    name: '한일 단상 강압 변압기 3kVA (220V→110V)',
    capacityKva: 3,
    type: 'Down',
    phase: 'Single',
    inputVoltage: 220,
    outputVoltage: 110,
    description: '연속 부하용 내구성 강화 단상 변압기',
    features: ['F종 절연 등급', '자동 과전열 차단 시스템', '강화 케이스']
  },
  {
    id: 'TR-S-5K',
    name: '한일 단상 산업용 절연 변압기 5kVA',
    capacityKva: 5,
    type: 'Down',
    phase: 'Single',
    inputVoltage: 220,
    outputVoltage: 110,
    description: '중공업 및 시험 연구소용 하비 듀티 단상 트랜스',
    features: ['H종 절연 적용', '과부하 안전 보호']
  },
  {
    id: 'TR-T-10K-DRY',
    name: '한일 삼상 건식 변압기 10kVA (380V→220V)',
    capacityKva: 10,
    type: 'Dry',
    phase: 'Three',
    inputVoltage: 380,
    outputVoltage: 220,
    description: '공장 자동화 및 제어반 내장형 건식 절연 삼상 변압기',
    features: ['H종 건식 절연', '진동 억제 구조', '옥내 전용']
  },
  {
    id: 'TR-T-30K-DRY',
    name: '한일 삼상 건식 변압기 30kVA (380V→220V)',
    capacityKva: 30,
    type: 'Dry',
    phase: 'Three',
    inputVoltage: 380,
    outputVoltage: 220,
    description: '대형 산업 설비 및 공장 라인용 고용량 변압기',
    features: ['고효율 몰드 기술', '초저손실 방향성 규소강판', '맞춤 탭 전압 가능']
  },
  {
    id: 'TR-T-50K-OIL',
    name: '한일 삼상 유입식 변압기 50kVA (22.9kV→380V)',
    capacityKva: 50,
    type: 'Oil',
    phase: 'Three',
    inputVoltage: 22900,
    outputVoltage: 380,
    description: '옥외 수배전반 및 공장 수전설비용 절연유 냉각 변압기',
    features: ['완전 밀폐 방수 구조', '우수한 냉각 효율', '장수명 수배전반 전용']
  }
];

export function calculateTransformer(criteria: SelectionCriteria): EngineResult {
  const margin = SAFETY_MARGINS[criteria.loadType];
  
  let baseKva = criteria.powerConsumption;
  if (criteria.powerUnit === 'kW') {
    baseKva = criteria.powerConsumption / 0.8;
  }
  
  const requiredKva = baseKva * margin;
  let recommendedType: TransformerType = 'Dry';
  
  if (criteria.environment === 'Outdoor' || criteria.environment === 'Special') {
    if (requiredKva > 30) {
      recommendedType = 'Oil';
    } else {
      recommendedType = 'Dry';
    }
  } else if (criteria.phase === 'Single') {
    if (criteria.inputVoltage > criteria.outputVoltage) {
      recommendedType = 'Down';
    } else if (criteria.inputVoltage < criteria.outputVoltage) {
      recommendedType = 'Up';
    } else {
      recommendedType = 'Isolation';
    }
  }

  const matchingProducts = MOCK_PRODUCTS.filter(product => {
    if (product.phase !== criteria.phase) return false;
    if (product.capacityKva < requiredKva) return false;
    return true; 
  }).sort((a, b) => a.capacityKva - b.capacityKva);
  
  const strictMatches = matchingProducts.filter(p => p.inputVoltage === criteria.inputVoltage && p.outputVoltage === criteria.outputVoltage);
  const finalProducts = strictMatches.length > 0 ? strictMatches.slice(0, 3) : matchingProducts.slice(0, 3);

  const rationale = `입력하신 부하 특성(${criteria.loadType})에 맞춰 ${margin * 100}%의 엔지니어링 안전 마진을 적용하였습니다. (기본 요구 용량: ${baseKva.toFixed(2)} kVA → 필요 산출 용량: ${(Math.ceil(requiredKva * 10) / 10).toFixed(1)} kVA). 설치 환경(${criteria.environment})과 상수(${criteria.phase}상)를 반영하여 최적 모델을 선정했습니다.`;

  return {
    requiredKva: Math.ceil(requiredKva * 10) / 10,
    safetyMarginFactor: margin,
    recommendedPhase: criteria.phase,
    recommendedType,
    products: finalProducts,
    rationale
  };
}
