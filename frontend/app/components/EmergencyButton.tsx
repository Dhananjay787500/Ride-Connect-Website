'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function EmergencyButton() {
  const [isActive, setIsActive] = useState(false);
  const { user } = useAuth();

  const handleEmergency = async () => {
    try {
      setIsActive(true);
      // TODO: Implement emergency notification system
      console.log('Emergency activated for user:', user?.id);
      
      // Send notifications to emergency contacts
      // TODO: Implement notification API call
      
      // After 30 seconds, deactivate automatically
      setTimeout(() => {
        setIsActive(false);
      }, 30000);
    } catch (error) {
      console.error('Error activating emergency:', error);
    }
  };

  return (
    <button
      onClick={handleEmergency}
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
        isActive
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-red-500 hover:bg-red-600'
      }`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </button>
  );
}
