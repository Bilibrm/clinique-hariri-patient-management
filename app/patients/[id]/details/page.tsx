import PatientDetails from '@/components/patients/PatientDetails';

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
    return <PatientDetails patientId={params.id} />;
}
