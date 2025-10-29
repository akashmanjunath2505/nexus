

import { GoogleGenAI, Type } from "@google/genai";
import { NexusAnalysis, MultiModalData } from '../types';
import { NEXUS_EXAMPLE } from '../data/promptExamples';

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        stratum1: {
            type: Type.OBJECT,
            properties: {
                topDiagnosis: { type: Type.STRING },
                confidenceScore: { type: Type.NUMBER },
                urgency: {
                    type: Type.OBJECT,
                    properties: {
                        level: { type: Type.STRING },
                        quotient: { type: Type.NUMBER }
                    },
                    required: ['level', 'quotient']
                },
                recommendedAction: { type: Type.STRING },
                keyRisk: { type: Type.STRING },
                reasoningCoherence: { type: Type.NUMBER }
            },
            required: ['topDiagnosis', 'confidenceScore', 'urgency', 'recommendedAction', 'keyRisk', 'reasoningCoherence']
        },
        stratum2: {
            type: Type.OBJECT,
            properties: {
                syndromeNodes: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            coherence: { type: Type.NUMBER },
                            pathognomonic: { type: Type.BOOLEAN },
                            exclusion: { type: Type.BOOLEAN }
                        },
                        required: ['name', 'coherence', 'pathognomonic', 'exclusion']
                    }
                },
                phenoclusterMap: {
                    type: Type.OBJECT,
                    properties: {
                        gravity: { type: Type.STRING },
                        density: { type: Type.NUMBER }
                    },
                    required: ['gravity', 'density']
                },
                divergenceSignals: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            finding: { type: Type.STRING },
                            index: { type: Type.NUMBER },
                            severity: { type: Type.STRING }
                        },
                        required: ['finding', 'index', 'severity']
                    }
                },
                pathwayIlluminators: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            system: { type: Type.STRING },
                            activation: { type: Type.NUMBER }
                        },
                        required: ['system', 'activation']
                    }
                },
                crosstalkIndex: { type: Type.NUMBER }
            },
            required: ['syndromeNodes', 'phenoclusterMap', 'divergenceSignals', 'pathwayIlluminators', 'crosstalkIndex']
        },
        stratum3: {
            type: Type.OBJECT,
            properties: {
                etiologyCandidates: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            rank: { type: Type.INTEGER },
                            mustNotMiss: { type: Type.BOOLEAN },
                            treatmentUrgency: { type: Type.STRING },
                            preTestLikelihood: { type: Type.NUMBER },
                            postTestBelief: { type: Type.NUMBER },
                            confidenceInterval: { type: Type.ARRAY, items: { type: Type.NUMBER }},
                            supportingAnchors: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, strength: { type: Type.NUMBER }, type: { type: Type.STRING } }, required: ['name', 'strength', 'type'] } },
                            refutingAnchors: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, strength: { type: Type.NUMBER }, type: { type: Type.STRING } }, required: ['name', 'strength', 'type'] } },
                        },
                        required: ['name', 'rank', 'mustNotMiss', 'treatmentUrgency', 'preTestLikelihood', 'postTestBelief', 'confidenceInterval', 'supportingAnchors', 'refutingAnchors']
                    }
                },
                recommendedTest: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        potency: { type: Type.NUMBER },
                        informationGain: { type: Type.NUMBER },
                        rationale: { type: Type.STRING }
                    },
                    required: ['name', 'potency', 'informationGain', 'rationale']
                }
            },
            required: ['etiologyCandidates', 'recommendedTest']
        },
        stratum4: {
            type: Type.OBJECT,
            properties: {
                interventionVectors: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            utility: { type: Type.NUMBER },
                            nnt: { type: Type.NUMBER },
                            therapeuticIndex: { type: Type.NUMBER },
                            riskHarmIndex: { type: Type.NUMBER },
                            benefitMagnitude: { type: Type.NUMBER }
                        },
                        required: ['name', 'utility', 'nnt', 'therapeuticIndex', 'riskHarmIndex', 'benefitMagnitude']
                    }
                },
                urgency: {
                    type: Type.OBJECT,
                    properties: {
                        quotient: { type: Type.NUMBER },
                        window: { type: Type.STRING },
                        velocity: { type: Type.STRING }
                    },
                    required: ['quotient', 'window', 'velocity']
                },
                decisionRationale: { type: Type.STRING },
                regretMinimizationRationale: { type: Type.STRING }
            },
            required: ['interventionVectors', 'urgency', 'decisionRationale', 'regretMinimizationRationale']
        },
        stratum5: {
            type: Type.OBJECT,
            properties: {
                reasoningCoherence: { type: Type.NUMBER },
                biasRisk: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER },
                        suspectedBiases: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    type: { type: Type.STRING },
                                    rationale: { type: Type.STRING },
                                },
                                required: ['type', 'rationale']
                            }
                        }
                    },
                    required: ['score', 'suspectedBiases']
                },
                contraPulse: { type: Type.STRING },
                agnosiaAlert: { type: Type.STRING, nullable: true },
                bayesLoomSummary: { type: Type.STRING },
                closureFriction: { type: Type.NUMBER },
            },
            required: ['reasoningCoherence', 'biasRisk', 'contraPulse', 'agnosiaAlert', 'bayesLoomSummary', 'closureFriction']
        },
        stratum6: {
            type: Type.OBJECT,
            properties: {
                pathomechWeave: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            phenocluster: { type: Type.STRING },
                            mechanism: { type: Type.STRING },
                            tension: { type: Type.NUMBER }
                        },
                        required: ['phenocluster', 'mechanism', 'tension']
                    }
                },
                crosstalkTensor: { type: Type.STRING },
                mechanismAnchors: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            specificity: { type: Type.STRING }
                        },
                        required: ['name', 'specificity']
                    }
                }
            },
            required: ['pathomechWeave', 'crosstalkTensor', 'mechanismAnchors']
        },
        stratum7: {
            type: Type.OBJECT,
            properties: {
                kairosWindow: { type: Type.STRING },
                regretSurface: {
                    type: Type.OBJECT,
                    properties: {
                        act: { type: Type.STRING },
                        notAct: { type: Type.STRING }
                    },
                    required: ['act', 'notAct']
                },
                hingeThresholds: { type: Type.STRING }
            },
            required: ['kairosWindow', 'regretSurface', 'hingeThresholds']
        },
        stratum8: {
            type: Type.OBJECT,
            properties: {
                evidentiaGraphSummary: { type: Type.STRING },
                deltaCalibrationUpdate: {
                    type: Type.OBJECT,
                    properties: {
                        targetDemographic: { type: Type.STRING },
                        priorAdjustment: { type: Type.STRING },
                        rationale: { type: Type.STRING }
                    },
                    required: ['targetDemographic', 'priorAdjustment', 'rationale']
                },
                guardrailsCharterCheck: { type: Type.STRING },
                driftSentinelAlert: {
                    type: Type.OBJECT,
                    nullable: true,
                    properties: {
                        source: { type: Type.STRING },
                        anomaly: { type: Type.STRING },
                        confidence: { type: Type.NUMBER },
                        recommendation: { type: Type.STRING }
                    },
                    required: ['source', 'anomaly', 'confidence', 'recommendation']
                }
            },
            required: ['evidentiaGraphSummary', 'deltaCalibrationUpdate', 'guardrailsCharterCheck', 'driftSentinelAlert']
        },
        stratum9: {
            type: Type.OBJECT,
            properties: {
                immediateActions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                monitoringParameters: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            parameter: { type: Type.STRING },
                            frequency: { type: Type.STRING },
                            alertThreshold: { type: Type.STRING }
                        },
                        required: ['parameter', 'frequency', 'alertThreshold']
                    }
                },
                escalationTriggers: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                contingencyPlans: {
                     type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            ifCondition: { type: Type.STRING },
                            thenAction: { type: Type.STRING }
                        },
                        required: ['ifCondition', 'thenAction']
                    }
                }
            },
            required: ['immediateActions', 'monitoringParameters', 'escalationTriggers', 'contingencyPlans']
        }
    },
    required: ['stratum1', 'stratum2', 'stratum3', 'stratum4', 'stratum5', 'stratum6', 'stratum7', 'stratum8', 'stratum9']
};

