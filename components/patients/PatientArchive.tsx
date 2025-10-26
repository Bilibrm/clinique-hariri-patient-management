'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { getPatientById, getMedicalServicesForPatient, getMedicalRecordsForPatient } from '../../services/patientService';
import { Patient, MedicalService, MedicalRecord } from '@/types';
import Spinner from '@/components/ui/Spinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import MedicalServicesList from '../MedicalServicesList';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface PatientArchiveProps {
  patientId: string;
}

const PatientArchive: React.FC<PatientArchiveProps> = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState('informations');

  const { data: patient, error: patientError } = useSWR<Patient>(
    `patient_${patientId}`,
    () => getPatientById(patientId)
  );

  const { data: medicalServices, error: servicesError } = useSWR<MedicalService[]>(
    `patient_services_${patientId}`,
    () => getMedicalServicesForPatient(patientId)
  );

  const { data: medicalRecords, error: recordsError } = useSWR<MedicalRecord[]>(
    `patient_records_${patientId}`,
    () => getMedicalRecordsForPatient(patientId)
  );

  const isLoading = !patient && !patientError;

  const tabs = [
    { id: 'informations', name: 'قسم معلومات المريض' },
    { id: 'diseases', name: 'قسم الأمراض المزمنة' },
    { id: 'prescriptions', name: 'قسم الوصفات الطبية' },
    { id: 'surgeries', name: 'قسم العمليات الجراحية' },
    { id: 'services', name: 'قسم الإقامات الطبية' },
  ];

  if (isLoading) {
    return <Spinner />;
  }

  if (patientError || !patient) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <ErrorMessage message="لم يتم العثور على المريض." details="قد يكون المريض قد تم حذفه أو أن الرابط غير صحيح." />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            أرشيف المريض
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            إدارة الأرشيف الخاص بالمريض بكل سهولة
          </p>
        </div>
        <Link
          href="/patients"
          className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
          <span className="me-2">إغلاق</span>
        </Link>
      </div>

      {/* Patient header section - same as in PatientDetails */}
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
        </div>
      </div>

      <div className="relative mt-6">
        <div className="relative rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
          <div className="mb-8 border-b border-gray-200 dark:border-gray-700 ">
            <div className="overflow-x-auto bg-brand-blue rounded-t-lg border-4 border-brand-blue">
                <nav className="flex gap-4 whitespace-nowrap border-gray-200 dark:border-gray-700 ">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-4 py-3 text-lg font-semibold transition-colors duration-300 focus:outline-none ${
                            activeTab === tab.id
                                ? 'border-brand-blue text-brand-blue border-b-2 bg-white rounded-t-lg'
                                : 'text-sky-100 hover:text-sky-50 dark:text-sky-100 hover:text-sky-50 '
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>
          </div>

          <div>
            {activeTab === 'informations' && (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3" dir='ltr'>
                <div className="lg:col-span-2" dir='rtl'>
                  <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">السجل الطبي للمريض</h3>
                    <p className="mb-6 text-gray-500 dark:text-gray-400">توثيق شامل لتاريخ المريض الصحي.</p>
                    {/* Medical Record Timeline */}
                    <div className="space-y-8">
                      {medicalRecords?.map((record, index) => (
                        <div key={record.id} className="flex items-start">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                            {/* Replace with an appropriate icon */}
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          </div>
                          <div className="ms-4 flex-grow">
                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{record.type} - {record.title}</h4>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(record.date).toLocaleDateString()}</span>
                              </div>
                              <p className="mt-2 text-gray-600 dark:text-gray-300">{record.details}</p>
                              <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  د. {record.doctor}
                                </div>
                                <button className="text-brand-blue hover:underline">
                                  عرض التفاصيل
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1" dir='rtl'>
                  <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">معلومات المريض</h3>
                    <p className="mb-6 text-gray-500 dark:text-gray-400">معلومات أساسية عن المريض.</p>
                    <div className="space-y-4">

                      <div className="grid grid-cols-2 gap-4">
                        <div className='grid grid-cols-2'>
                          <span className="font-bold text-gray-600 dark:text-gray-300 text-start ">رقم المعرف</span>
                          <span className="text-end font-bold">:</span>
                        </div>
                        <span className="text-gray-800 dark:text-white text-start">{patient.patient_number}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className='grid grid-cols-2 '>
                          <span className="font-bold text-gray-600 dark:text-gray-300 text-start">الاسم الكامل</span>
                          <span className="font-bold text-end">:</span>
                        </div>
                        <span className="text-gray-800 dark:text-white text-start">{patient.fullname}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className='grid grid-cols-2 '>
                        <span className="font-bold text-gray-600 dark:text-gray-300 text-start">تاريخ الميلاد</span>
                        <span className="text-end font-bold">:</span>
                      </div>

                        <span className="text-gray-800 dark:text-white text-start">{new Date(patient.birthdate).toLocaleDateString()}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className='grid grid-cols-2 '>
                        <span className="font-bold text-gray-600 dark:text-gray-300 text-start">الجنس</span>
                        <span className="text-end font-bold">:</span>
                        </div>

                        <span className="text-gray-800 dark:text-white text-start">{patient.gender.value === 'male' ? 'ذكر' : 'أنثى'}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className='grid grid-cols-2 '>
                        <span className="font-bold text-gray-600 dark:text-gray-300 text-start">زمرة الدم</span>
                                                <span className="text-end font-bold">:</span>
</div>
                        <span className="text-gray-800 dark:text-white">{patient.blood_type.value}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className='grid grid-cols-2 '>
                        <span className="font-semibold text-gray-600 dark:text-gray-300">العنوان</span>
                                                <span className="text-end font-bold">:</span>
</div>
                        <span className="text-gray-800 dark:text-white">{patient.full_address}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                                                 <div className='grid grid-cols-2 '>

                        <span className="font-semibold text-gray-600 dark:text-gray-300">رقم الهاتف</span>
                                                <span className="text-end font-bold">:</span>
</div>

                        <span className="text-gray-800 dark:text-white">{patient.phone}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                                                 <div className='grid grid-cols-2 '>

                        <span className="font-semibold text-gray-600 dark:text-gray-300">رقم جواز السفر</span>
                                                <span className="text-end font-bold">:</span>
</div>
                        <span className="text-gray-800 dark:text-white">{patient.passport_number}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                                                 <div className='grid grid-cols-2 '>

                        <span className="font-semibold text-gray-600 dark:text-gray-300">شركة التأمين</span>
                                                <span className="text-end font-bold">:</span>
                                                </div>

                        <span className="text-gray-800 dark:text-white">{patient.insurance_society_branch?.name}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                                                 <div className='grid grid-cols-2 '>

                        <span className="font-semibold text-gray-600 dark:text-gray-300">الشركة الفرعية</span>
                                                <span className="text-end font-bold">:</span>
                                                </div>

                        <span className="text-gray-800 dark:text-white">{patient.insurance_society_branch?.name}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                                                 <div className='grid grid-cols-2 '>

                        <span className="font-semibold text-gray-600 dark:text-gray-300">رقم التأمين</span>
                                                <span className="text-end font-bold">:</span>
                                                </div>

                        <span className="text-gray-800 dark:text-white">{patient.insurance_number}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'services' && (
              <MedicalServicesList services={medicalServices || []} />
            )}
            {activeTab !== 'services' && activeTab !== 'informations' && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                لا توجد بيانات لعرضها في هذا القسم.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientArchive;
