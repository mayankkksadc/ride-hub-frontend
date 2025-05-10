
import { mockDrivers } from './mockData';
import { Driver } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const registerDriver = async (driverData: Partial<Driver>) => {
  // Simulate API request
  await delay(1000);

  // Create a new driver
  const newDriver: Driver = {
    id: `driver${mockDrivers.length + 1}`,
    email: driverData.email || '',
    name: driverData.name || '',
    role: 'driver',
    license: driverData.license || '',
    vehicle: driverData.vehicle || '',
    rating: 5.0, // Default rating for new drivers
    status: 'offline', // Default status
    location: driverData.location || { lat: 0, lng: 0 },
  };

  // Add to mock data (in a real app, would save to database)
  mockDrivers.push(newDriver);

  return newDriver;
};

export const getDrivers = async () => {
  // Simulate API request
  await delay(1000);

  // Return all drivers
  return [...mockDrivers];
};

export const getDriverById = async (id: string) => {
  // Simulate API request
  await delay(1000);

  // Find driver by id
  const driver = mockDrivers.find(d => d.id === id);

  if (!driver) {
    throw new Error('Driver not found');
  }

  return { ...driver };
};

export const updateDriver = async (id: string, driverData: Partial<Driver>) => {
  // Simulate API request
  await delay(1000);

  // Find driver by id
  const driverIndex = mockDrivers.findIndex(d => d.id === id);

  if (driverIndex === -1) {
    throw new Error('Driver not found');
  }

  // Update driver data
  mockDrivers[driverIndex] = {
    ...mockDrivers[driverIndex],
    ...driverData,
  };

  return { ...mockDrivers[driverIndex] };
};

export const deleteDriver = async (id: string) => {
  // Simulate API request
  await delay(1000);

  // Find driver by id
  const driverIndex = mockDrivers.findIndex(d => d.id === id);

  if (driverIndex === -1) {
    throw new Error('Driver not found');
  }

  // Remove driver from mock data
  mockDrivers.splice(driverIndex, 1);

  return { success: true };
};

export const updateDriverLocation = async (id: string, location: { lat: number; lng: number }) => {
  // Simulate API request
  await delay(500);

  // Find driver by id
  const driverIndex = mockDrivers.findIndex(d => d.id === id);

  if (driverIndex === -1) {
    throw new Error('Driver not found');
  }

  // Update driver location
  mockDrivers[driverIndex] = {
    ...mockDrivers[driverIndex],
    location,
  };

  return { ...mockDrivers[driverIndex] };
};

export const updateDriverStatus = async (id: string, status: 'available' | 'busy' | 'offline') => {
  // Simulate API request
  await delay(500);

  // Find driver by id
  const driverIndex = mockDrivers.findIndex(d => d.id === id);

  if (driverIndex === -1) {
    throw new Error('Driver not found');
  }

  // Update driver status
  mockDrivers[driverIndex] = {
    ...mockDrivers[driverIndex],
    status,
  };

  return { ...mockDrivers[driverIndex] };
};