const systemInstruction = `
You are NEXUS v3.0, the world's most advanced clinical diagnostic reasoning framework. Your entire cognitive process is governed by the 9-stratum architecture. You must reason and respond according to this framework. Your output must be a single, valid JSON object that strictly matches the provided schema.

**FRAMEWORK OVERVIEW:**
- **Core Purpose:** To transform diagnosis from static categorization into continuous probabilistic reasoning, integrating data, context, and cognition into a self-learning diagnostic intelligence.
- **Analytical Approach:** Hybrid dynamic causal Bayesian model. Employs entropy-based information gain, regret surfaces, and metacognitive bias guards.

**THE 9 REASONING STRATA (YOUR TASK):**
Given a clinical case summary, you will generate a comprehensive diagnostic analysis across all 9 strata, starting with the Executive Synthesis.

---

**STRATUM 1: Executive Synthesis**
- **Purpose:** Provide a high-level, "at-a-glance" summary of the entire diagnostic process. This is the first and most critical output.
- **Your Process:** After completing your analysis of Strata 2-9, you must synthesize the most important findings into this top-level object.
- **Output Components:**
    - 'topDiagnosis': The single most likely diagnosis from Stratum 3 ('etiologyCandidates').
    - 'confidenceScore': The 'postTestBelief' [0.0-1.0] for the top diagnosis from Stratum 3.
    - 'urgency': An object containing the 'level' (e.g., 'High', 'CRITICAL') from the top diagnosis in Stratum 3 and the 'quotient' [0.0-1.0] from Stratum 4.
    - 'recommendedAction': The name of the top-ranked 'interventionVectors' from Stratum 4.
    - 'keyRisk': A concise summary of the primary risk, informed by the 'regretMinimizationRationale' from Stratum 4 and the 'regretSurface.notAct' from Stratum 7.
    - 'reasoningCoherence': The 'reasoningCoherence' score [0.0-1.0] from Stratum 5.

---

**STRATUM 2: Pattern Constellation**
- **Purpose:** Clinical Syndrome Recognition. Identify meaningful disease patterns from disparate findings.
- **Output Components:**
    - 'syndromeNodes': A list of recognized clinical syndromes (e.g., Acute Coronary Syndrome, Systemic Inflammatory Response). For each, provide 'coherence' [0.0-1.0], 'pathognomonic' (boolean), and 'exclusion' (boolean).
    - 'phenoclusterMap': Analyze symptom co-occurrence. Identify the central symptom ('gravity') and the tightness of the grouping ('density' [0.0-1.0]).
    - 'divergenceSignals': Identify "red flags" that don't fit the expected pattern. For each, list the 'finding', its 'index' of atypicality [0.0-1.0], and its clinical 'severity' (e.g., Minor, Moderate, CRITICAL).
    - 'pathwayIlluminators': Map which anatomical/physiological systems are affected. Provide a list of systems and their likelihood of involvement ('activation' [0.0-1.0]).
    - 'crosstalkIndex': A single score [0.0-1.0] representing the degree of multi-system involvement (0 = mono-systemic, 1 = highly systemic).

---

**STRATUM 3: Hypothesis Forge**
- **Purpose:** Differential Diagnosis Generation & Bayesian Refinement.
- **Output Components:**
    - 'etiologyCandidates': Generate a ranked differential diagnosis. For each candidate, provide:
        - 'rank': Position in the differential (1 = most likely).
        - 'name': The diagnosis.
        - 'mustNotMiss': A boolean flag for life-threatening diagnoses.
        - 'treatmentUrgency': How quickly therapy must be initiated (e.g., Low, Moderate, High, CRITICAL).
        - 'preTestLikelihood': [0.0-1.0] Probability before diagnostic tests, derived from prevalence, demographics, and syndrome fit.
        - 'postTestBelief': [0.0-1.0] Updated probability after considering available evidence.
        - 'confidenceInterval': [Lower, Upper] bounds on the probability estimate. **This is critical; it must reflect true statistical uncertainty. A narrow, well-justified interval is superior to a wide, vague one.**
        - 'supportingAnchors'/'refutingAnchors': List key findings. For each anchor, provide its 'name', 'strength' [0.0-1.0], and 'type' (e.g., Pathognomonic, Major, Minor, Exclusionary).
    - 'recommendedTest': Recommend the single most powerful test to differentiate top hypotheses. Provide its 'name', 'potency' [0.0-1.0] (ability to separate hypotheses), 'informationGain' [0.0-1.0] (expected reduction in uncertainty), and a 'rationale'.

---

**STRATUM 4: Decision Nexus**
- **Purpose:** Determine optimal clinical action under uncertainty.
- **Output Components:**
    - 'interventionVectors': List possible management pathways (e.g., "Anticoagulation", "Observation Only"). For each, provide 'utility' (expected value), 'nnt' (Number Needed to Treat), 'therapeuticIndex', 'riskHarmIndex', and 'benefitMagnitude'.
    - 'urgency': Assess time-criticality. Provide 'quotient' [0.0-1.0], the 'window' of opportunity (e.g., "4.5 hours for tPA"), and the 'velocity' of deterioration (e.g., "HIGH (neuronal death ongoing)").
    - 'decisionRationale': A concise summary of the reasoning for the top-ranked intervention.
    - 'regretMinimizationRationale': A statement on which decision minimizes the worst-case regret.

---

**STRATUM 5: Cerebrum Sentinel (Metacognitive Loop)**
- **Purpose:** Reflective Reasoning, Quality Assurance & System Learning. This must be an actionable audit.
- **Output Components:**
    - 'reasoningCoherence': An internal logical consistency score [0.0-1.0].
    - 'biasRisk': An object for cognitive bias assessment.
        - 'score': A composite score [0.0-1.0] for the overall likelihood of cognitive bias.
        - 'suspectedBiases': An array of potential biases. For each, specify its 'type' (e.g., "Anchoring Bias", "Availability Bias", "Confirmation Bias", "Premature Closure") and a 'rationale' explaining why it's a risk for THIS SPECIFIC CASE.
    - 'contraPulse': Generate the single most damaging counter-hypothesis and targeted "disconfirmer" to test it before closure.
    - 'agnosiaAlert': Detects "unknown-unknowns". If high divergence and low coherence are present, trigger an alert recommending escalation (e.g., "Agnosia Alert: Atypical features with low syndrome coherence warrant multidisciplinary review."). If not, return null.
    - 'bayesLoomSummary': A brief statement describing the audit trail of the belief update (e.g., "BayesLoom: Pre-test likelihood of 0.30 for SLE updated to 0.75 based on positive ANA test (LR+ 6.86).").
    - 'closureFriction': A score [0.0-1.0] indicating forces preventing premature closure of the case. High friction means more tests/thought are needed.

---

**STRATUM 6: Hermeneutic Graph**
- **Purpose:** Bridge syndrome patterns to mechanistic plausibility. This is about creating a plausible causal story.
- **Output Components:**
    - 'pathomechWeave': A list linking 'phenocluster' nodes to 'mechanism' kernels (e.g., inflammatory, ischemic). The 'tension' score [0.0-1.0] represents the mismatch, forcing a check on the pathophysiological narrative.
    - 'crosstalkTensor': A high-level summary of multi-organ dynamics (e.g., "Cardio-renal-pulmonary axis strain with primary cardiac dysfunction.").
    - 'mechanismAnchors': List findings with high mechanistic specificity (e.g., 'name': "granular casts", 'specificity': "renal tubular pathology").

---

**STRATUM 7: Kairós Orchestrator**
- **Purpose:** Fuse probability with time-sensitivity and regret into action.
- **Output Components:**
    - 'kairosWindow': An intervention window function that weights utility by time decay/boost (e.g., "tPA for stroke: Intervention utility decays rapidly after 4.5 hours from symptom onset.").
    - 'regretSurface': A two-dimensional regret mapping. 'act': worst-case regret if you act (e.g., "Negative appendectomy"). 'notAct': worst-case regret if you don't act (e.g., "Perforation from missed appendicitis.").
    - 'hingeThresholds': Dynamic treatment thresholds (e.g., "Treat for sepsis on suspicion > 60% probability, where threshold drops as deterioration accelerates.").

---

**STRATUM 8: Praxis Loop (Praxis Loop on Steroids)**
- **Purpose:** Learning, Calibration & Safety Governance. This output MUST be structured for machine parsing.
- **Output Components:**
    - 'evidentiaGraphSummary': Summarize how this case, with its outcome, would power future calibration (e.g., "This case of SLE with atypical serology would be added to the EvidentiaGraph to refine PostTestBelief calibration curves.").
    - 'deltaCalibrationUpdate': A structured object for micro-updating priors.
        - 'targetDemographic': The specific subpopulation this update applies to.
        - 'priorAdjustment': The specific change to the prior (e.g., "Increase pre-test likelihood of atypical pneumonia in vaccinated young adults by +0.05").
        - 'rationale': Justification for the change.
    - 'guardrailsCharterCheck': A policy layer check (e.g., "Guardrails: Red-flag 'MustNotMiss' diagnosis of PE requires explicit consideration of imaging.").
    - 'driftSentinelAlert': Monitor for changes in test performance. If none, return null. If something is unusual, return a structured object:
        - 'source': The data source with a potential anomaly.
        - 'anomaly': A description of the observed drift.
        - 'confidence': [0.0-1.0] confidence in the anomaly.
        - 'recommendation': Actionable next step.
---
        
**STRATUM 9: Actionable Clinical Plan**
- **Purpose:** Translate the entire analysis into a concrete, actionable clinical management plan. This is the "last mile" to guide the clinician's next steps.
- **Output Components:**
    - 'immediateActions': A list of critical next steps to be taken immediately (e.g., "Administer 2L O2 via nasal cannula", "Obtain stat EKG and Troponin").
    - 'monitoringParameters': A list of key parameters to track. For each, specify the 'parameter', 'frequency' of checks, and an 'alertThreshold' that should trigger a re-evaluation (e.g., "Parameter: SpO2, Frequency: Continuous, AlertThreshold: <92%").
    - 'escalationTriggers': A list of specific clinical signs that warrant immediate escalation or consultation (e.g., "Hypotension (SBP < 90 mmHg) refractory to initial fluid bolus", "Development of altered mental status").
    - 'contingencyPlans': A list of "if-then" scenarios for anticipated changes. For each, provide the 'ifCondition' and the corresponding 'thenAction' (e.g., "IfCondition: Patient develops hives/rash after antibiotic administration, ThenAction: Stop antibiotic immediately, administer diphenhydramine 50mg IV.").
`;

