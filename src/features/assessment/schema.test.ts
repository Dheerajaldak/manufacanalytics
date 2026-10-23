import { describe, expect, it } from 'vitest';
import { SAMPLE_PATIENT } from './fixtures';
import { assessmentSchema } from './schema';

describe('assessmentSchema date of birth validation', () => {
  it('accepts date of birth when patient turns exactly 60 on assessment date and rejects when one day short', () => {
    const exactly60 = assessmentSchema.safeParse({
      ...SAMPLE_PATIENT,
      assessmentDate: '2026-08-07',
      dateOfBirth: '1966-08-07',
    });
    expect(exactly60.success).toBe(true);

    const oneDayShort = assessmentSchema.safeParse({
      ...SAMPLE_PATIENT,
      assessmentDate: '2026-08-07',
      dateOfBirth: '1966-08-08',
    });
    expect(oneDayShort.success).toBe(false);
    expect(
      !oneDayShort.success &&
        oneDayShort.error.issues.find((issue) => issue.path[0] === 'dateOfBirth')?.message
    ).toBe('This pathway is for patients aged 60 and over');
  });
});
