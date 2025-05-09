'use client';

interface Ride {
  id: string;
  pickup: string;
  destination: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  responder?: {
    name: string;
    rating: number;
  };
}

interface RideCardProps {
  ride: Ride;
}

export function RideCard({ ride }: RideCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full ${statusColors[ride.status]}`}>
            <span className="text-sm font-medium">{ride.status}</span>
          </div>
          {ride.responder && (
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">•</span>
              <span className="text-sm font-medium text-gray-900">
                {ride.responder.name}
              </span>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600">{ride.responder.rating}</span>
              </div>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(ride.startTime).toLocaleDateString()} at {new Date(ride.startTime).toLocaleTimeString()}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <svg
            className="w-4 h-4 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          <span className="text-sm text-gray-900">{ride.pickup}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            className="w-4 h-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          <span className="text-sm text-gray-900">{ride.destination}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Duration: {Math.round((new Date(ride.endTime).getTime() - new Date(ride.startTime).getTime()) / 60000)} mins
        </div>
        {ride.status === 'pending' && (
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Accept Ride
          </button>
        )}
      </div>
    </div>
  );
}
