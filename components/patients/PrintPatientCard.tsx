'use client';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { getPatientById } from '@/services/patientService';
import { Patient } from '@/types';
import Spinner from '@/components/ui/Spinner';
import Image from 'next/image';
import { differenceInYears } from 'date-fns';

interface PrintPatientCardProps {
    patientId: string;
}

const PrintPatientCard: React.FC<PrintPatientCardProps> = ({ patientId }) => {
    const { data: patient, error, isLoading } = useSWR<Patient>(
        `patient_${patientId}`,
        () => getPatientById(patientId)
    );

    useEffect(() => {
        if (patient && !isLoading) {
            const timer = setTimeout(() => {
                window.print();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isLoading, patient]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Spinner /></div>;
    }

    if (error || !patient) {
        return <div className="p-8 text-center">لم يتم العثور على المريض.</div>;
    }

    const age = differenceInYears(new Date(), new Date(patient.birthdate));

    return (
        <div className="flex h-screen items-center justify-center bg-gray-200">
            <div 
                id="printable-area" 
                className="relative w-[498px] h-[225px] bg-white shadow-lg overflow-hidden"
            >
                {/* Header */}
                <div className="absolute top-0 left-0 w-full h-12 bg-gray-700 flex items-center px-4 z-10">
                    <p className="text-white text-xs font-bold">VOUS ETES ENTRE LES BONNES MAINS</p>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-16 bg-green-500 transform -skew-x-12 origin-top-left"></div>
                <div className="absolute top-0 right-16 w-1/2 h-16 bg-blue-500 transform -skew-x-12 origin-top-left"></div>

                {/* Background Pattern */}
                <div 
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 w-32 h-32 bg-repeat"
                    style={{ backgroundImage: 'radial-gradient(#a0aec0 1px, transparent 1px)', backgroundSize: '8px 8px' }}
                ></div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 w-full h-10 bg-blue-500"></div>

                {/* Card Content */}
                <div className="relative z-20 p-4 flex items-center h-full">
                    <div className="w-1/3 text-center">
                        <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center border-4 border-white shadow-md">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        </div>
                        <h2 className="text-sm font-bold mt-2">CLINIQUE HARIRI</h2>
                        <p className="text-xs">INTERNATIONALE</p>
                        <p className="text-xs">مستشفى الحريري العالمي</p>
                    </div>
                    <div className="w-2/3 pr-4">
                        <h1 className="text-xl font-bold text-center mb-4">CARTE DE SANTE</h1>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <p className="font-bold">Nom:</p><p>{patient.fullname}</p>
                            <p className="font-bold">Matricule ID:</p><p>{patient.patient_number}</p>
                            <p className="font-bold">Age:</p><p>{age} ANS</p>
                            <p className="font-bold">Adresse:</p><p>{patient.full_address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintPatientCard;
