'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPatient } from '@/services/patientService';
import { Patient, PatientCreate } from '@/types';
import Spinner from '@/components/ui/Spinner';
import PatientForm from '@/components/patients/PatientForm';
import Modal from '@/components/ui/Modal';
import PageHeader from '@/components/ui/PageHeader';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const AddPatient: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [newPatientId, setNewPatientId] = useState<string | number | null>(null);

  const router = useRouter();

  const handleSave = async (patientData: PatientCreate) => {
    setLoading(true);
    try {
      const newPatient = await addPatient(patientData);
      setNewPatientId(newPatient.id);
      setSuccessModalOpen(true);
      toast.success('تم إضافة المريض بنجاح');
    } catch (error) {
      toast.error('فشل في إضافة المريض');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    router.push('/patients');
  }

  return (
    <>
      <PageHeader
        title="إضافة مريض جديد"
        subtitle="إضافة معلومات المريض"
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
              <span className="me-2">إلغاء</span>
            </button>
            <button
              type="submit"
              form="patient-form" // This targets the form inside PatientForm
              disabled={loading}
              className="flex items-center rounded-lg bg-brand-blue px-4 py-2 text-white shadow transition-colors hover:bg-brand-blue/90 disabled:opacity-50"
            >
              <CheckIcon className="h-5 w-5" />
              <span className="me-2">حفظ</span>
            </button>
          </div>
        }
      />

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <PatientForm onSave={handleSave} />
      )}

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        title="تم حفظ المعلومات بنجاح"
        confirmText="طباعة"
        onConfirm={() => {
          if (newPatientId) {
            window.open(`/patients/${newPatientId}/print`, '_blank');
          }
        }}
        cancelText="الرجوع إلى الاستقبال"
        onCancel={handleCloseSuccessModal}
        showIcon={true}
      >
        <p className="text-center text-gray-600 dark:text-gray-300">
          تم الحفظ بنجاح. هل تريد طباعة البطاقة؟
        </p>
      </Modal>
    </>
  );
};

export default AddPatient;