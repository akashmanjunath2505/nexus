import type { MultiModalData } from '../types';

// NOTE: These are placeholder 1x1 pixel base64 images to keep the bundle size small.
// In a real application, these would be full base64-encoded images.
const SAMPLE_CHEST_XRAY_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIc/r6AAAAEklEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const SAMPLE_EKG_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAABCAQAAACvWy3oAAAAEElEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';


export const SAMPLE_MODALITIES: Required<MultiModalData> = {
  chestXray: {
    image: SAMPLE_CHEST_XRAY_BASE64,
    findings: "PA and lateral views show a dense consolidation in the right lower lobe consistent with lobar pneumonia. No pleural effusion or pneumothorax is visible.",
  },
  ekg: {
    image: SAMPLE_EKG_BASE64,
    findings: "Normal sinus rhythm at 78 bpm. No acute ST-segment elevation or depression. No significant arrhythmias.",
  },
  labResults: {
    panel: "Complete Blood Count (CBC)",
    results: [
      { test: "WBC", value: "15.2 x10^9/L", range: "4.0-11.0" },
      { test: "Neutrophils", value: "85%", range: "40-75" },
      { test: "Hemoglobin", value: "14.1 g/dL", range: "13.5-17.5" },
      { test: "Platelets", value: "250 x10^9/L", range: "150-450" },
    ],
  },
};
