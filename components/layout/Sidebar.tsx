'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeIcon, UsersIcon, BriefcaseIcon, ArrowLeftOnRectangleIcon, Cog6ToothIcon, ClipboardDocumentListIcon, BeakerIcon, ArchiveBoxIcon, BanknotesIcon, BuildingOfficeIcon, ChevronUpIcon, HeartIcon } from '@heroicons/react/24/outline';

// FIX: Refactored interfaces for a clearer discriminated union to fix type inference issue.
interface NavItemWithSubItems {
    name: string;
    icon: React.ReactNode;
    subItems: {
        name: string;
        path: string;
    }[];
}

interface NavItemWithLink {
    name: string;
    icon: React.ReactNode;
    path: string;
}

type NavItem = NavItemWithSubItems | NavItemWithLink;

const navLinks: NavItem[] = [
    {
        name: 'الرئيسية',
        icon: <HomeIcon className="h-6 w-6" />,
        subItems: [
            { name: 'الاستقبال', path: '/reception' },
            { name: 'قائمة الأطباء', path: '/doctors-list' },
            { name: 'قائمة المرضى', path: '/patients' },
            { name: 'الزيارات الطبية', path: '/medical-visits' },
            { name: 'الإقامات الطبية', path: '/medical-stays' },
        ],
    },
    { name: 'الأطباء', icon: <HeartIcon className="h-6 w-6" />, path: '/physicians' },
    { name: 'الإدارة', icon: <BuildingOfficeIcon className="h-6 w-6" />, path: '/administration' },
    { name: 'المخزون', icon: <ArchiveBoxIcon className="h-6 w-6" />, path: '/inventory' },
    { name: 'التحاليل', icon: <BeakerIcon className="h-6 w-6" />, path: '/analysis' },
    { name: 'الأشعة', icon: <ClipboardDocumentListIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />, path: '/radiology' },
    { name: 'العمليات', icon: <BriefcaseIcon className="h-6 w-6" />, path: '/operations' },
    { name: 'المحاسبة', icon: <BanknotesIcon className="h-6 w-6" />, path: '/accounting' },
    { name: 'الموارد البشرية', icon: <UsersIcon className="h-6 w-6" />, path: '/hr' },
    { name: 'الإعدادات', icon: <Cog6ToothIcon className="h-6 w-6" />, path: '/settings' },
];

interface CollapsibleMenuProps {
    item: NavItemWithSubItems;
    isActive: boolean;
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ item, isActive }) => {
    const [isOpen, setIsOpen] = useState(isActive);
    const pathname = usePathname() || '';

    useEffect(() => {
        if (isActive) {
            setIsOpen(true);
        }
    }, [isActive]);

    return (
        <li className="px-4 py-1">
            <button onClick={() => setIsOpen(!isOpen)} className={`w-full flex justify-between items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-brand-blue text-white font-semibold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <div className="flex items-center">
                    <span className="me-3">{item.icon}</span>
                    {item.name}
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronUpIcon className="w-5 h-5" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-1 me-4"
                    >
                        {item.subItems.map(subItem => {
                             const isSubItemActive = pathname === subItem.path;
                             return (
                                <li key={subItem.name} className="mt-1">
                                    <Link href={subItem.path} className={`flex items-center p-2 rounded-lg transition-colors duration-200 text-sm ${isSubItemActive ? 'bg-brand-blue text-white font-semibold opacity-70 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                        <span className={`w-1.5 h-1.5 me-4 rounded-full ${isSubItemActive ? 'bg-brand-blue' : 'bg-gray-400'}`}></span>
                                        {subItem.name}
                                    </Link>
                                </li>
                             )
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    );
};

const Sidebar: React.FC = () => {
    const pathname = usePathname() || '';
    
    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
            <nav className="flex-1 overflow-y-auto pt-4">
                <ul>
                    {navLinks.map((item) => {
                        
                        if ('subItems' in item) {
                            const isActive = item.subItems.some(sub => pathname.startsWith(sub.path));
                            return (
                                <CollapsibleMenu
                                    key={item.name}
                                    item={item}
                                    isActive={isActive}
                                />
                            );
                        } else {
                             const isActive = pathname.startsWith(item.path);
                             return (
                                <li key={item.name} className="px-4 py-1">
                                    <Link href={item.path} className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-brand-blue text-white font-semibold' : 'text-gray-600  dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                        <span className="me-3">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center w-full p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200">
                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                    <span className="me-3">تسجيل الخروج</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;