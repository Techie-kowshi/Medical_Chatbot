# Medical Chatbot

A browser-based assistant that answers questions about common symptoms and over-the-counter medicines.

Team project by J Kowshik and K S Vinay Sathvik, completed in the first year of the B.E. in Artificial Intelligence and Machine Learning at B.N.M. Institute of Technology, Bengaluru.

## How it works

The assistant is rule-based and runs entirely in the browser; no model or server is involved.

- `src/utils/medicalLogic.ts` matches keywords in the user's message against ten symptom groups (fever, headache, cough, cold, stomach pain, sore throat, allergies, chest pain, back pain, general medicine queries). Each match returns a message, a severity level (low, medium or high) and a self-care recommendation with guidance on when to see a doctor.
- `src/utils/medicineDatabase.ts` holds structured entries for eight medicines (paracetamol, ibuprofen, cetirizine, amoxicillin, metformin, aspirin, omeprazole, loratadine): brand names, uses, dosage, side effects, precautions, interactions and storage. A medicine name in the query takes priority over symptom matching.
- `src/components/MedicalChatbot.tsx` and `ChatMessage.tsx` render the chat, with severity shown on each response.

## Running

```sh
npm install
npm run dev
```

Built with Vite, React, TypeScript, Tailwind CSS and shadcn/ui.

## Disclaimer

This is a student project for general information only. It does not diagnose conditions and is not a substitute for advice from a qualified healthcare professional.
