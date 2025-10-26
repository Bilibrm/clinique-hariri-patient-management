import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle: string;
    actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
                <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
            </div>
            {actions && <div>{actions}</div>}
        </div>
    );
};

export default PageHeader;
