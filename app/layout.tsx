// FIX: Add React import to fix 'Cannot find namespace React' error.
import React from 'react';
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Toaster } from 'react-hot-toast';


const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'Clinique Hariri',
  description:
    'A modern, responsive web application for managing patient records.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>
          <ThemeProvider>
            <Toaster
              toastOptions={{
                className: 'font-sans',
                success: {
                  style: {
                    background: '#00B894',
                    color: 'white',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
                    color: 'white',
                  },
                },
              }}
            />
            <div className="flex min-h-screen flex-col bg-light-bg font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-200">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
              </div>
            </div>
          </ThemeProvider>
      </body>
    </html>
  );
}