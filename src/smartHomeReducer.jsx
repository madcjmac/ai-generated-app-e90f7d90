// context/SmartHomeContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Device {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'camera' | 'lock' | 'sensor' | 'outlet';
  room: string;
  status: 'online' | 'offline';
  isOn: boolean;
  value?: number;
  unit?: string;
  lastUpdated: Date;
}

interface Room {
  id: string;
  name: string;
  deviceCount: number;
  temperature?: number;
  humidity?: number;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  schedule?: string;
}

interface EnergyData {
  device: string;
  consumption: number;
  cost: number;
  timestamp: Date;
}

interface SmartHomeState {
  devices: Device[];
  rooms: Room[];
  automationRules: AutomationRule[];
  energyData: EnergyData[];
  isLoading: boolean;
}

type SmartHomeAction =
  | { type: 'SET_DEVICES'; payload: Device[] }
  | { type: 'UPDATE_DEVICE'; payload: { id: string; updates: Partial<Device> } }
  | { type: 'SET_ROOMS'; payload: Room[] }
  | { type: 'SET_AUTOMATION_RULES'; payload: AutomationRule[] }
  | { type: 'SET_ENERGY_DATA'; payload: EnergyData[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: SmartHomeState = {
  devices: [
    {
      id: '1',
      name: 'Living Room Light',
      type: 'light',
      room: 'Living Room',
      status: 'online',
      isOn: true,
      value: 75,
      unit: '%',
      lastUpdated: new Date()
    },
    {
      id: '2',
      name: 'Main Thermostat',
      type: 'thermostat',
      room: 'Living Room',
      status: 'online',
      isOn: true,
      value: 72,
      unit: '°F',
      lastUpdated: new Date()
    },
    {
      id: '3',
      name: 'Front Door Lock',
      type: 'lock',
      room: 'Entrance',
      status: 'online',
      isOn: false,
      lastUpdated: new Date()
    },
    {
      id: '4',
      name: 'Security Camera',
      type: 'camera',
      room: 'Entrance',
      status: 'online',
      isOn: true,
      lastUpdated: new Date()
    }
  ],
  rooms: [
    { id: '1', name: 'Living Room', deviceCount: 3, temperature: 72, humidity: 45 },
    { id: '2', name: 'Kitchen', deviceCount: 2, temperature: 70, humidity: 50 },
    { id: '3', name: 'Bedroom', deviceCount: 4, temperature: 68, humidity: 42 },
    { id: '4', name: 'Entrance', deviceCount: 2, temperature: 71, humidity: 48 }
  ],
  automationRules: [
    {
      id: '1',
      name: 'Evening Lights',
      trigger: 'Sunset',
      action: 'Turn on all lights',
      enabled: true,
      schedule: '18:00'
    },
    {
      id: '2',
      name: 'Away Mode',
      trigger: 'All users leave',
      action: 'Lock doors, turn off lights',
      enabled: true
    }
  ],
  energyData: [],
  isLoading: false
};

const smartHomeReducer = (state: SmartHomeState, action: SmartHomeAction): SmartHomeState => {
  switch (action.type) {
    case 'SET_DEVICES':
      return { ...state, devices: action.payload };
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id
            ? { ...device, ...action.payload.updates, lastUpdated: new Date() }
            : device
        )
      };
    case 'SET_ROOMS':
      return { ...state, rooms: action.payload };
    case 'SET_AUTOMATION_RULES':
      return { ...state, automationRules: action.payload };
    case 'SET_ENERGY_DATA':
      return { ...state, energyData: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const SmartHomeContext = createContext<{
  state: SmartHomeState;
  dispatch: React.Dispatch<SmartHomeAction>;
} | null>(null);

export const SmartHomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(smartHomeReducer, initialState);

  return (
    <SmartHomeContext.Provider value={{ state, dispatch }}>
      {children}
    </SmartHomeContext.Provider>
  );
};

export const useSmartHome = () => {
  const context = useContext(SmartHomeContext);
  if (!context) {
    throw new Error('useSmartHome must be used within a SmartHomeProvider');
  }
  return context;
};
