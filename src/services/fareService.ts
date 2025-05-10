
import { mockFareConfig, mockFareBreakdown } from './mockData';
import { Fare, FareBreakdown } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const calculateFare = async (distance: number, duration: number) => {
  // Simulate API request
  await delay(500);

  // Calculate fare based on distance and duration
  const distanceFare = distance * mockFareConfig.perMileRate;
  const timeFare = (duration / 60) * mockFareConfig.perMinuteRate;
  const fare = mockFareConfig.baseRate + distanceFare + timeFare + mockFareConfig.bookingFee;

  return parseFloat(fare.toFixed(2));
};

export const getFareBreakdown = async (distance: number, duration: number) => {
  // Simulate API request
  await delay(1000);

  // Calculate fare breakdown
  const distanceFare = parseFloat((distance * mockFareConfig.perMileRate).toFixed(2));
  const timeFare = parseFloat(((duration / 60) * mockFareConfig.perMinuteRate).toFixed(2));
  const baseFare = mockFareConfig.baseRate;
  const bookingFee = mockFareConfig.bookingFee;
  const total = parseFloat((baseFare + distanceFare + timeFare + bookingFee).toFixed(2));

  const breakdown: FareBreakdown = {
    baseFare,
    distanceFare,
    timeFare,
    bookingFee,
    total,
  };

  return breakdown;
};

export const setBaseRate = async (fareConfig: Fare) => {
  // Simulate API request
  await delay(1000);

  // Update fare config (in a real app, would save to database)
  Object.assign(mockFareConfig, fareConfig);

  return { ...mockFareConfig };
};
