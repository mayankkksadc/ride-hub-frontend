
import { mockBills } from './mockData';
import { Bill } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createBill = async (billData: Partial<Bill>) => {
  // Simulate API request
  await delay(1000);

  // Create a new bill
  const newBill: Bill = {
    id: `bill${mockBills.length + 1}`,
    rideId: billData.rideId || '',
    customerId: billData.customerId || '',
    amount: billData.amount || 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Add to mock data (in a real app, would save to database)
  mockBills.push(newBill);

  return newBill;
};

export const getBills = async () => {
  // Simulate API request
  await delay(1000);

  // Return all bills
  return [...mockBills];
};

export const updateBill = async (id: string, billData: Partial<Bill>) => {
  // Simulate API request
  await delay(1000);

  // Find bill by id
  const billIndex = mockBills.findIndex(b => b.id === id);

  if (billIndex === -1) {
    throw new Error('Bill not found');
  }

  // Update bill data
  mockBills[billIndex] = {
    ...mockBills[billIndex],
    ...billData,
    updatedAt: new Date().toISOString(),
  };

  return { ...mockBills[billIndex] };
};

export const deleteBill = async (id: string) => {
  // Simulate API request
  await delay(1000);

  // Find bill by id
  const billIndex = mockBills.findIndex(b => b.id === id);

  if (billIndex === -1) {
    throw new Error('Bill not found');
  }

  // Remove bill from mock data
  mockBills.splice(billIndex, 1);

  return { success: true };
};
