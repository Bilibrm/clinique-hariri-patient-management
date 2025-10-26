import EditPatient from '@/components/patients/EditPatient';

export default function EditPatientPage({ params }: { params: { id: string } }) {
    return <EditPatient patientId={params.id} />;
}
