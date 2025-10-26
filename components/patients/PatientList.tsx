'use client';
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import useSWR from 'swr';
import { motion } from 'framer-motion';

import { deletePatient, getPatients } from '@/services/patientService';
import { Patient } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';

import { PencilSquareIcon, TrashIcon, EyeIcon, PlusIcon, FunnelIcon, CalendarDaysIcon, MagnifyingGlassIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import Spinner from '@/components/ui/Spinner';
import Modal from '@/components/ui/Modal';
import PageHeader from '@/components/ui/PageHeader';
import Pagination from '@/components/ui/Pagination';
import toast from 'react-hot-toast';

const PatientListComponent: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // URL state is the source of truth
    const currentPage = Number(searchParams.get('page')) || 1;
    const patientsPerPage = Number(searchParams.get('per_page')) || 10;
    const searchTerm = searchParams.get('search') || '';

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState<number | null>(null);
    
    const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

    // Update URL on search term change
    React.useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('search', debouncedSearchTerm);
        params.set('page', '1'); // Reset to page 1 on new search
        router.push(`${pathname}?${params.toString()}`);
    }, [debouncedSearchTerm, pathname, router]);

    // SWR key now depends directly on URL params
    const { data: apiResponse, error, isLoading, mutate } = useSWR(
        `/patients?page=${currentPage}&per_page=${patientsPerPage}&search=${debouncedSearchTerm}`,
        () => getPatients({ page: currentPage, per_page: patientsPerPage, search: debouncedSearchTerm })
    );

    const patients = apiResponse?.data ?? [];
    const meta = apiResponse?.meta;

    const handleDeleteClick = (id: number) => {
        setPatientToDelete(id);
        setDeleteModalOpen(true);
    };
    
    const confirmDelete = async () => {
        if (patientToDelete) {
            try {
                await deletePatient(String(patientToDelete));
                toast.success('تم حذف المريض بنجاح');
                mutate();
            } catch (err: any) {
                const errorMessage = err?.response?.data?.message || err.message || 'فشل في حذف المريض';
                toast.error(errorMessage);
            } finally {
                setDeleteModalOpen(false);
                setPatientToDelete(null);
            }
        }
    };

    const handlePerPageChange = (value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('per_page', value.toString());
        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`);
    };
    
    return (
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <PageHeader
                title="قائمة المرضى"
                subtitle={`إدخال وإدارة المرضى بكل سهولة`}
                
            />

            <div className="mb-6 flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-2">

                
                <div className="relative max-w-md flex-grow">
                    <input
                        type="text"
                        placeholder="بحث"
                        className="w-full rounded-lg border border-gray-300 bg-white py-2 pe-10 ps-4 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue dark:border-gray-600 dark:bg-gray-700/50 dark:text-white"
                        value={localSearchTerm}
                        onChange={(e) => setLocalSearchTerm(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    
                </div>
                <div className="flex items-center gap-2">
                <select 
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700"
                        value={patientsPerPage}
                        onChange={(e) => handlePerPageChange(Number(e.target.value))}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <button className="flex items-center rounded-lg border border-gray-300 bg-brand-blue px-3 py-2 text-white transition-colors hover:bg-brand-blue/90 dark:border-gray-600  dark:text-gray-300 dark:hover:bg-gray-700">
                        <CalendarDaysIcon className="h-5 w-5" />
                    </button>
                    <button className="flex items-center rounded-lg border border-gray-300 bg-brand-blue px-3 py-2 text-white transition-colors hover:bg-brand-blue/90 dark:border-gray-600  dark:text-gray-300 dark:hover:bg-gray-700">
                        <FunnelIcon className="h-5 w-5" />
                    </button>
                    
                </div>
                
                </div>
                <Link href="/patients/new" className="flex items-center rounded-lg bg-brand-blue px-4 py-2 text-white shadow transition-colors hover:bg-brand-blue/90">
                        <PlusIcon className="h-5 w-5" />
                        <span className="me-2">إضافة مريض جديد</span>
                    </Link>
               
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-center" dir="rtl" >
                    <thead className="bg-[#E8F6F8] dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            </th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">#</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">المعرف</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">المريض</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">تاريخ التسجيل</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">الإجراء</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center">
                                    <Spinner />
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-red-500">
                                    فشل في تحميل البيانات.
                                </td>
                            </tr>
                        ) : patients.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    لا يوجد مرضى لعرضهم.
                                </td>
                            </tr>
                        ) : (
                            patients.map((patient: Patient, index: number) => (
                                <motion.tr 
                                    key={patient.id} 
                                    className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <td className="px-4 py-3">
                                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                        {meta ? (meta.current_page - 1) * meta.per_page + index + 1 : index + 1}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-mono text-gray-700 dark:text-gray-300">
                                        {patient.patient_number || '1234'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {patient.fullname}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                        {new Date(patient.created_at).toLocaleDateString('ar-DZ')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-1 justify-center" dir="ltr">
                                            <button 
                                                onClick={() => router.push(`/patients/${patient.id}/edit`)}
                                                className="rounded-full bg-green-100 p-1.5 text-green-600 transition-colors hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                                            >
                                                <PencilSquareIcon className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => router.push(`/patients/${patient.id}/details`)}
                                                className="rounded-full bg-blue-100 p-1.5 text-blue-600 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                                            >
                                                <EyeIcon className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(patient.id)} 
                                                className="rounded-full bg-red-100 p-1.5 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => router.push(`/patients/${patient.id}/archive`)}
                                                className="rounded-full bg-yellow-100 p-1.5 text-yellow-600 transition-colors hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50"
                                            >
                                                <ArchiveBoxIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {meta && (
                <Pagination 
                    currentPage={meta.current_page} 
                    totalPages={meta.last_page} 
                    perPage={meta.per_page} 
                />
            )}
            
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="تأكيد الحذف"
                confirmText="حذف"
            >
                <p>هل أنت متأكد من أنك تريد حذف هذا المريض؟ لا يمكن التراجع عن هذا الإجراء.</p>
            </Modal>
        </div>
    );
};

// Wrap the component in Suspense to handle the initial render of useSearchParams
const PatientList: React.FC = () => (
    <Suspense fallback={<div className="flex h-96 w-full items-center justify-center"><Spinner /></div>}>
        <PatientListComponent />
    </Suspense>
);

export default PatientList;