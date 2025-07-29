// components/Layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  CpuChipIcon,
  Cog6ToothIcon,
  BoltIcon,
  BuildingOfficeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/', icon: HomeIcon, label: 'Dashboard' },
    { path: '/devices', icon: CpuChipIcon, label: 'Devices' },
    { path: '/rooms', icon: BuildingOfficeIcon, label: 'Rooms' },
    { path: '/automation', icon: ClockIcon, label: 'Automation' },
    { path: '/energy', icon: BoltIcon, label: 'Energy' },
    { path: '/settings', icon: Cog6ToothIcon, label: 'Settings' }
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <HomeIcon className="h-8 w-8 text-blue-400 mr-2" />
        <h1 className="text-xl font-bold">SmartHome</h1>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
