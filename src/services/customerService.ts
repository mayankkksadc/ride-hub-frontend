
import { mockCustomers } from './mockData';
import { Customer } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const registerCustomer = async (customerData: Partial<Customer>) => {
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

export const getCustomers = async () => {
  // Simulate API request
  await delay(1000);

  // Return all customers
  return [...mockCustomers];
};

export const getCustomerById = async (id: string) => {
  // Simulate API request
  await delay(1000);

  // Find customer by id
  const customer = mockCustomers.find(c => c.id === id);

  if (!customer) {
    throw new Error('Customer not found');
  }

  return { ...customer };
};

export const updateCustomer = async (id: string, customerData: Partial<Customer>) => {
  // Simulate API request
  await delay(1000);

  // Find customer by id
  const customerIndex = mockCustomers.findIndex(c => c.id === id);

  if (customerIndex === -1) {
    throw new Error('Customer not found');
  }

  // Update customer data
  mockCustomers[customerIndex] = {
    ...mockCustomers[customerIndex],
    ...customerData,
  };

  return { ...mockCustomers[customerIndex] };
};

export const deleteCustomer = async (id: string) => {
  // Simulate API request
  await delay(1000);

  // Find customer by id
  const customerIndex = mockCustomers.findIndex(c => c.id === id);

  if (customerIndex === -1) {
    throw new Error('Customer not found');
  }

  // Remove customer from mock data
  mockCustomers.splice(customerIndex, 1);

  return { success: true };
};
