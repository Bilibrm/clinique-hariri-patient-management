'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { getPatientById } from '../../services/patientService';
import { Patient } from '@/types';
import Spinner from '@/components/ui/Spinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { PrinterIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { format, differenceInYears } from 'date-fns';
import toast from 'react-hot-toast';
import PrintModal from '@/components/ui/PrintModal';
import PatientHealthCard from './PatientHealthCard';

interface PatientDetailsProps {
    patientId: string;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId }) => {
    const router = useRouter();
    const [isPrintModalOpen, setPrintModalOpen] = useState(false);
    
    const { data: patient, error, isLoading } = useSWR<Patient>(
        `patient_${patientId}`, 
        () => getPatientById(patientId)
    );

    const handlePrint = () => {
        setPrintModalOpen(true);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (error || !patient) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <ErrorMessage message="لم يتم العثور على المريض." details="قد يكون المريض قد تم حذفه أو أن الرابط غير صحيح." />
            </div>
        );
    }

    const age = differenceInYears(new Date(), new Date(patient.birthdate));

    const DetailItem: React.FC<{ label: string; value: any; className?: string }> = ({ label, value, className = '' }) => (
        <div 
            className={`${className}`}
        >
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{value || '-'}</p>
        </div>
    );

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">رؤية معلومات المريض</h1>
                    <p className="text-gray-500 dark:text-gray-400">معلومات المريض</p>
                </div>
                <button
                    onClick={() => router.push('/patients')}
                    className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                    <XMarkIcon className="h-6 w-6" />
                    <span className="me-2">إغلاق</span>
                </button>
            </div>

            <div className="rounded-lg bg-white shadow-md dark:bg-gray-800 pb-5">
                <div className="h-40 rounded-t-lg bg-brand-blue"></div>
                <div className="-mt-14 flex items-end justify-between px-8">
                    <div className="flex items-end gap-4">
                        <Image
                            src={patient.avatar || '/default-avatar.png'}
                            alt={patient.fullname}
                            width={112}
                            height={112}
                            className="h-28 w-28 rounded-lg border-4 border-white bg-white object-cover shadow-lg dark:border-gray-800"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{patient.fullname}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">الإسم الكامل</p>
                        </div>
                    </div>
                    <button
                        onClick={handlePrint}
                        className="flex items-center rounded-lg bg-brand-blue px-4 py-2 text-white shadow-lg transition-colors hover:bg-brand-blue/90"
                    >
                        <PrinterIcon className="h-5 w-5" />
                        <span className="me-2">طباعة بطاقة للمريض</span>
                    </button>
                </div>
                
                    
            </div>
            <div className="p-8 mt-10 rounded-lg bg-white shadow-md dark:bg-gray-800" dir="rtl">
                <div className="flex justify-start">
                    <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white" dir="rtl"> حول المريض :</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Row 1 */}
                    <DetailItem label="الإسم الكامل" value={patient.fullname} />
                    <DetailItem label="العمر" value={age} />
                    <DetailItem label="تاريخ الميلاد" value={format(new Date(patient.birthdate), 'yyyy/MM/dd')} />
                    <DetailItem label="الجنس" value={patient.gender.value === 'male' ? 'ذكر' : 'أنثى'} />
                    <DetailItem label="زمرة الدم" value={patient.blood_type.value} />

                    {/* Row 2 */}
                    <DetailItem label="رقم جواز السفر" value={patient.passport_number || '-'} />
                    <DetailItem label="رقم التأمين" value={patient.insurance_number || '-'} />
                    <DetailItem label="رقم الهاتف" value={patient.phone}  />
                    <DetailItem label="العنوان" value={patient.full_address} />

                    {/* Row 3 */}
                    <DetailItem label="شركة التأمين" value={patient.insurance_society_branch?.name ?? 'غير محدد'} />
                    <DetailItem label="رقم المريض" value={patient.patient_number || '1234'} />
                </div>
            </div>

            <PrintModal isOpen={isPrintModalOpen} onClose={() => setPrintModalOpen(false)}>
                <PatientHealthCard patient={patient} />
            </PrintModal>
        </div>
    );
};

export default PatientDetails;
