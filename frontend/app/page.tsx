'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoginModal } from '@/components/LoginModal';
import { RegisterModal } from '@/components/RegisterModal';
import { RideRequestForm } from '@/components/RideRequestForm';
import { RideOfferForm } from '@/components/RideOfferForm';
import { UserDashboard } from '@/components/UserDashboard';

export default function Home() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRideRequestOpen, setIsRideRequestOpen] = useState(false);
  const [isRideOfferOpen, setIsRideOfferOpen] = useState(false);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      setIsLoginModalOpen(true);
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600">RideShare</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button
                    onClick={() => setIsRideRequestOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Request Ride
                  </button>
                  <button
                    onClick={() => setIsRideOfferOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Offer Ride
                  </button>
                  <button
                    onClick={() => router.push('/profile')}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Profile
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user ? (
          <UserDashboard />
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Ride
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with others on your route and save on travel costs
            </p>
          </div>
        )}
      </main>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
      <RideRequestForm
        isOpen={isRideRequestOpen}
        onClose={() => setIsRideRequestOpen(false)}
      />
      <RideOfferForm
        isOpen={isRideOfferOpen}
        onClose={() => setIsRideOfferOpen(false)}
      />
    </div>
  );
}
