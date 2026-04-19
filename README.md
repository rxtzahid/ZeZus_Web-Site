<<<<<<< HEAD
# Assa Pathao - Backend

A comprehensive ride-sharing and parcel delivery platform backend built with Node.js, Express, and MongoDB.

## Features

- **User Management**: Registration, authentication, and profile management
- **Ride Sharing**: Request, accept, and complete rides
- **Parcel Delivery**: Send and receive parcels
- **Driver Management**: Driver registration, verification, and vehicle management
- **Payment Processing**: Multiple payment methods support (cash, card, wallet)
- **Real-time Tracking**: WebSocket-based location tracking
- **Promo Codes**: Discount management and validation
- **Admin Dashboard**: User and ride management
- **Rating System**: Rate users and drivers
- **Wallet**: In-app wallet for users

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Real-time**: Socket.IO
- **Caching**: Redis
- **Authentication**: JWT
- **Payment**: Stripe, SSL Commerz, Bkash, Nagad
- **SMS**: Twilio
- **Email**: Nodemailer
- **Maps**: Google Maps API

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- Google Maps API Key
- Twilio Account (for SMS)
- Email Service (Gmail or similar)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/assa-pathao-backend.git
   cd assa-pathao-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Update .env file with your credentials**
   ```env
   MONGODB_URI=mongodb://localhost:27017/assa-pathao
   PORT=5000
   JWT_SECRET=your_jwt_secret
   GOOGLE_MAPS_API_KEY=your_api_key
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Rides
- `POST /api/rides/request` - Request a ride
- `POST /api/rides/:rideId/accept` - Accept a ride
- `POST /api/rides/:rideId/start` - Start a ride
- `POST /api/rides/:rideId/complete` - Complete a ride
- `POST /api/rides/:rideId/cancel` - Cancel a ride
- `GET /api/rides/history` - Get ride history
- `GET /api/rides/:rideId` - Get ride details

### Drivers
- `POST /api/drivers/become-driver` - Become a driver
- `PUT /api/drivers/status` - Update driver status
- `POST /api/drivers/vehicle` - Add vehicle
- `GET /api/drivers/profile` - Get driver profile
- `PUT /api/drivers/profile` - Update driver profile
- `GET /api/drivers/stats` - Get driver statistics
- `GET /api/drivers/nearby-rides` - Get nearby rides

### Parcels
- `POST /api/parcels/create` - Create a parcel
- `POST /api/parcels/:parcelId/accept` - Accept a parcel
- `POST /api/parcels/:parcelId/pickup` - Pickup a parcel
- `POST /api/parcels/:parcelId/deliver` - Deliver a parcel
- `POST /api/parcels/:parcelId/cancel` - Cancel a parcel
- `GET /api/parcels/history` - Get parcel history
- `GET /api/parcels/:parcelId` - Get parcel details

### Payments
- `POST /api/payments/create` - Create payment
- `POST /api/payments/process` - Process payment
- `POST /api/payments/refund` - Refund payment
- `POST /api/payments/wallet/add` - Add to wallet
- `GET /api/payments/history` - Get payment history
- `GET /api/payments/wallet` - Get wallet details

### Tracking
- `GET /api/tracking/ride/:rideId` - Track a ride
- `GET /api/tracking/parcel/:parcelId` - Track a parcel
- `POST /api/tracking/location` - Update location
- `GET /api/tracking/driver/:driverId/location` - Get driver location
- `GET /api/tracking/history` - Get tracking history

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:userId` - Get user details
- `PUT /api/admin/users/:userId/suspend` - Suspend user
- `PUT /api/admin/users/:userId/activate` - Activate user
- `PUT /api/admin/drivers/:driverId/verify` - Verify driver
- `GET /api/admin/rides` - Get all rides
- `GET /api/admin/parcels` - Get all parcels
- `GET /api/admin/revenue` - Get revenue report

## Database Schema

### User
- Basic user information
- Authentication details
- Wallet information
- Rating system

### Driver
- License information
- Vehicle details
- Bank account for payouts
- Location tracking
- Performance metrics

### Ride
- Pickup and dropoff locations
- Fare calculation
- Status tracking
- Payment information

### Parcel
- Sender and receiver information
- Parcel details
- Delivery tracking
- Pricing

### Payment
- Payment method
- Transaction details
- Refund information

### PromoCode
- Discount details
- Usage tracking
- Validity period

## Socket Events

### Client → Server
- `user-join` - User joins
- `driver-join` - Driver joins
- `location-update` - Location update
- `ride-request` - Request a ride
- `ride-accepted` - Accept a ride
- `ride-cancelled` - Cancel a ride

### Server → Client
- `ride-request` - Ride request received
- `ride-accepted` - Ride accepted
- `ride-cancelled` - Ride cancelled
- `location-update` - Location updated
- `driver-online` - Driver is online
- `driver-offline` - Driver is offline

## Project Structure

```
assa-pathao-backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── socket.js
│   │   └── redis.js
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── seeders/
│   ├── docs/
│   └── app.js
├── server.js
├── .env
├── package.json
└── README.md
```

## Development

Start the development server with auto-reload:
```bash
npm run dev
```

## Production

Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For support, email support@assapathao.com or join our Slack channel.

## Roadmap

- [ ] Payment gateway integration
- [ ] Advanced analytics
- [ ] Machine learning for pricing
- [ ] Referral program
- [ ] Insurance integration
- [ ] Mobile app support

## Changelog

### Version 1.0.0
- Initial release
- Basic ride and parcel features
- User and driver management
- Payment processing
- Real-time tracking

---

Made with ❤️ by the Assa Pathao Team
=======
# 🚀 Zezus - Super App

Zezus is a complete ride-sharing and delivery platform inspired by Pathao. One app for all your transportation and delivery needs.

## ✨ Features

- 🏍️ **Bike Rides** - Fast & affordable bike rides
- 🚗 **Car Travel** - Comfortable car rides with AC
- 🍔 **Food Delivery** - Order food from your favorite restaurants
- 📦 **Courier Service** - Send packages anywhere
- 📮 **Parcel Delivery** - On-demand parcel delivery
- 🔑 **Car Rentals** - Rent cars for any duration
- 🛍️ **Zezus Shop** - Exclusive merchandise
- 💳 **Zezus Pay** - Digital payment system
- 💬 **Live Chat** - 24/7 customer support
- 👤 **User Dashboard** - Track rides, payments & profile

## 🛠️ Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** React Icons
- **Maps:** Google Maps API (optional)
- **HTTP Client:** Axios (for future backend)

## 📁 Project Structure
Zezus-frontend/
├── src/
│ ├── components/ # Reusable components
│ ├── pages/ # All pages
│ ├── data/ # Static data
│ ├── App.js # Main app with routing
│ ├── index.js # Entry point
│ └── index.css # Global styles
├── public/ # Static assets
├── package.json # Dependencies
└── README.md # Documentation
>>>>>>> 1e45ba595b1acf8e53f26eae62abb4be63f561d6
