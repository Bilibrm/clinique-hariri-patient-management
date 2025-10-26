
import React from 'react';
import { Patient } from '../types';

interface PatientHeaderProps {
    patient: Patient;
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ patient, title, subtitle, children }) => {
    return (
        <div className="mb-6">
            <div className="bg-gradient-to-l from-brand-blue to-brand-green dark:from-brand-dark-blue dark:to-brand-blue/50 p-6 h-48 rounded-lg relative">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{title}</h1>
                        <p className="text-white/80">{subtitle}</p>
                    </div>
                    <div>{children}</div>
                </div>
                <div className="absolute bottom-[-40px] start-10 flex items-center gap-4">
                    <img
                        // FIX: Use correct properties avatar and fullname
                        src={patient.avatar ?? undefined}
                        alt={patient.fullname}
                        className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                    />
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8">{patient.fullname}</h2>
                        <p className="text-gray-500 dark:text-gray-400">الإسم الكامل</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientHeader;