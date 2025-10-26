
import React from 'react';
import { MedicalRecord } from '../types';
import { ClockIcon, UserIcon } from '@heroicons/react/24/outline';

interface MedicalRecordsListProps {
    records: MedicalRecord[];
}

const MedicalRecordsList: React.FC<MedicalRecordsListProps> = ({ records }) => {
    return (
        <div className="flex flex-col">
            {records.map((record, index) => (
                 <div key={record.id} className="flex">
                    <div className="flex flex-col items-center mr-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800">
                           <ClockIcon className="h-6 w-6 text-brand-blue dark:text-blue-400" />
                        </div>
                        {index < records.length - 1 && (
                            <div className="w-px h-full bg-gray-200 dark:bg-gray-700 my-2"></div>
                        )}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex-1 mb-6">
                        <h4 className="font-bold text-gray-800 dark:text-gray-200">{record.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 my-2">{record.details}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
                            <span className="flex items-center"><UserIcon className="w-4 h-4 me-1"/> {record.doctor}</span>
                            <span className="flex items-center"><ClockIcon className="w-4 h-4 me-1"/> {record.date} - {record.time}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MedicalRecordsList;