'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Map } from '@/components/Map';
import { RideCard } from '@/components/RideCard';
import { RewardCard } from '@/components/RewardCard';
import { EmergencyButton } from '@/components/EmergencyButton';

export function UserDashboard() {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's rides and points
    const fetchUserData = async () => {
      try {
        // TODO: Implement API calls to fetch rides and points
        setRides([]);
        setPoints(0);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Points and Rewards */}
      <div className="col-span-1">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Your Rewards
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Points</p>
                <p className="text-2xl font-bold text-indigo-600">{points}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <RewardCard />
          </div>
        </div>
      </div>

      {/* Recent Rides */}
      <div className="col-span-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Rides
          </h3>
          <div className="space-y-4">
            {rides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="col-span-3">
        <div className="bg-white rounded-lg shadow">
          <Map />
        </div>
      </div>

      {/* Emergency Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <EmergencyButton />
      </div>
    </div>
  );
}
