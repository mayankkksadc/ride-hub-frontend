
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer' | 'driver';
}

export interface Admin extends User {
  role: 'admin';
}

export interface Customer extends User {
  role: 'customer';
  address?: string;
  phone?: string;
}

export interface Driver extends User {
  role: 'driver';
  license?: string;
  vehicle?: string;
  rating?: number;
  status?: 'available' | 'busy' | 'offline';
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Bill {
  id: string;
  rideId: string;
  customerId: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Ride {
  id: string;
  customerId: string;
  driverId?: string;
  pickup: {
    address: string;
    lat: number;
    lng: number;
  };
  dropoff: {
    address: string;
    lat: number;
    lng: number;
  };
  status: 'requested' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  fare?: number;
  distance?: number;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Fare {
  baseRate: number;
  perMileRate: number;
  perMinuteRate: number;
  bookingFee: number;
}

export interface FareBreakdown {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  bookingFee: number;
  total: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface AdminState {
  admins: Admin[];
  loading: boolean;
  error: string | null;
}

export interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

export interface DriverState {
  drivers: Driver[];
  selectedDriver: Driver | null;
  loading: boolean;
  error: string | null;
}

export interface BillingState {
  bills: Bill[];
  selectedBill: Bill | null;
  loading: boolean;
  error: string | null;
}

export interface RideState {
  rides: Ride[];
  selectedRide: Ride | null;
  loading: boolean;
  error: string | null;
}

export interface FareState {
  fareConfig: Fare;
  fareBreakdown: FareBreakdown | null;
  loading: boolean;
  error: string | null;
}
