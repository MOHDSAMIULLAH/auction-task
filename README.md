# User Management and Auction Bidding System

## Overview

This project implements two microservices:

1. **User Management and Authentication**

   - Admin with access to all user data.
   - Basic CRUD operations for users.
   - Token-based user authentication.

2. **Auction Management and Bidding**
   - Admin-managed CRUD operations on auctions.
   - Auctions include start time, end time, starting price, item name, and user ID of the winner.
   - Users can view ongoing auctions and place bids.
   - The auction is awarded to the user with the highest bid after the end time.

## Features

### User Management

- **Admin**
  - Access all user data.
 
- **User**
  - Create & read users.
  - Login with token-based authentication.

### Auction Management

- **Admin**
  - Manage auctions with CRUD operations.
  - Authentication using a static API secret.
  - View all auction statuses at any time.
- **User**
  - View ongoing auctions.
  - Place bids on auctions using token-based authentication.
  - Auctions are automatically awarded to the user with the highest bid after the end time.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **ORM:** Mongoose

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MOHDSAMIULLAH/wasserstoff-FullstackInternTask.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI= "mongodb+srv://samiullah0813:samiullah0813@cluster0.f8mo9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   JWT_SECRET= "topsecret"
   NODE_ENV=development
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

## API Endpoints

### User Management

#### User

- **Register:**

  - `POST /api/users/register`

- **Login:**

  - `POST /api/users/login`

- **Get all users details:**
  - `GET /api/users/`
  - Requires a valid JWT token.

### Auction Management

#### Admin

- **Create auction:**

  - `POST /api/auctions`
  - Requires a valid JWT token headers with `admin` role.

- **Get all auctions:**

  - `GET /api/auctions`
  - Requires a valid JWT token headers with `admin` role.


#### User

- **View all ongoing auctions:**

  - `GET /api/auctions`

- **Place a bid:**
  - `POST /api/auctions/bid`
  - body: { "auctionId":"123", "bidAmount":123 }
  - Requires a valid JWT token.

- **End auction:**
  - `PUT /api/auctions/:id/end`

