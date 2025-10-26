'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import { GlobeAltIcon, MoonIcon, BellIcon, SunIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const HeaderLogo = () => (
    <div className="flex items-center gap-3">
        <Image
            src="/logoc.png"
            alt="Logo"
            width={200}
            height={200}
        />
    </div>
);

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-white px-6 py-3 shadow-sm dark:bg-gray-800 flex justify-between items-center">
            {/* Left Side: Logo */}
            <HeaderLogo />

            {/* Right Side: Controls & User */}
            <div className="flex items-center gap-5" dir='ltr'>
                <div className="flex cursor-pointer items-center gap-2">
                    <Image
                        src="https://i.pravatar.cc/40?u=superadmin"
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full"
                        width={40}
                        height={40}
                    />
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                
                <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                    <GlobeAltIcon className="h-6 w-6" />
                </button>
                <button onClick={toggleTheme} className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                    {theme === 'dark' ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6" />}
                </button>
                <div className="relative">
                    <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                        <BellIcon className="h-6 w-6" />
                    </button>
                    <span className="absolute end-1.5 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-orange-500 dark:border-gray-800"></span>
                </div>
            </div>
        </header>
    );
};

export default Header;