import type { BenchmarkTestCase } from '../types';

export const BOOK_BENCHMARK_TEST_SUITE: BenchmarkTestCase[] = [
  {
    id: 'CASE01',
    caseSummary: 'History: A 75-year-old man is brought to hospital with an episode of dizziness. He still feels unwell when he is seen 30min after the onset. He was well until 6 months ago and then started having falls. On some occasions the falls have been associated with loss of consciousness, although he is unsure of the length of time he was unconscious. On other occasions he has felt dizzy and has had to sit down, but has not lost consciousness. These episodes usually happened on exertion, but once or twice they have occurred while sitting down. He recovers over 10–15min after each episode. He lives alone, and most of the episodes have not been witnessed. Once his granddaughter was with him when he blacked out. Worried, she called an ambulance. He looked so pale and still that she thought that he had died. He was taken to hospital, by which time he had recovered completely and was discharged and told that he had a normal electrocardiogram (ECG) and chest X-ray. Examination: He is pale with a blood pressure of 96/64mmHg. The pulse rate is 33/min, regular. There are no heart murmurs. The jugular venous pressure is raised 3 cm with occasional rises. There is no leg oedema; the peripheral pulses are palpable except for the left dorsalis pedis. The respiratory system is normal. Investigations: The patient’s ECG is shown in Figure 1.1.',
    goldStandard: { topDiagnosis: 'Complete heart block' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE02',
    caseSummary: 'History: A 34-year-old male accountant comes to the emergency department with acute chest pain. The current pain had come on 4h earlier at 8pm and has been persistent since then. It is central in position, with some radiation to both sides of the chest. The pain is relieved by sitting up and leaning forward. Two weeks previously he had an upper respiratory tract infection that lasted 4 days. Examination: His pulse rate is 75/min, blood pressure 124/78mmHg. His temperature is 37.8°C. There is nothing abnormal to find in the cardiovascular and respiratory systems. Investigations: A chest X-ray is normal. ESR 46. The troponin level is slightly raised. The electrocardiogram (ECG) is shown in Figure 2.1.',
    goldStandard: { topDiagnosis: 'Pericarditis' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE03',
    caseSummary: 'History: A 19-year-old boy has a history of repeated chest infections since the first 2 years of life. Over the past 2 years he has developed more problems and was admitted to hospital on three occasions with cough and purulent sputum. Pseudomonas aeruginosa was isolated from the sputum. His bowels tend to be irregular. Examination: On examination he is thin, weighing 48 kg, and is 1.6m tall. The only finding in the chest is of a few inspiratory crackles over the upper zones of both lungs. Investigations: The chest X-ray is shown in Figure 3.1.',
    goldStandard: { topDiagnosis: 'Cystic fibrosis' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE05',
    caseSummary: 'History: A 56-year-old woman presents to the emergency department complaining of abdominal pain. Twenty-four hours previously she developed a continuous pain in the upper abdomen that has become progressively more severe. The pain radiates into the back. She feels nauseated. Examination: The patient looks unwell and dehydrated. She is febrile, 38.5°C; her pulse is 108/min. She is tender in the right upper quadrant and epigastrium, with guarding and rebound tenderness. Investigations: White cell count 19.8 × 10^9/L, C-reactive protein (CRP) 256mg/L.',
    goldStandard: { topDiagnosis: 'Acute cholecystitis' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE06',
    caseSummary: 'History: A 66-year-old woman consults her GP with a 4-month history of tiredness, slight breathlessness on exertion and loss of weight from 71 to 65kg. Over the last 2 months she has had an altered bowel habit with constipation alternating with her usual pattern. She has not seen any blood in her faeces. Examination: She has slight pallor but otherwise looks well. Rectal examination is normal. Investigations: Haemoglobin 10.1g/dL, Mean corpuscular volume (MCV) 76fL. Blood film shows a microcytic hypochromic picture.',
    goldStandard: { topDiagnosis: 'Carcinoma of the colon' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE07',
    caseSummary: 'History: A man of 45 consults his GP with a 6-month history of reduced appetite and weight loss. For 1 month he has noted swelling of his ankles. He has been a chef all his working life and drinks 15–20 units of alcohol per week. Examination: He has plethoric features. There is pitting oedema of his ankles. He has nine spider naevi on his upper trunk. The abdomen is distended with shifting dullness. Investigations: MCV 107fL, Platelets 121 × 10^9/L, Albumin 26g/L, Alanine transaminase 276IU/L, Gamma-glutamyl transaminase 873IU/L, International normalised ratio (INR) 1.4.',
    goldStandard: { topDiagnosis: 'Chronic liver disease' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE08',
    caseSummary: 'History: A 22-year-old man presented with malaise and anorexia for 1 week. He vomited on one occasion. For 2 weeks he has had aching pains in the knees, elbows and wrists without any obvious swelling. He has had irregular homosexual contacts. Examination: He has a temperature of 38.6°C and looks unwell. He looks as if he may be a little jaundiced. He is a little tender in the right upper quadrant of the abdomen. Investigations: Prothrombin time 17s, Bilirubin 50µmol/L, Alkaline phosphatase 376IU/L, Alanine aminotransferase 570IU/L.',
    goldStandard: { topDiagnosis: 'Acute hepatitis B' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE09',
    caseSummary: 'History: An 85-year-old woman is investigated for increasing tiredness, which has developed over the past 6 months. She has lost her appetite and feels constantly nauseated. She has lost about 8 kg in weight. For the last 4 weeks she has also complained of generalized itching and cramps. She has been hypertensive for 20 years. Examination: Her conjunctivae are pale. Blood pressure 190/110mmHg; mild pitting oedema of her ankles is present. Fundoscopy shows arteriovenous nipping. Investigations: Haemoglobin 7.8g/dL, Urea 46.2mmol/L, Creatinine 769µmol/L, Phosphate 3.4mmol/L. Blood film: normochromic, normocytic anaemia.',
    goldStandard: { topDiagnosis: 'End stage kidney failure' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE11',
    caseSummary: 'History: A 64-year-old man has gained 8 kg in weight over the past 6 months. He is constantly hungry. He has found that he is bruising easily. He finds it difficult to get up from his armchair or to climb stairs. He feels depressed. Examination: He is overweight, particularly in the abdominal region. There are purple stretch marks on his abdomen and thighs. His skin is thin. Blood pressure is 168/104mmHg. There is peripheral oedema. Weakness in shoulder abduction and hip flexion. Investigations: Potassium 3.3mmol/L, Glucose 8.3mmol/L. Urinalysis: ++ glucose.',
    goldStandard: { topDiagnosis: 'Cushing’s syndrome' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE13',
    caseSummary: 'History: A 67-year-old man is referred with weakness and wasting of the muscles of his left hand. He has also noticed cramps in his forearm muscles. On a few occasions recently he has felt choking sensations after taking fluids. Examination: There is some wasting of the muscles in the upper limbs, particularly in the left hand. There is some fasciculation in the muscles of the forearms bilaterally. Power is globally reduced in the left hand. The biceps and triceps jerks are brisk bilaterally. There is no sensory loss. There is slight dysarthria.',
    goldStandard: { topDiagnosis: 'Motor neurone disease' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE14',
    caseSummary: 'History: A 43-year-old woman presents with diplopia, more marked in the evenings, for the last 3 months. She has noticed difficulty holding her head up. She has problems finishing a meal because of difficulty chewing. Her voice has become quieter. Examination: Power in all muscle groups seems to decrease after testing a movement repetitively. Bilateral ptosis is present and is exacerbated by prolonged upward gaze.',
    goldStandard: { topDiagnosis: 'Myasthenia gravis' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE15',
    caseSummary: 'History: A 35-year-old man has developed a painful, swollen right knee over the past 36h. He feels generally unwell and has also noticed his eyes are sore. He returned 3 weeks ago from a business trip to Thailand. Examination: His temperature is 38.0°C. Both eyes appear red. There is a brown macular rash on his palms and soles. His right knee is swollen, hot and tender with limitation in flexion. On direct questioning he admitted to the presence of a urethral discharge.',
    goldStandard: { topDiagnosis: 'Reactive arthritis' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE17',
    caseSummary: 'History: A 68-year-old woman complains of spontaneous bruising mainly on her legs for the last 3 weeks. She has suffered a major nosebleed. She feels very tired and has noticed shortness of breath on exertion. Examination: There are multiple areas of purpura on her legs. She is pale with conjunctival pallor. There are two bullae in the mouth, and there is spontaneous bleeding from the gums. There are multiple small retinal haemorrhages on fundoscopy. Investigations: Haemoglobin 5.8g/dL, White cell count 14.1 × 10^9/L (with blasts on smear), Platelets 9 × 10^9/L. Clotting screen: normal.',
    goldStandard: { topDiagnosis: 'Acute myeloid leukaemia' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE19',
    caseSummary: 'History: A 24-year-old man presents with a fever, present on and off for 3 days. On the third day he felt very unwell with a feeling of intense cold with generalized shaking. He felt very sweaty. He had returned from Nigeria 3 weeks earlier. Examination: He looks unwell. His pulse is 94/min. In the abdomen there is some tenderness in the left upper quadrant. Investigations: Haemoglobin 11.1g/dL, Platelets 112 × 10^9/L, Bilirubin 28µmol/L.',
    goldStandard: { topDiagnosis: 'Malaria' },
    tags: ['diagnosis'],
  },
  {
    id: 'CASE23',
    caseSummary: 'History: A 74-year-old woman is admitted for diverticulitis and treated with intravenous cefuroxime. On the fifth day of her admission, she has an episode of diarrhoea. The next day she has 4 episodes of watery diarrhoea and complains of crampy abdominal pain. Examination: Her mucous membranes are dry and she has a fever of 38.5°C. She has mild diffuse abdominal tenderness. She has prominent bowel sounds. Investigations: White cell count 16.3 × 10^9/L.',
    goldStandard: { topDiagnosis: 'Clostridium difficile infection' },
    tags: ['diagnosis'],
  },
];
