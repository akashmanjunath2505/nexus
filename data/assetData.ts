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
  // FIX: Updated labResults to conform to the { fileName: string; findings: string } type.
  labResults: {
    fileName: "sample_cbc_results.txt",
    findings: "Complete Blood Count (CBC)\n- WBC: 15.2 x10^9/L (High, Range: 4.0-11.0)\n- Neutrophils: 85% (High, Range: 40-75)\n- Hemoglobin: 14.1 g/dL (Normal, Range: 13.5-17.5)\n- Platelets: 250 x10^9/L (Normal, Range: 150-450)",
  },
};
