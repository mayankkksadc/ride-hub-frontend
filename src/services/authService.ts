
import { mockUsers } from './mockData';
import { User } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (email: string, password: string) => {
  // Simulate API request
  await delay(1000);

  // Find user by email (in a real app, you'd validate the password too)
  const user = mockUsers.find(u => u.email === email);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Generate a fake token
  const token = `fake-jwt-token-${Math.random().toString(36).substring(2)}`;

  return { user, token };
};

export const signup = async (email: string, password: string, name: string, role: string) => {
  // Simulate API request
  await delay(1000);

  // Check if user already exists
  if (mockUsers.some(u => u.email === email)) {
    throw new Error('User with this email already exists');
  }

  // Create new user
  const newUser: User = {
    id: `user${mockUsers.length + 1}`,
    email,
    name,
    role: role as 'admin' | 'customer' | 'driver',
  };

  // In a real app, you'd save this user to the database
  mockUsers.push(newUser);

  // Generate a fake token
  const token = `fake-jwt-token-${Math.random().toString(36).substring(2)}`;

  return { user: newUser, token };
};
