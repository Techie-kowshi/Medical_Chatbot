
export interface MedicineInfo {
  genericName: string;
  brandNames: string[];
  uses: string[];
  dosage: string;
  sideEffects: string[];
  precautions: string[];
  interactions: string[];
  storage: string;
}

export const medicineDatabase: Record<string, MedicineInfo> = {
  paracetamol: {
    genericName: "Paracetamol (Acetaminophen)",
    brandNames: ["Tylenol", "Panadol", "Crocin", "Dolo"],
    uses: ["Fever reduction", "Mild to moderate pain relief", "Headache", "Muscle aches"],
    dosage: "Adults: 500mg to 1000mg every 4-6 hours (maximum 4000mg/day). Children: As per weight-based dosing.",
    sideEffects: ["Nausea", "Liver damage (with high doses)", "Allergic reactions (rare)", "Skin rash"],
    precautions: ["Avoid alcohol consumption", "Do not exceed maximum daily dose", "Consult doctor if liver problems"],
    interactions: ["Warfarin (blood thinner)", "Alcohol", "Other paracetamol-containing medications"],
    storage: "Store at room temperature, away from moisture and heat. Keep out of reach of children."
  },
  ibuprofen: {
    genericName: "Ibuprofen",
    brandNames: ["Advil", "Brufen", "Nurofen", "Motrin"],
    uses: ["Pain relief", "Anti-inflammatory", "Fever reduction", "Arthritis pain", "Menstrual cramps"],
    dosage: "Adults: 200-400mg every 4-6 hours (maximum 1200mg/day for OTC use). Take with food.",
    sideEffects: ["Gastric irritation", "Stomach ulcers", "Kidney problems", "Dizziness", "Headache"],
    precautions: ["Take with food", "Avoid if you have stomach ulcers", "Monitor kidney function", "Avoid in heart disease"],
    interactions: ["Warfarin", "ACE inhibitors", "Lithium", "Methotrexate"],
    storage: "Store at room temperature in a dry place. Protect from light."
  },
  cetirizine: {
    genericName: "Cetirizine",
    brandNames: ["Zyrtec", "Cetril", "Alerid", "Okacet"],
    uses: ["Allergic rhinitis", "Hay fever", "Urticaria (hives)", "Itchy skin", "Runny nose"],
    dosage: "Adults: 10mg once daily. Children 6-12 years: 5-10mg once daily.",
    sideEffects: ["Drowsiness", "Dry mouth", "Fatigue", "Dizziness", "Headache"],
    precautions: ["Avoid driving after taking", "Limit alcohol consumption", "Use caution in elderly patients"],
    interactions: ["Alcohol", "CNS depressants", "Ritonavir"],
    storage: "Store at room temperature. Keep in original container."
  },
  amoxicillin: {
    genericName: "Amoxicillin",
    brandNames: ["Amoxil", "Trimox", "Moxatag", "Augmentin (with clavulanate)"],
    uses: ["Bacterial infections", "Respiratory tract infections", "Urinary tract infections", "Skin infections"],
    dosage: "Adults: 250-500mg every 8 hours or 500-875mg every 12 hours. Complete full course as prescribed.",
    sideEffects: ["Skin rash", "Diarrhea", "Nausea", "Vomiting", "Allergic reactions"],
    precautions: ["Complete full antibiotic course", "Check for penicillin allergy", "Take with food if stomach upset"],
    interactions: ["Oral contraceptives", "Warfarin", "Methotrexate", "Probenecid"],
    storage: "Store at room temperature. Liquid form should be refrigerated and discarded after 14 days."
  },
  metformin: {
    genericName: "Metformin",
    brandNames: ["Glucophage", "Fortamet", "Riomet", "Glumetza"],
    uses: ["Type 2 diabetes", "Polycystic ovary syndrome (PCOS)", "Insulin resistance"],
    dosage: "Adults: Start with 500mg twice daily with meals. May increase gradually up to 2000mg/day.",
    sideEffects: ["Nausea", "Diarrhea", "Abdominal pain", "Metallic taste", "Lactic acidosis (rare)"],
    precautions: ["Monitor kidney function", "Avoid alcohol", "Stop before surgery", "Take with meals"],
    interactions: ["Contrast dyes", "Alcohol", "Cimetidine", "Furosemide"],
    storage: "Store at room temperature in a dry place. Protect from moisture."
  },
  aspirin: {
    genericName: "Aspirin (Acetylsalicylic acid)",
    brandNames: ["Bayer", "Ecotrin", "Bufferin", "Disprin"],
    uses: ["Pain relief", "Fever reduction", "Anti-inflammatory", "Heart attack prevention", "Blood clot prevention"],
    dosage: "Pain/fever: 325-650mg every 4 hours. Cardioprotective: 75-100mg daily. Take with food.",
    sideEffects: ["Stomach irritation", "Bleeding", "Tinnitus", "Reye's syndrome (in children)", "Allergic reactions"],
    precautions: ["Avoid in children under 16", "Take with food", "Monitor for bleeding", "Avoid before surgery"],
    interactions: ["Warfarin", "Methotrexate", "ACE inhibitors", "Alcohol"],
    storage: "Store in a cool, dry place. Discard if tablets smell like vinegar."
  },
  omeprazole: {
    genericName: "Omeprazole",
    brandNames: ["Prilosec", "Losec", "Zegerid", "Omez"],
    uses: ["Gastroesophageal reflux disease (GERD)", "Peptic ulcers", "Zollinger-Ellison syndrome", "Acid reduction"],
    dosage: "Adults: 20-40mg once daily before breakfast. Take 30-60 minutes before eating.",
    sideEffects: ["Headache", "Nausea", "Diarrhea", "Abdominal pain", "Long-term: B12 deficiency"],
    precautions: ["Long-term use may affect bone density", "Monitor magnesium levels", "Take before meals"],
    interactions: ["Clopidogrel", "Warfarin", "Digoxin", "Iron supplements"],
    storage: "Store at room temperature in original container. Protect from moisture."
  },
  loratadine: {
    genericName: "Loratadine",
    brandNames: ["Claritin", "Alavert", "Lorfast", "Clarityne"],
    uses: ["Seasonal allergies", "Allergic rhinitis", "Chronic urticaria", "Hay fever"],
    dosage: "Adults and children over 6: 10mg once daily. Children 2-5: 5mg once daily.",
    sideEffects: ["Headache", "Drowsiness (less than other antihistamines)", "Dry mouth", "Fatigue"],
    precautions: ["Non-drowsy formula", "Safe for daily use", "Consult doctor for liver problems"],
    interactions: ["Ketoconazole", "Erythromycin", "Cimetidine"],
    storage: "Store at room temperature. Keep in original blister pack until use."
  }
};

export const findMedicine = (query: string): MedicineInfo | null => {
  const lowerQuery = query.toLowerCase();
  
  // Check generic name matches
  for (const [key, medicine] of Object.entries(medicineDatabase)) {
    if (lowerQuery.includes(key) || 
        medicine.genericName.toLowerCase().includes(lowerQuery) ||
        medicine.brandNames.some(brand => lowerQuery.includes(brand.toLowerCase()))) {
      return medicine;
    }
  }
  
  return null;
};

export const formatMedicineInfo = (medicine: MedicineInfo): string => {
  return `**${medicine.genericName}**

**Brand Names:** ${medicine.brandNames.join(', ')}

**Uses:** ${medicine.uses.join(', ')}

**Dosage:** ${medicine.dosage}

**Side Effects:** ${medicine.sideEffects.join(', ')}

**Precautions:** ${medicine.precautions.join(', ')}

**Drug Interactions:** ${medicine.interactions.join(', ')}

**Storage:** ${medicine.storage}

⚠️ **Important:** This information is for educational purposes only. Always consult your healthcare provider before starting, stopping, or changing any medication.`;
};
