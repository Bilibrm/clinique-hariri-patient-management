import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    title: string;
    children: ReactNode;
    confirmText?: string;
    cancelText?: string;
    showIcon?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, onCancel, title, children, confirmText, cancelText, showIcon = false, size = 'md' }) => {
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
    };
    
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full ${sizeClasses[size]} text-center`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {showIcon && (
                            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                        )}
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h2>
                        <div className="text-gray-600 dark:text-gray-300 mb-8">{children}</div>
                        <div className="flex justify-center gap-4">
                            {onCancel && (
                                <button onClick={onCancel} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                                    {cancelText || 'إلغاء'}
                                </button>
                            )}
                            {onConfirm && (
                                <button onClick={onConfirm} className={`px-6 py-2 rounded-lg text-white ${confirmText === 'حذف' ? 'bg-red-500 hover:bg-red-600' : 'bg-brand-blue hover:bg-brand-blue/90'}`}>
                                    {confirmText || 'تأكيد'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;