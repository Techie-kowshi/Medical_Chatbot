
import { findMedicine, formatMedicineInfo } from './medicineDatabase';

export interface MedicalResponse {
  message: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

export const analyzeMedicalQuery = (query: string): MedicalResponse => {
  const lowerQuery = query.toLowerCase();

  // Check if it's a medicine inquiry first
  const medicine = findMedicine(query);
  if (medicine) {
    return {
      message: `Here's detailed information about ${medicine.genericName}:`,
      severity: 'low',
      recommendation: formatMedicineInfo(medicine)
    };
  }

  // Check for general medicine-related queries
  if (lowerQuery.includes('medicine') || lowerQuery.includes('drug') || lowerQuery.includes('medication') || 
      lowerQuery.includes('tablet') || lowerQuery.includes('pill') || lowerQuery.includes('capsule')) {
    return {
      message: "I can provide information about various medicines.",
      severity: 'low',
      recommendation: "Please specify the name of the medicine you'd like to know about. For example, try asking 'Tell me about Paracetamol' or 'What is Ibuprofen used for?'. I have information about common medicines like Paracetamol, Ibuprofen, Cetirizine, Amoxicillin, Metformin, Aspirin, Omeprazole, and Loratadine."
    };
  }

  // Fever symptoms
  if (lowerQuery.includes('fever') || lowerQuery.includes('temperature') || lowerQuery.includes('hot')) {
    return {
      message: "I understand you're experiencing fever symptoms.",
      severity: 'medium',
      recommendation: "For fever: Rest, drink plenty of fluids, and consider fever-reducing medication like Paracetamol or Ibuprofen. If fever persists above 101°F (38.3°C) for more than 3 days or reaches 103°F (39.4°C), please consult a healthcare professional immediately."
    };
  }

  // Headache symptoms
  if (lowerQuery.includes('headache') || lowerQuery.includes('head pain') || lowerQuery.includes('migraine')) {
    return {
      message: "Headaches can have various causes.",
      severity: 'low',
      recommendation: "For headache relief: Try resting in a quiet, dark room, apply a cold or warm compress, stay hydrated, and consider over-the-counter pain relievers like Paracetamol or Ibuprofen. If headaches are severe, frequent, or accompanied by other symptoms, please consult a doctor."
    };
  }

  // Cough symptoms
  if (lowerQuery.includes('cough') || lowerQuery.includes('coughing')) {
    return {
      message: "Coughs can be caused by various factors including infections or allergies.",
      severity: 'low',
      recommendation: "For cough management: Stay hydrated, use honey or throat lozenges, avoid irritants like smoke. If cough persists for more than 2 weeks, produces blood, or is accompanied by fever, please see a healthcare provider."
    };
  }

  // Cold symptoms
  if (lowerQuery.includes('cold') || lowerQuery.includes('runny nose') || lowerQuery.includes('stuffy nose') || lowerQuery.includes('congestion')) {
    return {
      message: "Common cold symptoms are usually manageable at home.",
      severity: 'low',
      recommendation: "For cold symptoms: Get plenty of rest, drink warm fluids, use saline nasal drops, and consider decongestants if needed. Antihistamines like Cetirizine or Loratadine can help with runny nose. Most colds resolve within 7-10 days. See a doctor if symptoms worsen or persist beyond 10 days."
    };
  }

  // Stomach pain
  if (lowerQuery.includes('stomach') || lowerQuery.includes('abdominal') || lowerQuery.includes('belly') || lowerQuery.includes('nausea')) {
    return {
      message: "Stomach discomfort can have many causes.",
      severity: 'medium',
      recommendation: "For stomach issues: Try eating bland foods (BRAT diet), stay hydrated with small sips of water, avoid dairy and fatty foods. For acid-related issues, medications like Omeprazole may help. Seek immediate medical attention if pain is severe, persistent, or accompanied by vomiting, fever, or blood."
    };
  }

  // Sore throat
  if (lowerQuery.includes('sore throat') || lowerQuery.includes('throat pain') || lowerQuery.includes('swallowing')) {
    return {
      message: "Sore throats are commonly caused by viral or bacterial infections.",
      severity: 'low',
      recommendation: "For sore throat relief: Gargle with warm salt water, drink warm liquids, use throat lozenges, and rest your voice. Pain relievers like Paracetamol or Ibuprofen can help. If symptoms persist beyond 5 days, include high fever, or you see white patches, consult a healthcare provider."
    };
  }

  // Allergies
  if (lowerQuery.includes('allergy') || lowerQuery.includes('allergic') || lowerQuery.includes('hay fever') || lowerQuery.includes('sneezing')) {
    return {
      message: "Allergic reactions can cause various symptoms.",
      severity: 'low',
      recommendation: "For allergies: Avoid known allergens, use antihistamines like Cetirizine or Loratadine for symptom relief. For seasonal allergies, consider starting treatment before allergy season. If you experience severe allergic reactions (difficulty breathing, swelling), seek emergency medical care immediately."
    };
  }

  // Chest pain - higher severity
  if (lowerQuery.includes('chest pain') || lowerQuery.includes('chest pressure') || lowerQuery.includes('heart')) {
    return {
      message: "Chest pain requires careful evaluation.",
      severity: 'high',
      recommendation: "⚠️ IMPORTANT: If you're experiencing severe chest pain, shortness of breath, or pain radiating to your arm or jaw, seek emergency medical attention immediately by calling 911. For mild chest discomfort, avoid strenuous activity and consult a healthcare provider promptly."
    };
  }

  // Back pain
  if (lowerQuery.includes('back pain') || lowerQuery.includes('backache')) {
    return {
      message: "Back pain is a common issue that can often be managed with self-care.",
      severity: 'low',
      recommendation: "For back pain: Apply ice for the first 24-48 hours, then switch to heat. Gentle stretching, over-the-counter pain relievers like Ibuprofen or Paracetamol can help. Maintain good posture. If pain is severe, persists beyond a few days, or includes numbness/tingling, consult a healthcare provider."
    };
  }

  // Default response for unrecognized queries
  return {
    message: "I understand you have a health concern, but I couldn't identify specific symptoms from your message.",
    severity: 'low',
    recommendation: "I can help with information about common symptoms (fever, headache, cough, cold, etc.) and medicines (Paracetamol, Ibuprofen, Cetirizine, etc.). Try describing your symptoms more specifically or ask about a particular medicine. For any serious health concerns, please consult with a qualified healthcare professional."
  };
};

export const getWelcomeMessage = (): string => {
  return "Hello! I'm your Medical Assistant Bot. I can help provide general information about common symptoms, health conditions, and medicines. You can ask me about symptoms like 'I have a fever' or medicine information like 'Tell me about Paracetamol'. How can I help you today?";
};
