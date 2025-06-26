# Roommate Finder - Client Side

A web application to help users find and connect with potential roommates.

## Features

- Browse available roommate listings
- View detailed roommate information
- Add new roommate listings
- Update and delete listings
- User authentication with Firebase
- Light/Dark theme toggle with smooth transition
- Responsive design for all devices

## Technology Used

- **React 18 with Vite**
- **Tailwind CSS with DaisyUI**
- **Firebase Authentication**
- **MongoDB** (through server API)
- **Express.js** (backend)

## Package Dependencies

- **React Router**: For page navigation
- **React Simple Typewriter**: Used in Banner component for text animation
- **React Icons**: For various icons throughout the app
- **Swiper**: For image slider in Banner component
- **Firebase**: For user authentication
- **React-tooltip**: For tooltip

## Pages

- Home (with Banner, Features, How it Works sections)
- Browse Listings
- Add Roommate
- My Listings
- Listing Details
- Login/Register
- Update Listing

## Project Structure

```
src/
├── components/     # Banner, Navbar components
├── contexts/      # Theme and Auth contexts
├── firebase/      # Firebase configuration
├── hooks/         # Custom hooks
├── layouts/       # Root layout
├── pages/         # All page components
└── provider/      # Auth and Private route providers
```

## Getting Started

1. Install dependencies
```bash
npm install
```

2. Set up Firebase configuration in `.env`
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Run the development server
```bash
npm run dev
```
