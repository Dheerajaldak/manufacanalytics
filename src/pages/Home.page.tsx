import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { AssessmentForm } from '../features/assessment/AssessmentForm';

export function HomePage() {
  return (
    <>
      <AssessmentForm />
      <ColorSchemeToggle />
    </>
  );
}
