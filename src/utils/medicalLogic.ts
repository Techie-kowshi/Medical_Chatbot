import { findMedicine, formatMedicineInfo } from './medicineDatabase';

export type Severity = 'low' | 'medium' | 'high';

export interface MedicalResponse {
  message: string;
  severity: Severity;
  recommendation: string;
}

interface SymptomRule {
  name: string;
  keywords: string[];
  severity: Severity;
  message: string;
  recommendation: string;
}

export const EMERGENCY_NUMBER = '112';

const SEVERITY_RANK: Record<Severity, number> = { low: 0, medium: 1, high: 2 };

export const symptomRules: SymptomRule[] = [
  {
    name: 'chest pain',
    keywords: ['chest pain', 'chest pressure', 'chest tightness', 'heart pain', 'heart attack'],
    severity: 'high',
    message: 'Chest pain requires careful evaluation.',
    recommendation: `If you have severe chest pain, shortness of breath, or pain spreading to your arm or jaw, call ${EMERGENCY_NUMBER} or go to the nearest emergency department now. For mild chest discomfort, avoid strenuous activity and see a doctor promptly.`,
  },
  {
    name: 'fever',
    keywords: ['fever', 'temperature', 'feverish'],
    severity: 'medium',
    message: "It sounds like you're experiencing fever symptoms.",
    recommendation: 'Rest, drink plenty of fluids, and consider a fever-reducing medicine such as Paracetamol or Ibuprofen. If the fever stays above 101°F (38.3°C) for more than 3 days or reaches 103°F (39.4°C), consult a doctor immediately.',
  },
  {
    name: 'stomach pain',
    keywords: ['stomach', 'abdominal', 'belly', 'nausea', 'vomiting'],
    severity: 'medium',
    message: 'Stomach discomfort can have many causes.',
    recommendation: 'Eat bland foods, take small sips of water, and avoid dairy and fatty foods. For acidity, medicines such as Omeprazole may help. Seek medical attention if the pain is severe or persistent, or comes with vomiting, fever or blood.',
  },
  {
    name: 'headache',
    keywords: ['headache', 'head pain', 'migraine'],
    severity: 'low',
    message: 'Headaches can have various causes.',
    recommendation: 'Rest in a quiet, dark room, apply a cold or warm compress, stay hydrated, and consider Paracetamol or Ibuprofen. If headaches are severe, frequent, or come with other symptoms, consult a doctor.',
  },
  {
    name: 'sore throat',
    keywords: ['sore throat', 'throat pain', 'painful swallowing'],
    severity: 'low',
    message: 'Sore throats are commonly caused by viral or bacterial infections.',
    recommendation: 'Gargle with warm salt water, drink warm liquids, use throat lozenges, and rest your voice. Paracetamol or Ibuprofen can help with pain. If symptoms last beyond 5 days, or you have a high fever or white patches, consult a doctor.',
  },
  {
    name: 'cough',
    keywords: ['cough', 'coughing'],
    severity: 'low',
    message: 'Coughs can be caused by infections or allergies.',
    recommendation: 'Stay hydrated, try honey or throat lozenges, and avoid smoke and other irritants. See a doctor if the cough lasts more than 2 weeks, produces blood, or comes with fever.',
  },
  {
    name: 'cold',
    keywords: ['cold', 'runny nose', 'stuffy nose', 'blocked nose', 'congestion'],
    severity: 'low',
    message: 'Common cold symptoms are usually manageable at home.',
    recommendation: 'Rest, drink warm fluids, and use saline nasal drops. Antihistamines such as Cetirizine or Loratadine can help with a runny nose. Most colds resolve within 7 to 10 days. See a doctor if symptoms worsen or last longer.',
  },
  {
    name: 'allergy',
    keywords: ['allergy', 'allergies', 'allergic', 'hay fever', 'sneezing'],
    severity: 'low',
    message: 'Allergic reactions can cause various symptoms.',
    recommendation: `Avoid known allergens and use antihistamines such as Cetirizine or Loratadine for relief. If you have difficulty breathing or swelling of the face or throat, call ${EMERGENCY_NUMBER} immediately.`,
  },
  {
    name: 'back pain',
    keywords: ['back pain', 'backache', 'lower back'],
    severity: 'low',
    message: 'Back pain can often be managed with self-care.',
    recommendation: 'Apply ice for the first 24 to 48 hours, then heat. Gentle stretching and Ibuprofen or Paracetamol can help, along with good posture. If the pain is severe, lasts more than a few days, or comes with numbness or tingling, consult a doctor.',
  },
];

const GENERAL_MEDICINE_WORDS = ['medicine', 'medicines', 'drug', 'drugs', 'medication', 'tablet', 'tablets', 'pill', 'pills', 'capsule', 'capsules'];

const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const containsPhrase = (text: string, phrase: string): boolean =>
  new RegExp(`\\b${escapeRegex(phrase)}\\b`, 'i').test(text);

export const matchSymptoms = (query: string): SymptomRule[] =>
  symptomRules
    .filter(rule => rule.keywords.some(keyword => containsPhrase(query, keyword)))
    .sort((a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity]);

export const analyzeMedicalQuery = (query: string): MedicalResponse => {
  const medicine = findMedicine(query);
  if (medicine) {
    return {
      message: `Here is some information about ${medicine.genericName}:`,
      severity: 'low',
      recommendation: formatMedicineInfo(medicine),
    };
  }

  const matches = matchSymptoms(query);
  if (matches.length > 0) {
    const [top, ...rest] = matches;
    const also = rest.length > 0
      ? `\n\nYou also mentioned ${rest.map(r => r.name).join(' and ')}. Ask about each one separately for more detail.`
      : '';
    return {
      message: top.message,
      severity: top.severity,
      recommendation: top.recommendation + also,
    };
  }

  if (GENERAL_MEDICINE_WORDS.some(word => containsPhrase(query, word))) {
    return {
      message: 'I can give information about common medicines.',
      severity: 'low',
      recommendation: "Name the medicine you want to know about, for example 'Tell me about Paracetamol'. I have information on Paracetamol, Ibuprofen, Cetirizine, Amoxicillin, Metformin, Aspirin, Omeprazole and Loratadine.",
    };
  }

  return {
    message: "I couldn't identify specific symptoms in your message.",
    severity: 'low',
    recommendation: 'I can help with common symptoms (fever, headache, cough, cold and others) and with medicines such as Paracetamol and Cetirizine. Try describing your symptoms more specifically. For any serious concern, please see a qualified doctor.',
  };
};

export const getWelcomeMessage = (): string =>
  "Hello! I can give general information about common symptoms and medicines. Try 'I have a fever' or 'Tell me about Paracetamol'. How can I help?";
