import { NexusAnalysis } from '../types';

export const NEXUS_EXAMPLE: { caseSummary: string, analysis: NexusAnalysis } = {
    caseSummary: "62-year-old female with a history of hypertension and diabetes presents with a 2-day history of productive cough (yellow sputum), fever of 101.5°F, and right-sided pleuritic chest pain. On exam, she has crackles in the right lower lung field.",
    analysis: {
        stratum1: {
            topDiagnosis: "Community-Acquired Pneumonia",
            confidenceScore: 0.85,
            urgency: { level: "High", quotient: 0.8 },
            recommendedAction: "Administer Empiric Antibiotics (e.g., Azithromycin + Ceftriaxone)",
            keyRisk: "Progression to sepsis and respiratory failure if treatment is delayed.",
            reasoningCoherence: 0.95
        },
        stratum2: {
            syndromeNodes: [
                { name: "Community-Acquired Pneumonia", coherence: 0.9, pathognomonic: false, exclusion: false },
                { name: "Acute Bronchitis", coherence: 0.6, pathognomonic: false, exclusion: false },
                { name: "Systemic Inflammatory Response", coherence: 0.7, pathognomonic: false, exclusion: false }
            ],
            phenoclusterMap: { gravity: "Productive Cough", density: 0.85 },
            divergenceSignals: [],
            pathwayIlluminators: [
                { system: "Pulmonary", activation: 0.95 },
                { system: "Systemic Inflammatory", activation: 0.7 }
            ],
            crosstalkIndex: 0.2
        },
        stratum3: {
            etiologyCandidates: [
                {
                    name: "Community-Acquired Pneumonia",
                    rank: 1,
                    mustNotMiss: true,
                    treatmentUrgency: "High",
                    preTestLikelihood: 0.6,
                    postTestBelief: 0.85,
                    confidenceInterval: [0.75, 0.92],
                    supportingAnchors: [
                        { name: "Fever", strength: 0.7, type: "Major" },
                        { name: "Productive Cough", strength: 0.8, type: "Major" },
                        { name: "Crackles in right lower lung", strength: 0.9, type: "Pathognomonic" }
                    ],
                    refutingAnchors: []
                },
                {
                    name: "Pulmonary Embolism",
                    rank: 2,
                    mustNotMiss: true,
                    treatmentUrgency: "CRITICAL",
                    preTestLikelihood: 0.1,
                    postTestBelief: 0.05,
                    confidenceInterval: [0.02, 0.1],
                    supportingAnchors: [{ name: "Pleuritic chest pain", strength: 0.5, type: "Minor" }],
                    refutingAnchors: [{ name: "Absence of unilateral leg swelling", strength: 0.4, type: "Minor" }, { name: "Productive cough is atypical", strength: 0.6, type: "Minor" }]
                }
            ],
            recommendedTest: {
                name: "Chest X-Ray",
                potency: 0.9,
                informationGain: 0.8,
                rationale: "To confirm the presence of consolidation consistent with pneumonia and rule out other causes like effusion or pneumothorax."
            }
        },
        stratum4: {
            interventionVectors: [
                { name: "Empiric Antibiotics (e.g., Azithromycin + Ceftriaxone)", utility: 0.9, nnt: 3, therapeuticIndex: 0.8, riskHarmIndex: 0.1, benefitMagnitude: 0.85 },
                { name: "Supportive Care only", utility: 0.2, nnt: 0, therapeuticIndex: 0, riskHarmIndex: 0.8, benefitMagnitude: 0.1 }
            ],
            urgency: { quotient: 0.8, window: "4 hours", velocity: "Moderate" },
            decisionRationale: "High probability of bacterial pneumonia with signs of systemic response warrants immediate initiation of empiric antibiotics to prevent progression to sepsis.",
            regretMinimizationRationale: "The regret of not treating a progressive bacterial pneumonia (sepsis, respiratory failure) far outweighs the regret of treating a non-bacterial cause with antibiotics."
        },
        stratum5: {
            reasoningCoherence: 0.95,
            biasRisk: {
                score: 0.1,
                suspectedBiases: [{ type: "Confirmation Bias", rationale: "The classic presentation strongly favors pneumonia, which might cause premature closure and insufficient consideration of PE." }]
            },
            contraPulse: "Could this be a pulmonary embolism mimicking pneumonia? A D-dimer test could be a disconfirmer if clinical suspicion remains.",
            agnosiaAlert: null,
            bayesLoomSummary: "Pre-test belief for Pneumonia (0.60) was significantly strengthened to 0.85 based on focal crackles on exam (high positive likelihood ratio).",
            closureFriction: 0.2
        },
        stratum6: {
            pathomechWeave: [
                { phenocluster: "Cough/Fever/Crackles", mechanism: "Alveolar Inflammation", tension: 0.1 }
            ],
            crosstalkTensor: "Localized pulmonary inflammation is driving a systemic inflammatory response.",
            mechanismAnchors: [{ name: "Crackles", specificity: "Alveolar fluid/exudate" }]
        },
        stratum7: {
            kairosWindow: "Antibiotic efficacy is highest when administered within 4 hours of diagnosis for hospitalized patients.",
            regretSurface: {
                act: "Minor risk of antibiotic side effects or resistance.",
                notAct: "High risk of sepsis, respiratory failure, and mortality."
            },
            hingeThresholds: "Initiate antibiotics if post-test belief for bacterial pneumonia exceeds 50%."
        },
        stratum8: {
            evidentiaGraphSummary: "This case reinforces the high diagnostic weight of focal crackles for pneumonia and will be used to calibrate pre-test probability models for this demographic.",
            deltaCalibrationUpdate: {
                targetDemographic: "Diabetic patients > 60 years old",
                priorAdjustment: "Slightly increase pre-test likelihood for bacterial pneumonia given presentation with fever and cough.",
                rationale: "This demographic has a higher incidence and often presents with classic symptoms."
            },
            guardrailsCharterCheck: "Guardrails: Hospital admission criteria met due to age, comorbidities, and fever. Sepsis screening protocol should be initiated.",
            driftSentinelAlert: null
        },
        stratum9: {
            immediateActions: [
                "Administer empiric antibiotics (Ceftriaxone 1g IV and Azithromycin 500mg IV).",
                "Obtain blood cultures and sputum sample before first antibiotic dose.",
                "Administer supplemental oxygen to maintain SpO2 > 92%.",
                "Administer antipyretics (e.g., Acetaminophen) for fever."
            ],
            monitoringParameters: [
                { parameter: "Oxygen Saturation (SpO2)", frequency: "Continuous", alertThreshold: "< 92%" },
                { parameter: "Respiratory Rate", frequency: "Every 2 hours", alertThreshold: "> 24/min" },
                { parameter: "Temperature", frequency: "Every 4 hours", alertThreshold: "> 101.5°F" }
            ],
            escalationTriggers: [
                "Hypotension (SBP < 90 mmHg).",
                "Worsening respiratory distress or need for increased oxygen support.",
                "Altered mental status."
            ],
            contingencyPlans: [
                { ifCondition: "Patient develops an allergic reaction to antibiotics", thenAction: "Stop infusion immediately, administer epinephrine if anaphylaxis occurs." },
                { ifCondition: "Cultures return a resistant organism", thenAction: "Adjust antibiotic coverage based on sensitivities." }
            ]
        }
    }
};