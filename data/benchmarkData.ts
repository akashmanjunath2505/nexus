import type { ModelBenchmarkResults } from '../types';

export const BENCHMARK_TEST_SUITE: ModelBenchmarkResults['detailedResults'][0]['testCase'][] = [
  {
    id: 'CASE001',
    caseSummary: '45-year-old male with a history of smoking presents with sudden onset crushing chest pain radiating to the left arm, diaphoresis, and shortness of breath. Symptoms began 2 hours ago.',
    goldStandard: { topDiagnosis: 'Acute Coronary Syndrome' },
    tags: ['diagnosis', 'robustness_check'],
  },
  {
    id: 'CASE002',
    caseSummary: '68-year-old female with atrial fibrillation, not on anticoagulation, presents with acute onset of right-sided weakness and aphasia.',
    goldStandard: { topDiagnosis: 'Ischemic Stroke' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE003',
    caseSummary: '30-year-old female presents with a 2-week history of fever, non-productive cough, and profound fatigue. Chest X-ray shows bilateral interstitial infiltrates.',
    goldStandard: { topDiagnosis: 'Atypical Pneumonia' },
    tags: ['diagnosis', 'medical_qa'],
  },
  {
    id: 'CASE004',
    caseSummary: '55-year-old male with a history of alcohol abuse presents with severe epigastric pain radiating to the back, nausea, and vomiting. Amylase and lipase are elevated.',
    goldStandard: { topDiagnosis: 'Acute Pancreatitis' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE005',
    caseSummary: 'A 22-year-old college student presents with a sore throat, fever, and fatigue for one week. On examination, there is pharyngeal exudate and posterior cervical lymphadenopathy.',
    goldStandard: { topDiagnosis: 'Infectious Mononucleosis' },
    tags: ['diagnosis', 'medical_qa'],
  },
  {
    id: 'CASE006',
    caseSummary: '72-year-old male presents with sudden onset of severe tearing chest pain that radiates to his back, between the shoulder blades. He has a history of uncontrolled hypertension. Blood pressure is 210/115 mmHg in the right arm and 160/90 mmHg in the left arm.',
    goldStandard: { topDiagnosis: 'Aortic Dissection' },
    tags: ['diagnosis', 'robustness_check'],
  },
  {
    id: 'CASE007',
    caseSummary: 'A 28-year-old woman presents with a 6-month history of migratory joint pain, a malar rash on her face that worsens with sun exposure, and fatigue. Lab tests show a positive ANA.',
    goldStandard: { topDiagnosis: 'Systemic Lupus Erythematosus' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE008',
    caseSummary: 'A clinician asks: "What are the indications for using metformin in a patient with prediabetes?"',
    goldStandard: { topDiagnosis: 'Metformin' }, // The model should identify the topic.
    tags: ['medical_qa'],
  },
  {
    id: 'CASE009',
    caseSummary: 'A 60-year-old patient with a history of COPD presents with worsening shortness of breath. Initial information suggests pneumonia, but the patient is afebrile and has a normal white blood cell count. They mention they recently started a new heart medication.',
    goldStandard: { topDiagnosis: 'COPD Exacerbation' }, // Correct answer requires ignoring misleading signals.
    tags: ['robustness_check'],
  },
  {
    id: 'CASE010',
    caseSummary: '35-year-old female presents to the ED after a syncopal episode. She reports feeling lightheaded and having palpitations. EKG shows a regular, narrow-complex tachycardia at 180 bpm.',
    goldStandard: { topDiagnosis: 'Supraventricular Tachycardia' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE011',
    caseSummary: 'A 50-year-old woman presents with pleuritic chest pain and shortness of breath. She has a history of recent long-haul flight. D-dimer is elevated. However, her chest CT angiogram is negative for pulmonary embolism. On further questioning, she mentions a history of shingles in the same area two years ago.',
    goldStandard: { topDiagnosis: 'Postherpetic Neuralgia' }, // A tricky case with a red herring (D-dimer).
    tags: ['diagnosis', 'robustness_check'],
  },
];


// --- SIMULATED RAW DATA FOR BASELINE MODELS ---

interface SimulatedTestCaseResult {
  isCorrect: boolean;
  latency: number;
  biasScore: number;
  reasoningCoherence: number;
  hallucinationCheck: boolean;
  tags: ('diagnosis' | 'medical_qa' | 'robustness_check')[];
}

const gpt4TurboRawResults: SimulatedTestCaseResult[] = [
  { isCorrect: true, latency: 3400, biasScore: 0.1, reasoningCoherence: 0.92, hallucinationCheck: true, tags: ['diagnosis', 'robustness_check'] },
  { isCorrect: true, latency: 3550, biasScore: 0.08, reasoningCoherence: 0.95, hallucinationCheck: true, tags: ['diagnosis'] },
  { isCorrect: true, latency: 3600, biasScore: 0.12, reasoningCoherence: 0.90, hallucinationCheck: true, tags: ['diagnosis', 'medical_qa'] },
  { isCorrect: true, latency: 3300, biasScore: 0.09, reasoningCoherence: 0.93, hallucinationCheck: true, tags: ['diagnosis'] },
  { isCorrect: true, latency: 3450, biasScore: 0.11, reasoningCoherence: 0.91, hallucinationCheck: true, tags: ['diagnosis', 'medical_qa'] },
  { isCorrect: true, latency: 3800, biasScore: 0.15, reasoningCoherence: 0.88, hallucinationCheck: true, tags: ['diagnosis', 'robustness_check'] },
  { isCorrect: false, latency: 4100, biasScore: 0.20, reasoningCoherence: 0.80, hallucinationCheck: true, tags: ['diagnosis'] }, // Fails complex autoimmune case
  { isCorrect: true, latency: 2900, biasScore: 0.05, reasoningCoherence: 0.98, hallucinationCheck: true, tags: ['medical_qa'] },
  { isCorrect: false, latency: 3900, biasScore: 0.25, reasoningCoherence: 0.75, hallucinationCheck: true, tags: ['robustness_check'] }, // Fails robustness check
  { isCorrect: true, latency: 3200, biasScore: 0.07, reasoningCoherence: 0.96, hallucinationCheck: true, tags: ['diagnosis'] },
  { isCorrect: false, latency: 4200, biasScore: 0.30, reasoningCoherence: 0.70, hallucinationCheck: true, tags: ['diagnosis', 'robustness_check'] }, // Falls for the red herring
];

const claude3OpusRawResults: SimulatedTestCaseResult[] = [
  { isCorrect: true, latency: 2700, biasScore: 0.08, reasoningCoherence: 0.90, hallucinationCheck: true, tags: ['diagnosis', 'robustness_check'] },
  { isCorrect: true, latency: 2850, biasScore: 0.06, reasoningCoherence: 0.92, hallucinationCheck: true, tags: ['diagnosis'] },
  { isCorrect: true, latency: 2900, biasScore: 0.10, reasoningCoherence: 0.88, hallucinationCheck: true, tags: ['diagnosis', 'medical_qa'] },
  { isCorrect: true, latency: 2600, biasScore: 0.07, reasoningCoherence: 0.91, hallucinationCheck: true, tags: ['diagnosis'] },
  { isCorrect: true, latency: 2750, biasScore: 0.09, reasoningCoherence: 0.89, hallucinationCheck: true, tags: ['diagnosis', 'medical_qa'] },
  { isCorrect: false, latency: 3100, biasScore: 0.18, reasoningCoherence: 0.78, hallucinationCheck: true, tags: ['diagnosis', 'robustness_check'] }, // Fails critical diagnosis
  { isCorrect: true, latency: 3300, biasScore: 0.15, reasoningCoherence: 0.85, hallucinationCheck: true, tags: ['diagnosis'] },
  { isCorrect: false, latency: 2400, biasScore: 0.12, reasoningCoherence: 0.82, hallucinationCheck: false, tags: ['medical_qa'] }, // Fails QA and hallucinates
  { isCorrect: false, latency: 3200, biasScore: 0.22, reasoningCoherence: 0.72, hallucinationCheck: true, tags: ['robustness_check'] }, // Fails robustness check
  { isCorrect: true, latency: 2500, biasScore: 0.05, reasoningCoherence: 0.94, hallucinationCheck: true, tags: ['diagnosis'] },
  { isCorrect: false, latency: 3400, biasScore: 0.28, reasoningCoherence: 0.68, hallucinationCheck: true, tags: ['diagnosis', 'robustness_check'] }, // Falls for the red herring
];

// --- DYNAMIC SUMMARY CALCULATION ---

const calculateSummaryMetrics = (results: SimulatedTestCaseResult[]): Omit<ModelBenchmarkResults['summary'], 'cost'> => {
  if (results.length === 0) {
    return { accuracy: 0, avgLatency: 0, safetyScore: 0, accuracyByCategory: {}, avgReasoningScore: 0 };
  }

  const totalCorrect = results.filter(r => r.isCorrect).length;
  const accuracy = totalCorrect / results.length;
  const avgLatency = results.reduce((acc, r) => acc + r.latency, 0) / results.length;
  
  const passedHallucinationChecks = results.filter(r => r.hallucinationCheck).length;
  const avgInvBiasScore = results.reduce((acc, r) => acc + (1 - r.biasScore), 0) / results.length;
  const safetyScore = (passedHallucinationChecks / results.length) * avgInvBiasScore;

  const avgReasoningScore = results.reduce((acc, r) => acc + ((r.reasoningCoherence + (1 - r.biasScore)) / 2), 0) / results.length;

  const categoryStats: { [key: string]: { correct: number; total: number } } = {};
  results.forEach(result => {
    result.tags.forEach(tag => {
      if (!categoryStats[tag]) {
        categoryStats[tag] = { correct: 0, total: 0 };
      }
      categoryStats[tag].total++;
      if (result.isCorrect) {
        categoryStats[tag].correct++;
      }
    });
  });

  const accuracyByCategory: { [key: string]: number } = {};
  for (const tag in categoryStats) {
      if (categoryStats[tag].total > 0) {
        accuracyByCategory[tag] = categoryStats[tag].correct / categoryStats[tag].total;
      }
  }

  return {
    accuracy,
    avgLatency,
    safetyScore,
    accuracyByCategory,
    avgReasoningScore,
  };
};


const gpt4Summary = calculateSummaryMetrics(gpt4TurboRawResults);
const claude3OpusSummary = calculateSummaryMetrics(claude3OpusRawResults);

export const BASELINE_MODELS_PERFORMANCE: Omit<ModelBenchmarkResults, 'detailedResults'>[] = [
    {
        modelName: 'GPT-4 Turbo (Baseline)',
        summary: {
            ...gpt4Summary,
            cost: 0.09,
        }
    },
    {
        modelName: 'Claude 3 Opus (Baseline)',
        summary: {
            ...claude3OpusSummary,
            cost: 0.07,
        }
    }
];