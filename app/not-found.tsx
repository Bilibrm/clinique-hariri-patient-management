import React from 'react';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-light-bg dark:bg-gray-900 text-center p-6">
        <ExclamationTriangleIcon className="w-16 h-16 text-yellow-500 mb-4" />
        <h1 className="text-6xl font-extrabold text-brand-blue dark:text-brand-green">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-4 mb-2">الصفحة غير موجودة</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم حذفها أو تم نقلها.
        </p>
        <Link 
            href="/" 
            className="mt-8 bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue/90 transition-transform transform hover:scale-105 shadow-lg"
        >
            العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;