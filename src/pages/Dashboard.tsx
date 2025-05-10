
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getRidesThunk } from '@/redux/slices/rideSlice';
import { getDriversThunk } from '@/redux/slices/driverSlice';
import { getCustomersThunk } from '@/redux/slices/customerSlice';
import { CardComponent } from '@/components/ui/card-component';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, Users, MapPin, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { rides, loading: ridesLoading } = useAppSelector((state) => state.ride);
  const { drivers, loading: driversLoading } = useAppSelector((state) => state.driver);
  const { customers, loading: customersLoading } = useAppSelector((state) => state.customer);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getRidesThunk());
    dispatch(getDriversThunk());
    dispatch(getCustomersThunk());
  }, [dispatch]);

  const loading = ridesLoading || driversLoading || customersLoading;

  // Count rides by status
  const activeRides = rides.filter(ride => 
    ride.status === 'assigned' || ride.status === 'in_progress').length;
  
  const rideStatusCounts = {
    requested: rides.filter(ride => ride.status === 'requested').length,
    inProgress: rides.filter(ride => ride.status === 'in_progress').length,
    completed: rides.filter(ride => ride.status === 'completed').length,
    cancelled: rides.filter(ride => ride.status === 'cancelled').length
  };

  // Count drivers by status
  const availableDrivers = drivers.filter(driver => driver.status === 'available').length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back{user?.name ? `, ${user.name}` : ''}!</p>
        </div>
        <Link to="/rides/request">
          <Button className="uber-btn-primary">Request a Ride</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <CardComponent
              title="Active Rides"
              description={`${activeRides} rides in progress`}
              className="bg-gradient-to-br from-blue-50 to-blue-100"
            >
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-primary">{activeRides}</span>
                <Car className="h-12 w-12 text-primary/40" />
              </div>
            </CardComponent>

            <CardComponent
              title="Available Drivers"
              description={`${availableDrivers} drivers available`}
              className="bg-gradient-to-br from-green-50 to-green-100"
            >
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-success">{availableDrivers}</span>
                <Car className="h-12 w-12 text-success/40" />
              </div>
            </CardComponent>

            <CardComponent
              title="Customers"
              description={`${customers.length} registered customers`}
              className="bg-gradient-to-br from-purple-50 to-purple-100"
            >
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-purple-600">{customers.length}</span>
                <Users className="h-12 w-12 text-purple-600/40" />
              </div>
            </CardComponent>

            <CardComponent
              title="Total Rides"
              description={`${rides.length} rides to date`}
              className="bg-gradient-to-br from-amber-50 to-amber-100"
            >
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-amber-600">{rides.length}</span>
                <MapPin className="h-12 w-12 text-amber-600/40" />
              </div>
            </CardComponent>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ride Status Breakdown */}
            <CardComponent 
              title="Ride Status" 
              description="Breakdown by ride status"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col p-3 rounded-md bg-blue-50">
                    <span className="text-sm text-gray-500">Requested</span>
                    <span className="text-xl font-bold">{rideStatusCounts.requested}</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-md bg-yellow-50">
                    <span className="text-sm text-gray-500">In Progress</span>
                    <span className="text-xl font-bold">{rideStatusCounts.inProgress}</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-md bg-green-50">
                    <span className="text-sm text-gray-500">Completed</span>
                    <span className="text-xl font-bold">{rideStatusCounts.completed}</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-md bg-red-50">
                    <span className="text-sm text-gray-500">Cancelled</span>
                    <span className="text-xl font-bold">{rideStatusCounts.cancelled}</span>
                  </div>
                </div>
                <Link to="/rides">
                  <Button variant="outline" className="w-full">View All Rides</Button>
                </Link>
              </div>
            </CardComponent>

            {/* Quick Actions */}
            <CardComponent
              title="Quick Actions"
              description="Common tasks and operations"
            >
              <div className="grid grid-cols-2 gap-4">
                <Link to="/rides/request">
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Request Ride</span>
                    <Car size={18} />
                  </Button>
                </Link>
                <Link to="/drivers">
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>View Drivers</span>
                    <Users size={18} />
                  </Button>
                </Link>
                <Link to="/customers/register">
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Add Customer</span>
                    <Users size={18} />
                  </Button>
                </Link>
                <Link to="/billing">
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Billing</span>
                    <CreditCard size={18} />
                  </Button>
                </Link>
              </div>
            </CardComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
