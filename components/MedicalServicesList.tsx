import React, { useState } from 'react';
import { MedicalService } from '../types';
import { PrinterIcon, CalendarIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';

// Mock Data as requested
const mockServices: MedicalService[] = Array.from({ length: 16 }).map((_, i) => ({
    id: `${i + 1}`,
    doctor: 'د. محمد السالم',
    analysisNumber: `12345`,
    status: i % 2 === 0 ? 'مسودة' : 'مكتمل',
    date: '30/09/2025',
    time: '14:35',
}));

interface MedicalServicesListProps {
    // services prop is currently unused as we are using mock data
    services: MedicalService[];
}

const ServiceCard: React.FC<{ service: MedicalService }> = ({ service }) => (
    <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${service.status === 'مسودة' ? 'bg-blue-100' : 'bg-green-100'}`}>
            {service.status === 'مسودة' ? (
                <svg className="h-10 w-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            ) : (
                <DocumentChartBarIcon className="h-10 w-10 text-green-500" />
            )}
        </div>
        <p className="font-semibold text-gray-800 dark:text-gray-200">طبيب: {service.doctor}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">رقم التحليل: {service.analysisNumber}</p>
        <div className="my-3">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${service.status === 'مسودة' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                {service.status}
            </span>
        </div>
        <button className="mb-3 flex w-full items-center justify-center rounded-lg bg-blue-100 py-2 text-sm text-blue-600 hover:bg-blue-200">
            <PrinterIcon className="me-2 h-4 w-4" />
            طباعة
        </button>
        <p className="text-xs text-gray-400">{service.date} {service.time}</p>
    </div>
);

const MedicalServicesList: React.FC<MedicalServicesListProps> = ({ services }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 8;

    // Use mock data
    const totalPages = Math.ceil(mockServices.length / servicesPerPage);
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = mockServices.slice(indexOfFirstService, indexOfLastService);

    const paginate = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        <div className="rounded-lg border-2 border-blue-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">قسم الخدمات الطبية</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">تحاليل طبية خاصة بالمريض</p>
                </div>
                <button className="rounded-lg bg-blue-100 p-3 text-blue-600 hover:bg-blue-200">
                    <CalendarIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentServices.map(service => <ServiceCard key={service.id} service={service} />)}
            </div>
            {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center">
                    <nav className="flex items-center gap-2 text-sm">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 text-gray-600 hover:text-blue-500 disabled:opacity-50 dark:text-gray-400">
                            {'< السابقة'}
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`h-8 w-8 rounded-md transition-colors ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                            >
                                {number}
                            </button>
                        ))}
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 text-gray-600 hover:text-blue-500 disabled:opacity-50 dark:text-gray-400">
                            {'التالية >'}
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default MedicalServicesList;
