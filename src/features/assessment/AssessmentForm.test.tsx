import { render, screen } from '@test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AssessmentForm } from './AssessmentForm';
import { SAMPLE_PATIENT } from './fixtures';

describe('AssessmentForm component', () => {
  it('loads sample patient, submits, and calls save handler with parsed values', async () => {
    const handleSave = vi.fn();
    const user = userEvent.setup();

    render(<AssessmentForm onSave={handleSave} />);

    const loadSampleButton = screen.getByRole('button', { name: /load sample patient/i });
    await user.click(loadSampleButton);

    const submitButton = screen.getByRole('button', { name: /save assessment/i });
    await user.click(submitButton);

    expect(await screen.findByText('Assessment saved', {}, { timeout: 3000 })).toBeInTheDocument();
    expect(handleSave).toHaveBeenCalledWith(SAMPLE_PATIENT);
  });
});
