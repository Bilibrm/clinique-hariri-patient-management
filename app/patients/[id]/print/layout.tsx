import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Print Patient Card',
};

export default function PrintLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-area, #printable-area * {
              visibility: visible;
            }
            #printable-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
          }
        `,
          }}
        />
      </body>
    </html>
  );
}
