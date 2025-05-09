'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMap } from '@/hooks/useMap';

interface RideRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RideRequestForm({ isOpen, onClose }: RideRequestFormProps) {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { map, setMap } = useMap();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!pickup || !destination || !date || !time || !vehicleType) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // TODO: Implement ride request API call
      console.log('Submitting ride request:', {
        pickup,
        destination,
        date,
        time,
        vehicleType,
        userId: user?.id
      });

      onClose();
    } catch (err) {
      setError('Failed to submit ride request');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Request a Ride</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <input
              type="text"
              id="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
              Preferred Vehicle Type
            </label>
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select vehicle type</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Request Ride
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
