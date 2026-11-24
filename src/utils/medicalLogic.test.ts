import { describe, expect, it } from 'vitest';
import { analyzeMedicalQuery, containsPhrase, matchSymptoms } from './medicalLogic';
import { findMedicine } from './medicineDatabase';

describe('containsPhrase', () => {
  it('matches whole words only', () => {
    expect(containsPhrase('I have a cold', 'cold')).toBe(true);
    expect(containsPhrase('my teacher will scold me', 'cold')).toBe(false);
    expect(containsPhrase('I have heartburn', 'heart')).toBe(false);
  });

  it('ignores case', () => {
    expect(containsPhrase('Bad HEADACHE today', 'headache')).toBe(true);
  });
});

describe('matchSymptoms', () => {
  it('returns the most severe symptom first', () => {
    const names = matchSymptoms('I have a cough and chest pain').map(r => r.name);
    expect(names).toEqual(['chest pain', 'cough']);
  });

  it('finds nothing in unrelated text', () => {
    expect(matchSymptoms('can you edit this photo')).toHaveLength(0);
  });
});

describe('findMedicine', () => {
  it('matches generic and brand names', () => {
    expect(findMedicine('tell me about paracetamol')?.genericName).toMatch(/Paracetamol/);
    expect(findMedicine('is Dolo safe')?.genericName).toMatch(/Paracetamol/);
    expect(findMedicine('what is acetaminophen')?.genericName).toMatch(/Paracetamol/);
  });

  it('does not match short or partial words', () => {
    expect(findMedicine('a')).toBeNull();
    expect(findMedicine('para')).toBeNull();
  });
});

describe('analyzeMedicalQuery', () => {
  it('flags chest pain as high severity', () => {
    expect(analyzeMedicalQuery('sharp chest pain since morning').severity).toBe('high');
  });

  it('prefers a named medicine over symptoms', () => {
    const response = analyzeMedicalQuery('can I take ibuprofen for a headache');
    expect(response.message).toMatch(/Ibuprofen/);
  });

  it('mentions other symptoms when several are present', () => {
    const response = analyzeMedicalQuery('fever and a sore throat');
    expect(response.severity).toBe('medium');
    expect(response.recommendation).toMatch(/sore throat/);
  });

  it('falls back to a help message', () => {
    expect(analyzeMedicalQuery('hello there').message).toMatch(/couldn't identify/);
  });
});
