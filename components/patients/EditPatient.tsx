'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { updatePatient, getPatientById } from '@/services/patientService';
import { Patient, PatientCreate } from '@/types';
import Spinner from '@/components/ui/Spinner';
import PatientForm from '@/components/patients/PatientForm';
import PageHeader from '@/components/ui/PageHeader';
import toast from 'react-hot-toast';

interface EditPatientProps {
    patientId: string;
}

const EditPatient: React.FC<EditPatientProps> = ({ patientId }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { data: patient, error, isLoading } = useSWR<Patient>(
        patientId ? `patient_${patientId}` : null, 
        () => getPatientById(patientId)
    );
    
    useEffect(() => {
        if (error) {
            toast.error('فشل في جلب بيانات المريض');
            router.push('/patients');
        }
    }, [error, router]);

    const handleSave = async (patientData: PatientCreate) => {
        setLoading(true);
        try {
            await updatePatient(patientId, patientData);
            toast.success('تم تحديث بيانات المريض بنجاح');
            router.push('/patients');
        // FIX: Removed typo 'a_s' from catch block.
        } catch (error) {
            toast.error('فشل في تحديث بيانات المريض');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <PageHeader
                title="تعديل بيانات المريض"
                subtitle="تحديث معلومات المريض"
            />
            
            {isLoading || !patient ? (
                 <div className="flex justify-center"><Spinner /></div>
            ) : (
                <PatientForm 
                    onSave={handleSave} 
                    existingPatient={patient} 
                    isSaving={loading}
                />
            )}
        </div>
    );
};

export default EditPatient;
