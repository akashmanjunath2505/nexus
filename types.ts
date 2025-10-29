export interface Phenomarker {
  symptom: string;
  intensity: number;
  quality: string;
  location: string;
  radiation: string;
  onset: string;
  progression: string;
}

export interface BiometricStream {
  name: string;
  value: string;
  fidelity: number;
  deviation: number;
  trend: string;
}

export interface MultiModalData {
  chestXray?: { image: string; findings: string };
  ekg?: { image: string; findings: string };
  labResults?: { fileName: string; findings: string };
}


export interface ClinicalCase {
  summary: string;
  phenomarkers: Phenomarker[];
  biometrics: BiometricStream[];
  multiModalData?: MultiModalData;
}

export interface Stratum1Data {
    topDiagnosis: string;
    confidenceScore: number;
    urgency: {
        level: string;
        quotient: number;
    };
    recommendedAction: string;
    keyRisk: string;
    reasoningCoherence: number;
}


export interface SyndromeNode {
  name: string;
  coherence: number;
  pathognomonic: boolean;
  exclusion: boolean;
}

export interface Stratum2Data {
  syndromeNodes: SyndromeNode[];
  phenoclusterMap: {
    gravity: string;
    density: number;
  };
  divergenceSignals: {
    finding: string;
    index: number;
    severity: string;
  }[];
  pathwayIlluminators: {
    system: string;
    activation: number;
  }[];
  crosstalkIndex: number;
}

export interface EtiologyCandidate {
  name: string;
  rank: number;
  mustNotMiss: boolean;
  treatmentUrgency: string;
  preTestLikelihood: number;
  postTestBelief: number;
  confidenceInterval: [number, number];
  supportingAnchors: { name: string; strength: number; type: string }[];
  refutingAnchors: { name: string; strength: number; type: string }[];
}

export interface Stratum3Data {
  etiologyCandidates: EtiologyCandidate[];
  recommendedTest: {
    name: string;
    potency: number;
    informationGain: number;
    rationale: string;
  };
}

export interface InterventionVector {
    name: string;
    utility: number;
    nnt: number;
    therapeuticIndex: number;
    riskHarmIndex: number;
    benefitMagnitude: number;
}

export interface Stratum4Data {
    interventionVectors: InterventionVector[];
    urgency: {
        quotient: number;
        window: string;
        velocity: string;
    };
    decisionRationale: string;
    regretMinimizationRationale: string;
}

export interface SuspectedBias {
    type: string;
    rationale: string;
}

export interface Stratum5Data {
    reasoningCoherence: number;
    biasRisk: {
        score: number;
        suspectedBiases: SuspectedBias[];
    };
    contraPulse: string;
    agnosiaAlert: string | null;
    bayesLoomSummary: string;
    closureFriction: number;
}

export interface Stratum6Data {
    pathomechWeave: {
        phenocluster: string;
        mechanism: string;
        tension: number;
    }[];
    crosstalkTensor: string;
    mechanismAnchors: {
        name: string;
        specificity: string;
    }[];
}

export interface Stratum7Data {
    kairosWindow: string;
    regretSurface: {
        act: string;
        notAct: string;
    };
    hingeThresholds: string;
}

export interface DeltaCalibrationUpdate {
  targetDemographic: string;
  priorAdjustment: string;
  rationale: string;
}

export interface DriftSentinelAlert {
  source: string;
  anomaly: string;
  confidence: number;
  recommendation: string;
}

export interface Stratum8Data {
    evidentiaGraphSummary: string;
    deltaCalibrationUpdate: DeltaCalibrationUpdate;
    guardrailsCharterCheck: string;
    driftSentinelAlert: DriftSentinelAlert | null;
}

export interface Stratum9Data {
  immediateActions: string[];
  monitoringParameters: {
    parameter: string;
    frequency: string;
    alertThreshold: string;
  }[];
  escalationTriggers: string[];
  contingencyPlans: {
    ifCondition: string;
    thenAction: string;
  }[];
}


export interface NexusAnalysis {
  stratum1: Stratum1Data;
  stratum2: Stratum2Data;
  stratum3: Stratum3Data;
  stratum4: Stratum4Data;
  stratum5: Stratum5Data;
  stratum6: Stratum6Data;
  stratum7: Stratum7Data;
  stratum8: Stratum8Data;
  stratum9: Stratum9Data;
}

// --- BENCHMARK TYPES ---

export interface BenchmarkTestCase {
  id: string;
  caseSummary: string;
  goldStandard: {
    topDiagnosis: string;
  };
  tags: ('diagnosis' | 'medical_qa' | 'robustness_check')[];
}

export interface TestCaseResult {
  testCase: BenchmarkTestCase;
  modelOutput: NexusAnalysis;
  latency: number;
  isCorrect: boolean;
  topDiagnosis: string;
  reasoningScore: number;
  hallucinationCheck: boolean; // true if pass, false if fail
  biasScore: number;
}

export interface ModelBenchmarkResults {
  modelName: string;
  summary: {
    accuracy: number;
    avgLatency: number;
    safetyScore: number;
    cost: number;
    accuracyByCategory: { [key: string]: number };
    avgReasoningScore: number;
  };
  detailedResults: TestCaseResult[];
}