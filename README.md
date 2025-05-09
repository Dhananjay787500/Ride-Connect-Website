# Ride-Connect-Website
# RideShare Platform

A web-based ride-sharing platform connecting users with similar routes for daily commutes.

## Features

- User Authentication (Google/Facebook/Email)
- Route-based matching system using Google Maps API
- Real-time ride requests and acceptances
- Live tracking with Google Maps
- Points-based reward system
- Secure communication between users
- Emergency safety features

## Tech Stack

### Frontend
- React.js with Next.js
- Tailwind CSS for styling
- Google Maps JavaScript API
- React Query for data fetching

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Twilio for secure calling

### APIs & Services
- Google Maps API (Directions, Distance Matrix)
- Twilio API (for secure calling)
- Firebase Authentication

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd backend
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Add required API keys and configuration

4. Start the development servers:
   ```bash
   # Backend
   npm run dev

   # Frontend
   npm run dev
   ```

## Environment Variables

### Backend
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### Frontend
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_API_URL=your_api_url
```

## Security Features

- End-to-end encrypted communication
- Route verification system
- Emergency SOS functionality
- User rating and review system
- Identity verification

## License

MIT License
