// pages/Dashboard.tsx
import React from 'react';
import { useSmartHome } from '../context/SmartHomeContext';
import DeviceCard from '../components/Devices/DeviceCard';
import RoomCard from '../components/Rooms/RoomCard';
import EnergyWidget from '../components/Energy/EnergyWidget';
import {
  CpuChipIcon,
  BuildingOfficeIcon,
  BoltIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const { state } = useSmartHome();

  const stats = [
    {
      title: 'Total Devices',
      value: state.devices.length,
      icon: CpuChipIcon,
      color: 'blue'
    },
    {
      title: 'Active Rooms',
      value: state.rooms.length,
      icon: BuildingOfficeIcon,
      color: 'green'
    },
    {
      title: 'Energy Usage',
      value: '2.4 kW',
      icon: BoltIcon,
      color: 'yellow'
    },
    {
      title: 'Alerts',
      value: 2,
      icon: ExclamationTriangleIcon,
      color: 'red'
    }
  ];

  const recentDevices = state.devices.slice(0, 4);
  const quickRooms = state.rooms.slice(0, 3);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your smart home system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Devices */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Devices</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentDevices.map((device) => (
                  <DeviceCard key={device.id} device={device} compact />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Controls */}
        <div className="space-y-6">
          {/* Rooms */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Rooms</h3>
            </div>
            <div className="p-6 space-y-4">
              {quickRooms.map((room) => (
                <RoomCard key={room.id} room={room} compact />
              ))}
            </div>
          </div>

          {/* Energy Widget */}
          <EnergyWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
