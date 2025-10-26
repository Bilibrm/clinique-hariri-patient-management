import PrintPatientCard from '@/components/patients/PrintPatientCard';

export default function PrintPage({ params }: { params: { id: string } }) {
  return <PrintPatientCard patientId={params.id} />;
}
