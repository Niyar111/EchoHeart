import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}></div>
        </div>
    );
};

export const LoadingPage = ({ message = 'Loading...' }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <LoadingSpinner size="xl" />
            <p className="mt-4 text-lg text-gray-600">{message}</p>
        </div>
    </div>
);

export const LoadingCard = ({ message = 'Loading...' }) => (
    <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow">
        <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-sm text-gray-600">{message}</p>
        </div>
    </div>
);

export default LoadingSpinner;
