# Roommate Finder - Server Side

Simple Express.js backend for the Roommate Finder application.

## Available Routes

```javascript
// Roommate routes
GET     /available-roommates  // Get all roommates
POST    /roommates           // Add a new roommate
GET     /roommates/:id       // Get single roommate
PUT     /roommates/:id       // Update a roommate
DELETE  /roommates/:id       // Delete a roommate

// User routes
POST    /users              // Create user
GET     /users/:id          // Get user
PUT     /users/:id          // Update user
```

## Project Setup

1. Install dependencies
```bash
npm install express mongodb dotenv cors
```

2. Configure environment variables
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

3. Start the server
```bash
npm start
```

## Main Dependencies

- express: Web framework
- mongodb: Database driver
- cors: Cross-origin resource sharing
- dotenv: Environment variables

## Database Structure

### Collections
- roommates
- users

### Sample Document Structure
```javascript
// Roommate document
{
  title: String,
  location: String,
  rentAmount: Number,
  roomType: String,
  availability: Boolean,
  contactInfo: String
}

// User document
{
  email: String,
  name: String
}
```
