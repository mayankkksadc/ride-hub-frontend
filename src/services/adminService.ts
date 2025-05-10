
import { mockDrivers, mockCustomers } from './mockData';
import { Driver, Customer } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const addDriver = async (driverData: Partial<Driver>) => {
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

export const addCustomer = async (customerData: Partial<Customer>) => {
  // Simulate API request
  await delay(1000);

  // Create a new customer
  const newCustomer: Customer = {
    id: `customer${mockCustomers.length + 1}`,
    email: customerData.email || '',
    name: customerData.name || '',
    role: 'customer',
    address: customerData.address || '',
    phone: customerData.phone || '',
  };

  // Add to mock data (in a real app, would save to database)
  mockCustomers.push(newCustomer);

  return newCustomer;
};

export const reviewDriver = async (driverId: string, review: { rating: number; comment?: string }) => {
  // Simulate API request
  await delay(1000);

  // Find the driver
  const driverIndex = mockDrivers.findIndex(d => d.id === driverId);
  
  if (driverIndex === -1) {
    throw new Error('Driver not found');
  }

  // Update driver's rating (simplified - in a real app would calculate average)
  mockDrivers[driverIndex] = {
    ...mockDrivers[driverIndex],
    rating: review.rating,
  };

  return mockDrivers[driverIndex];
};
