import PatientList from '@/components/patients/PatientList';

// This is the main entry point for the patient list.
// We keep the main component client-side to handle interactivity like search and pagination.
export default function PatientListPage() {
  return <PatientList />;
}
