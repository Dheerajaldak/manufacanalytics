# Geriatric Care Assessment Form

A single-page Geriatric Care Assessment form built with React 19, Mantine, and Zod 4 for visiting nurses conducting in-home geriatric evaluations.

## Tech Stack

- **React 19**
- **TypeScript**
- **Mantine 9** (`@mantine/core`, `@mantine/form`, `@mantine/dates`, `@mantine/hooks`)
- **Zod 4** (Standard Schema integration via Mantine's `schemaResolver`)
- **Vitest & React Testing Library**

## Features & Implementation Details

1. **10 Assessment Fields**:
   - `mrn`: Medical record number (`MRN-\d{6}`)
   - `patientName`: Patient name (2 to 60 characters)
   - `dateOfBirth`: Date of birth (ISO date string, patient must be 60+ on assessment date)
   - `assessmentDate`: Assessment date (ISO date string, max date today)
   - `mobility`: Select populated dynamically from `MOBILITY` array with formatted labels
   - `barthelIndex`: Barthel Index score (0 to 100, step 5)
   - `medicationCount`: Regular medication count (0 to 30)
   - `pharmacistReviewRequested`: Checkbox, required if 5+ medications (polypharmacy)
   - `followUpDate`: Next review date (ISO date string, must be after assessment date)
   - `consentObtained`: Checkbox consent (must be checked to save)

2. **Schema & Validation**:
   - Validated purely using `schemaResolver(assessmentSchema)`.
   - No duplicate handwritten interfaces: input types are derived directly from `Assessment` (`z.infer<typeof assessmentSchema>`).
   - Untouched fields remain quiet; validation triggers on blur and on submit.
   - Built-in Mantine input error presentation under each field.

3. **Sample Patient & Submission**:
   - "Load sample patient" pre-fills the form with valid fixture data.
   - On valid submit, simulates an 800ms save operation with button loading state and presents a success Alert displaying the parsed Zod output in a code block.

## Getting Started

### Prerequisites

- Node.js (>= 20)
- Corepack / Yarn 4

### Installation

```bash
corepack yarn install
```

### Development

```bash
corepack yarn dev
```

### Running Tests and Verification

Runs typecheck, linting, formatting checks, Vitest test suite, and production build:

```bash
corepack yarn test
```

To run tests only:

```bash
corepack yarn vitest
```

## Testing Coverage

- **Schema safeParse**: Validates age boundary logic (patient exactly 60 on assessment date vs. one day short).
- **Component Integration**: Loads the sample patient, triggers submit, and verifies the save handler is called with parsed values.

## Development Notes

- **Unfinished / Next Steps**: Everything in scope is complete and verified with passing test suites.
