import PatientArchive from '@/components/patients/PatientArchive';

export default function PatientArchivePage({ params }: { params: { id: string } }) {
    return <PatientArchive patientId={params.id} />;
}
