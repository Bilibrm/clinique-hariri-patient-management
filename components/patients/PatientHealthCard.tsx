'use client';
import React from 'react';
import { Patient } from '@/types';
import { differenceInYears } from 'date-fns';

interface PatientHealthCardProps {
    patient: Patient;
}

const PatientHealthCard: React.FC<PatientHealthCardProps> = ({ patient }) => {
    const age = differenceInYears(new Date(), new Date(patient.birthdate));

    return (
        <div 
            id="printable-area" 
            className="relative w-[600px] h-[300px] bg-white shadow-lg overflow-hidden"
            dir='ltr'
        >
            {/* Header */}
            <div className="absolute top-0 left-0 w-full h-12 bg-green-700 flex items-center px-4 z-10">
                <p className="text-white text-xs font-bold">VOUS ETES ENTRE LES BONNES MAINS</p>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-16 bg-green-500 transform -skew-x-12 origin-top-left"></div>
            <div className="absolute top-0 right-16 w-1/2 h-16 bg-blue-500 transform -skew-x-12 origin-top-left"></div>

            {/* Background Pattern */}
            <div 
                className="absolute top-1/2 rounded-full opacity-50 right-0 transform -translate-y-1/2 w-32 h-32 bg-repeat"
                style={{ backgroundImage: 'radial-gradient(#a0aec0 1px, transparent 1px)', backgroundSize: '8px 8px' }}
            ></div>

            <div 
                className="absolute top-1/2 rounded-full opacity-50 left-0 transform -translate-y-1/2 w-32 h-32 bg-repeat"
                style={{ backgroundImage: 'radial-gradient(#a0aec0 1px, transparent 1px)', backgroundSize: '8px 8px' }}
            ></div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 w-full h-10 bg-blue-500"></div>

            {/* Card Content */}
            <div className="relative z-20 p-4 flex items-center h-full">
                <div className="w-1/3 text-center justify-center flex items-center">
                    
                        <img 
                            src='/logoc2.png'
                            alt="Patient Photo" 
                            className="w-25 h-25"
                        />
                  
                  
                </div>
                <div className="w-2/3  p-5">
                    <h1 className="text-3xl font-bold text-center mb-4">CARTE DE SANTE</h1>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <p className="font-bold">Nom:</p><p>{patient.fullname}</p>
                        <p className="font-bold">Matricule ID:</p><p>{patient.patient_number}</p>
                        <p className="font-bold">Age:</p><p>{age} ANS</p>
                        <p className="font-bold">Adresse:</p><p>{patient.full_address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientHealthCard;
