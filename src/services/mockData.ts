
import { 
  User, Admin, Customer, Driver, Ride, Bill, Fare, FareBreakdown
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'admin1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: 'customer1',
    email: 'customer@example.com',
    name: 'Customer User',
    role: 'customer'
  },
  {
    id: 'driver1',
    email: 'driver@example.com',
    name: 'Driver User',
    role: 'driver'
  }
];

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: 'customer1',
    email: 'customer1@example.com',
    name: 'John Doe',
    role: 'customer',
    address: '123 Main St, City',
    phone: '555-1234'
  },
  {
    id: 'customer2',
    email: 'customer2@example.com',
    name: 'Jane Smith',
    role: 'customer',
    address: '456 Oak Ave, Town',
    phone: '555-5678'
  },
  {
    id: 'customer3',
    email: 'customer3@example.com',
    name: 'Bob Johnson',
    role: 'customer',
    address: '789 Pine Rd, Village',
    phone: '555-9012'
  }
];

// Mock Drivers
export const mockDrivers: Driver[] = [
  {
    id: 'driver1',
    email: 'driver1@example.com',
    name: 'Alice Williams',
    role: 'driver',
    license: 'DL12345',
    vehicle: 'Toyota Camry',
    rating: 4.8,
    status: 'available',
    location: {
      lat: 37.7749,
      lng: -122.4194
    }
  },
  {
    id: 'driver2',
    email: 'driver2@example.com',
    name: 'Dave Brown',
    role: 'driver',
    license: 'DL67890',
    vehicle: 'Honda Civic',
    rating: 4.5,
    status: 'busy',
    location: {
      lat: 37.7833,
      lng: -122.4167
    }
  },
  {
    id: 'driver3',
    email: 'driver3@example.com',
    name: 'Carlos Rodriguez',
    role: 'driver',
    license: 'DL54321',
    vehicle: 'Ford Escape',
    rating: 4.9,
    status: 'offline',
    location: {
      lat: 37.7899,
      lng: -122.4001
    }
  }
];

// Mock Rides
export const mockRides: Ride[] = [
  {
    id: 'ride1',
    customerId: 'customer1',
    driverId: 'driver1',
    pickup: {
      address: '123 Main St, City',
      lat: 37.7749,
      lng: -122.4194
    },
    dropoff: {
      address: '456 Market St, City',
      lat: 37.7920,
      lng: -122.4067
    },
    status: 'completed',
    fare: 25.50,
    distance: 3.2,
    duration: 15,
    createdAt: '2023-01-01T12:00:00Z',
    updatedAt: '2023-01-01T12:30:00Z'
  },
  {
    id: 'ride2',
    customerId: 'customer2',
    driverId: 'driver2',
    pickup: {
      address: '789 Pine Rd, Village',
      lat: 37.7833,
      lng: -122.4167
    },
    dropoff: {
      address: '101 Tech Blvd, City',
      lat: 37.7850,
      lng: -122.4000
    },
    status: 'in_progress',
    fare: 18.75,
    distance: 2.5,
    duration: 12,
    createdAt: '2023-01-02T14:00:00Z',
    updatedAt: '2023-01-02T14:15:00Z'
  },
  {
    id: 'ride3',
    customerId: 'customer3',
    pickup: {
      address: '202 College Ave, Town',
      lat: 37.7900,
      lng: -122.4100
    },
    dropoff: {
      address: '303 Park Lane, City',
      lat: 37.7950,
      lng: -122.4050
    },
    status: 'requested',
    distance: 1.8,
    createdAt: '2023-01-03T09:00:00Z',
    updatedAt: '2023-01-03T09:00:00Z'
  }
];

// Mock Bills
export const mockBills: Bill[] = [
  {
    id: 'bill1',
    rideId: 'ride1',
    customerId: 'customer1',
    amount: 25.50,
    status: 'paid',
    createdAt: '2023-01-01T12:30:00Z',
    updatedAt: '2023-01-01T12:35:00Z'
  },
  {
    id: 'bill2',
    rideId: 'ride2',
    customerId: 'customer2',
    amount: 18.75,
    status: 'pending',
    createdAt: '2023-01-02T14:20:00Z',
    updatedAt: '2023-01-02T14:20:00Z'
  }
];

// Mock Fare Config
export const mockFareConfig: Fare = {
  baseRate: 2.50,
  perMileRate: 1.50,
  perMinuteRate: 0.30,
  bookingFee: 1.00
};

// Mock Fare Breakdown
export const mockFareBreakdown: FareBreakdown = {
  baseFare: 2.50,
  distanceFare: 4.80,
  timeFare: 4.50,
  bookingFee: 1.00,
  total: 12.80
};
