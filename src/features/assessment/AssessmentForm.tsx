import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  Input,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { SAMPLE_PATIENT } from './fixtures';
import { Assessment, assessmentSchema, MOBILITY } from './schema';

export type AssessmentFormValues = {
  [K in keyof Assessment]: Assessment[K] extends boolean ? boolean : Assessment[K] | '';
};

const initialValues: AssessmentFormValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: '',
  assessmentDate: '',
  mobility: '',
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: '',
  consentObtained: false,
};

const formatMobilityLabel = (value: string): string =>
  value
    .split(/[_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const mobilityOptions = MOBILITY.map((value) => ({
  value,
  label: formatMobilityLabel(value),
}));

export interface AssessmentFormProps {
  onSave?: (assessment: Assessment) => void | Promise<void>;
}

export function AssessmentForm({ onSave }: AssessmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<Assessment | null>(null);

  const form = useForm<AssessmentFormValues>({
    mode: 'controlled',
    initialValues,
    validateInputOnBlur: true,
    validate: schemaResolver(assessmentSchema),
  });

  const handleSubmit = async (values: AssessmentFormValues) => {
    setIsSubmitting(true);
    try {
      const parsed = assessmentSchema.parse(values);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmittedData(parsed);
      await onSave?.(parsed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadSample = () => {
    form.setValues(SAMPLE_PATIENT);
    form.clearErrors();
  };

  const today = dayjs().format('YYYY-MM-DD');

  return (
    <Container size="sm" py="xl">
      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Title order={2} mb="lg">
          Geriatric Care Assessment
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Medical record number"
              placeholder="MRN-004821"
              key={form.key('mrn')}
              {...form.getInputProps('mrn')}
            />

            <TextInput
              label="Patient name"
              key={form.key('patientName')}
              {...form.getInputProps('patientName')}
            />

            <DateInput
              label="Date of birth"
              valueFormat="YYYY-MM-DD"
              key={form.key('dateOfBirth')}
              {...form.getInputProps('dateOfBirth')}
            />

            <DateInput
              label="Assessment date"
              valueFormat="YYYY-MM-DD"
              maxDate={today}
              key={form.key('assessmentDate')}
              {...form.getInputProps('assessmentDate')}
            />

            <Select
              label="Mobility"
              data={mobilityOptions}
              key={form.key('mobility')}
              {...form.getInputProps('mobility')}
            />

            <NumberInput
              label="Barthel Index"
              step={5}
              min={0}
              max={100}
              key={form.key('barthelIndex')}
              {...form.getInputProps('barthelIndex')}
            />

            <NumberInput
              label="Regular medications"
              min={0}
              max={30}
              key={form.key('medicationCount')}
              {...form.getInputProps('medicationCount')}
            />

            <Checkbox
              label="Pharmacist review requested"
              key={form.key('pharmacistReviewRequested')}
              {...form.getInputProps('pharmacistReviewRequested', { type: 'checkbox' })}
            />

            <DateInput
              label="Next review date"
              valueFormat="YYYY-MM-DD"
              key={form.key('followUpDate')}
              {...form.getInputProps('followUpDate')}
            />

            <Input.Wrapper id="consentObtained" label="Consent">
              <Checkbox
                id="consentObtained"
                label="Patient or representative has given consent"
                key={form.key('consentObtained')}
                {...form.getInputProps('consentObtained', { type: 'checkbox' })}
              />
            </Input.Wrapper>

            <Group justify="space-between" mt="md">
              <Button type="button" variant="default" onClick={handleLoadSample}>
                Load sample patient
              </Button>

              <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
                Save assessment
              </Button>
            </Group>
          </Stack>
        </form>

        {submittedData && (
          <Alert color="green" title="Assessment saved" mt="lg">
            <Code block mt="xs">
              {JSON.stringify(submittedData, null, 2)}
            </Code>
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
