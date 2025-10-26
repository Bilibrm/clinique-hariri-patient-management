import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface ErrorMessageProps {
  message: string;
  details?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, details }) => {
  return (
    <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">{message}</p>
          {details && (
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              <p>{details}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
