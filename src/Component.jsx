// components/Layout/Header.tsx
import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Smart Home Control</h2>
          <p className="text-sm text-gray-500">Manage your connected devices</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