const buildMultiModalPrompt = (multiModalData: MultiModalData): string => {
    let prompt = "\n\n**ADDITIONAL MULTI-MODAL DATA (GROUND YOUR REASONING IN THIS DATA):**\n";
    let hasData = false;

    if (multiModalData.chestXray?.findings) {
        prompt += `\n**Chest X-Ray Findings:** ${multiModalData.chestXray.findings}\n`;
        hasData = true;
    }
    if (multiModalData.ekg?.findings) {
        prompt += `\n**EKG Findings:** ${multiModalData.ekg.findings}\n`;
        hasData = true;
    }
    if (multiModalData.labResults?.findings) {
        prompt += `\n**Lab Results (${multiModalData.labResults.fileName}):**\n${multiModalData.labResults.findings}\n`;
        hasData = true;
    }

    return hasData ? prompt : "";
};


export const runNexusAnalysis = async (caseSummary: string, multiModalData: MultiModalData): Promise<NexusAnalysis> => {
    if (!process.env.API_KEY) {
        throw new Error("NEXUS Core analysis key is not configured.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const multiModalPrompt = buildMultiModalPrompt(multiModalData);

    try {
        // --- STEP 1: Cognitive Distillation (Free-text reasoning) ---
        const distillationPrompt = `
            You are an expert clinical diagnostician with exceptional critical thinking skills. Your task is to analyze the following clinical case and produce a detailed, step-by-step reasoning process. Your goal is to achieve the highest possible diagnostic accuracy, paying special attention to potential red herrings, misleading information, and complex presentations. Do not output JSON.

            Provide a clear, narrative analysis structured as follows:
            1.  **Key Findings Deconstruction:** List the most important positive and negative findings from the case summary and any additional data. For each finding, briefly state its clinical significance.
            2.  **Broad Initial Differential Diagnosis:** Generate a list of at least 3-5 potential diagnoses, including both common and "must-not-miss" conditions, even if they seem less likely at first.
            3.  **Systematic Reasoning & Evidence Weaving:** For each diagnosis in your differential, systematically evaluate the evidence.
                -   **Arguments For:** List the findings that support this diagnosis.
                -   **Arguments Against:** List the findings that contradict this diagnosis or make it less likely.
                -   **Critically analyze any conflicting data.** Explicitly address why certain information might be misleading (e.g., "The elevated D-dimer is non-specific and could be a red herring...").
            4.  **Final Synthesis & Conclusion:** State your single most likely diagnosis. Provide a compelling justification by synthesizing the evidence, explaining why this diagnosis provides a more coherent explanation for the patient's entire clinical picture than the alternatives you considered.

            **Clinical Case Summary:** "${caseSummary}"
            ${multiModalPrompt}
        `;

        const distillationResponse = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: distillationPrompt,
            config: {
                temperature: 0.2,
            },
        });
        const distilledReasoning = distillationResponse.text;

        // --- STEP 2: Structured Synthesis (JSON generation) ---
        const synthesisPrompt = `
            **CONTEXT:** An expert clinical diagnostician has provided the following detailed reasoning about a case.

            **EXPERT'S REASONING:**
            ---
            ${distilledReasoning}
            ---

            **YOUR TASK:**
            You are NEXUS v3.0. Your job is to take the expert's reasoning as the primary source of truth and synthesize it into the structured 9-stratum NEXUS framework. The reasoning has already been done for you; your task is to structure it perfectly according to the schema. Ensure your output is a single, valid JSON object.

            **Original Case Summary (for reference):** "${caseSummary}"
            ${multiModalPrompt}

            **GOLD-STANDARD EXAMPLE (for structure):**
            \`\`\`json
            ${JSON.stringify(NEXUS_EXAMPLE.analysis, null, 2)}
            \`\`\`
        `;
        
        const synthesisResponse = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: synthesisPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                thinkingConfig: {
                    // Increased to max for gemini-2.5-pro to ensure highest quality reasoning and structuring.
                    thinkingBudget: 32768,
                }
            },
        });

        const jsonText = synthesisResponse.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        if (parsedJson.stratum5 && parsedJson.stratum5.agnosiaAlert === "") {
            parsedJson.stratum5.agnosiaAlert = null;
        }

        return parsedJson as NexusAnalysis;
    } catch (error) {
        console.error("Error during NEXUS analysis service call:", error);
        throw new Error("Failed to get analysis from the NEXUS analysis service.");
    }
};