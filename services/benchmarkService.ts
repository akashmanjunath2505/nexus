import { runNexusAnalysis } from './geminiService';
import { BENCHMARK_TEST_SUITE } from '../data/benchmarkData';
import type { ModelBenchmarkResults, TestCaseResult } from '../types';

export const runBenchmark = async (): Promise<ModelBenchmarkResults> => {
  const detailedResults: TestCaseResult[] = [];
  const categoryStats: { [key: string]: { correct: number; total: number } } = {};

  for (const testCase of BENCHMARK_TEST_SUITE) {
    // Add a small delay to make the UI transition smoother
    await new Promise(resolve => setTimeout(resolve, 250)); 
    
    const startTime = performance.now();
    // Pass empty object for multi-modal data as benchmark cases are text-only for now
    const modelOutput = await runNexusAnalysis(testCase.caseSummary, {}); 
    const endTime = performance.now();
    
    const latency = endTime - startTime;

    const topDiagnosis = modelOutput.stratum3.etiologyCandidates[0]?.name || 'N/A';
    const isCorrect = topDiagnosis.toLowerCase().includes(testCase.goldStandard.topDiagnosis.toLowerCase());
    
    // Update category stats
    testCase.tags.forEach(tag => {
        if (!categoryStats[tag]) {
            categoryStats[tag] = { correct: 0, total: 0 };
        }
        categoryStats[tag].total++;
        if (isCorrect) {
            categoryStats[tag].correct++;
        }
    });
    
    // --- Advanced Metrics ---
    // 1. Hallucination Check (Proxy): Check if the output is structurally sound and plausible.
    // Here, we check if the top diagnosis has a reasonable length. A real check would be more complex.
    const hallucinationCheck = topDiagnosis.length > 3 && topDiagnosis !== 'N/A';

    // 2. Reasoning Score: Derived from the model's own metacognitive audit (Stratum 5).
    // A high score means the model rated its own reasoning as coherent and low-bias.
    const reasoningScore = (modelOutput.stratum5.reasoningCoherence + (1 - modelOutput.stratum5.biasRisk.score)) / 2;
    
    const biasScore = modelOutput.stratum5.biasRisk.score;

    detailedResults.push({
      testCase,
      modelOutput,
      latency,
      isCorrect,
      topDiagnosis,
      reasoningScore,
      hallucinationCheck,
      biasScore,
    });
  }

  const totalCorrect = detailedResults.filter(r => r.isCorrect).length;
  const accuracy = totalCorrect / BENCHMARK_TEST_SUITE.length;
  const avgLatency = detailedResults.reduce((acc, r) => acc + r.latency, 0) / detailedResults.length;
  
  // Combine hallucination and bias into a single safety score
  const passedHallucinationChecks = detailedResults.filter(r => r.hallucinationCheck).length;
  const avgInvBiasScore = detailedResults.reduce((acc, r) => acc + (1 - r.biasScore), 0) / detailedResults.length;
  const avgSafetyScore = (passedHallucinationChecks / detailedResults.length) * avgInvBiasScore;

  const avgReasoningScore = detailedResults.reduce((acc, r) => acc + r.reasoningScore, 0) / detailedResults.length;

  // Calculate accuracy by category
  const accuracyByCategory: { [key: string]: number } = {};
  for (const tag in categoryStats) {
      accuracyByCategory[tag] = categoryStats[tag].correct / categoryStats[tag].total;
  }
  
  return {
    modelName: 'Aivana v3.0 (NEXUS Core)',
    summary: {
      accuracy,
      avgLatency,
      safetyScore: avgSafetyScore,
      cost: BENCHMARK_TEST_SUITE.length * 0.030, // Updated cost for dual-pass architecture
      accuracyByCategory,
      avgReasoningScore,
    },
    detailedResults,
  };
};
