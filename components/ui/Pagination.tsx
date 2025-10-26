'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, perPage }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(createPageURL(page));
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; // تقليل عدد الصفحات المعروضة لتطابق التصميم

    // إضافة زر الصفحة الأولى
    pageNumbers.push(
      <button
        key="first"
        onClick={() => handlePageChange(1)}
        className={`flex h-8 w-8 items-center justify-center transition-colors ${
          currentPage === 1
            ? 'text-brand-blue font-bold'
            : 'text-gray-600'
        }`}
      >
        1
      </button>
    );

    
    if (totalPages > 1) {
      if (totalPages > 3 && currentPage > 1 && currentPage < totalPages) {
        pageNumbers.push(
          <button
            key={currentPage}
            onClick={() => handlePageChange(currentPage)}
            className="flex h-8 w-8 items-center justify-center text-brand-blue font-bold"
          >
            {currentPage}
          </button>
        );
      } else if (totalPages > 2) {
        // إضافة الصفحة الثانية
        pageNumbers.push(
          <button
            key={2}
            onClick={() => handlePageChange(2)}
            className={`flex h-8 w-8 items-center justify-center transition-colors ${
              currentPage === 2
                ? 'text-brand-blue font-bold'
                : 'text-gray-600'
            }`}
          >
            2
          </button>
        );
      }

      if (totalPages > 2 && totalPages <= 4) {
        pageNumbers.push(
          <button
            key={3}
            onClick={() => handlePageChange(3)}
            className={`flex h-8 w-8 items-center justify-center transition-colors ${
              currentPage === 3
                ? 'text-brand-blue font-bold'
                : 'text-gray-600'
            }`}
          >
            3
          </button>
        );
      }

      if (totalPages === 4) {
        pageNumbers.push(
          <button
            key={4}
            onClick={() => handlePageChange(4)}
            className={`flex h-8 w-8 items-center justify-center transition-colors ${
              currentPage === 4
                ? 'text-brand-blue font-bold'
                : 'text-gray-600'
            }`}
          >
            4
          </button>
        );
      }

      if (totalPages > 4) {
        pageNumbers.push(
          <span key="ellipsis" className="px-1 text-gray-500">
            ...
          </span>
        );
      }

      if (totalPages > 4) {
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`flex h-8 w-8 items-center justify-center transition-colors ${
              currentPage === totalPages
                ? 'text-brand-blue font-bold'
                : 'text-gray-600'
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="mt-6 flex items-center justify-center">
      <nav className="flex items-center gap-4 text-sm text-brand-blue" dir='ltr'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 text-brand-blue transition-colors hover:text-brand-blue/80 disabled:opacity-50"
        >
           <ChevronLeftIcon className="h-4 w-4" />
          <span>السابقة</span>
        </button>
        
        <div className="flex items-center gap-2 ">
          {renderPageNumbers()}
        </div>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1 text-brand-blue transition-colors hover:text-brand-blue/80 disabled:opacity-50"
        >
          <span>التالية</span>
          <ChevronRightIcon className="h-4 w-4" />
         
        </button>
      </nav>
    </div>
  );
};

export default Pagination;