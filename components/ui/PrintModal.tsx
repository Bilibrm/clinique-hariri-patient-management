'use client';
import React from 'react';
import { XMarkIcon, PrinterIcon } from '@heroicons/react/24/outline';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PrintModal: React.FC<PrintModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printableArea = document.getElementById('printable-area');
    if (printableArea) {
      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print Card</title>');
        // Inject TailwindCSS and other global styles
        const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
          .map(link => link.outerHTML)
          .join('');
        printWindow.document.write(stylesheets);
        printWindow.document.write('</head><body>');
        printWindow.document.write(printableArea.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="relative w-auto rounded-lg bg-white p-20 shadow-lg dark:bg-gray-800 ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="mb-6">
          {children}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            إلغاء
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center rounded-lg bg-brand-blue px-4 py-2 text-white hover:bg-brand-blue/90"
          >
            <PrinterIcon className="me-2 h-5 w-5" />
            طباعة
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintModal;
