
import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const baseClasses = "flex items-center justify-between p-4 mb-4 rounded-lg shadow-lg text-white animate-fade-in-down";
  const typeClasses = {
    success: 'bg-green-500 dark:bg-green-600',
    error: 'bg-red-500 dark:bg-red-600',
    info: 'bg-blue-500 dark:bg-blue-600',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ms-4 text-xl font-bold">&times;</button>
    </div>
  );
};

export default Toast;
