
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAddDriver from "./pages/admin/AddDriver";
import AdminAddCustomer from "./pages/admin/AddCustomer";
import AdminReviewDriver from "./pages/admin/ReviewDriver";

// Billing Pages
import BillingDashboard from "./pages/billing/Dashboard";
import BillingCreate from "./pages/billing/Create";
import BillingEdit from "./pages/billing/Edit";

// Customer Pages
import CustomerDashboard from "./pages/customers/Dashboard";
import CustomerRegister from "./pages/customers/Register";
import CustomerView from "./pages/customers/View";
import CustomerEdit from "./pages/customers/Edit";

// Driver Pages
import DriverDashboard from "./pages/drivers/Dashboard";
import DriverRegister from "./pages/drivers/Register";
import DriverView from "./pages/drivers/View";
import DriverEdit from "./pages/drivers/Edit";

// Ride Pages
import RideDashboard from "./pages/rides/Dashboard";
import RideRequest from "./pages/rides/Request";
import RideView from "./pages/rides/View";
import RideEdit from "./pages/rides/Edit";

// Fare Pages
import FareDashboard from "./pages/fares/Dashboard";
import FareCalculator from "./pages/fares/Calculator";
import FareConfig from "./pages/fares/Config";

import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              {/* Dashboard */}
              <Route path="/" element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <MainLayout>
                  <AdminDashboard />
                </MainLayout>
              } />
              <Route path="/admin/add-driver" element={
                <MainLayout>
                  <AdminAddDriver />
                </MainLayout>
              } />
              <Route path="/admin/add-customer" element={
                <MainLayout>
                  <AdminAddCustomer />
                </MainLayout>
              } />
              <Route path="/admin/review-driver/:id" element={
                <MainLayout>
                  <AdminReviewDriver />
                </MainLayout>
              } />

              {/* Billing Routes */}
              <Route path="/billing" element={
                <MainLayout>
                  <BillingDashboard />
                </MainLayout>
              } />
              <Route path="/billing/create" element={
                <MainLayout>
                  <BillingCreate />
                </MainLayout>
              } />
              <Route path="/billing/edit/:id" element={
                <MainLayout>
                  <BillingEdit />
                </MainLayout>
              } />

              {/* Customer Routes */}
              <Route path="/customers" element={
                <MainLayout>
                  <CustomerDashboard />
                </MainLayout>
              } />
              <Route path="/customers/register" element={
                <MainLayout>
                  <CustomerRegister />
                </MainLayout>
              } />
              <Route path="/customers/:id" element={
                <MainLayout>
                  <CustomerView />
                </MainLayout>
              } />
              <Route path="/customers/edit/:id" element={
                <MainLayout>
                  <CustomerEdit />
                </MainLayout>
              } />

              {/* Driver Routes */}
              <Route path="/drivers" element={
                <MainLayout>
                  <DriverDashboard />
                </MainLayout>
              } />
              <Route path="/drivers/register" element={
                <MainLayout>
                  <DriverRegister />
                </MainLayout>
              } />
              <Route path="/drivers/:id" element={
                <MainLayout>
                  <DriverView />
                </MainLayout>
              } />
              <Route path="/drivers/edit/:id" element={
                <MainLayout>
                  <DriverEdit />
                </MainLayout>
              } />

              {/* Ride Routes */}
              <Route path="/rides" element={
                <MainLayout>
                  <RideDashboard />
                </MainLayout>
              } />
              <Route path="/rides/request" element={
                <MainLayout>
                  <RideRequest />
                </MainLayout>
              } />
              <Route path="/rides/:id" element={
                <MainLayout>
                  <RideView />
                </MainLayout>
              } />
              <Route path="/rides/edit/:id" element={
                <MainLayout>
                  <RideEdit />
                </MainLayout>
              } />

              {/* Fare Routes */}
              <Route path="/fares" element={
                <MainLayout>
                  <FareDashboard />
                </MainLayout>
              } />
              <Route path="/fares/calculator" element={
                <MainLayout>
                  <FareCalculator />
                </MainLayout>
              } />
              <Route path="/fares/config" element={
                <MainLayout>
                  <FareConfig />
                </MainLayout>
              } />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
