
import { mockRides, mockDrivers } from './mockData';
import { Ride } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const requestRide = async (rideData: Partial<Ride>) => {
  // Simulate API request
  await delay(1000);

  // Create a new ride
  const newRide: Ride = {
    id: `ride${mockRides.length + 1}`,
    customerId: rideData.customerId || '',
    pickup: rideData.pickup || { address: '', lat: 0, lng: 0 },
    dropoff: rideData.dropoff || { address: '', lat: 0, lng: 0 },
    status: 'requested',
    distance: rideData.distance,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Add to mock data (in a real app, would save to database)
  mockRides.push(newRide);

  return newRide;
};

export const getRides = async () => {
  // Simulate API request
  await delay(1000);

  // Return all rides
  return [...mockRides];
};

export const getRideById = async (id: string) => {
  // Simulate API request
  await delay(1000);

  // Find ride by id
  const ride = mockRides.find(r => r.id === id);

  if (!ride) {
    throw new Error('Ride not found');
  }

  return { ...ride };
};

export const updateRide = async (id: string, rideData: Partial<Ride>) => {
  // Simulate API request
  await delay(1000);

  // Find ride by id
  const rideIndex = mockRides.findIndex(r => r.id === id);

  if (rideIndex === -1) {
    throw new Error('Ride not found');
  }

  // Update ride data
  mockRides[rideIndex] = {
    ...mockRides[rideIndex],
    ...rideData,
    updatedAt: new Date().toISOString(),
  };

  return { ...mockRides[rideIndex] };
};

export const cancelRide = async (id: string) => {
  // Simulate API request
  await delay(1000);

  // Find ride by id
  const rideIndex = mockRides.findIndex(r => r.id === id);

  if (rideIndex === -1) {
    throw new Error('Ride not found');
  }

  // Cancel the ride
  mockRides[rideIndex] = {
    ...mockRides[rideIndex],
    status: 'cancelled',
    updatedAt: new Date().toISOString(),
  };

  return { ...mockRides[rideIndex] };
};

export const completeRide = async (id: string) => {
  // Simulate API request
  await delay(1000);

  // Find ride by id
  const rideIndex = mockRides.findIndex(r => r.id === id);

  if (rideIndex === -1) {
    throw new Error('Ride not found');
  }

  // Complete the ride
  mockRides[rideIndex] = {
    ...mockRides[rideIndex],
    status: 'completed',
    updatedAt: new Date().toISOString(),
  };

  return { ...mockRides[rideIndex] };
};

export const assignDriver = async (rideId: string, driverId: string) => {
  // Simulate API request
  await delay(1000);

  // Find ride by id
  const rideIndex = mockRides.findIndex(r => r.id === rideId);

  if (rideIndex === -1) {
    throw new Error('Ride not found');
  }

  // Find driver by id
  const driver = mockDrivers.find(d => d.id === driverId);

  if (!driver) {
    throw new Error('Driver not found');
  }

  // Assign driver to ride
  mockRides[rideIndex] = {
    ...mockRides[rideIndex],
    driverId,
    status: 'assigned',
    updatedAt: new Date().toISOString(),
  };

  // Update driver status
  const driverIndex = mockDrivers.findIndex(d => d.id === driverId);
  mockDrivers[driverIndex] = {
    ...mockDrivers[driverIndex],
    status: 'busy',
  };

  return { ...mockRides[rideIndex] };
};
