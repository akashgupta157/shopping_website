# Shopping Website - React + Fake Store API

## Project Overview

This is a front-end internship assignment that demonstrates building a shopping website using React and the Fake Store API. The application includes user authentication, product listing, cart functionality, and responsive design.

## Features

- **User Authentication**
  - Login page with JWT token storage
  - Logout functionality
- **Product Management**
  - Product listing with category filtering
  - Product detail pages
  - (Optional) Search functionality
- **Shopping Cart**
  - Add/remove products
  - Quantity adjustment
  - Checkout process
- **Responsive Design**
  - Mobile-first approach
  - Clean, modern UI

## Technical Stack

- React.js (created with Vite)
- React Router v6+ for navigation
- React Hooks for state management
- Context API (optional) for cart state
- Plain CSS with responsive design
- Fake Store API for backend data

## API Endpoints Used

- Authentication: `POST /auth/login`
- Products: 
  - `GET /products` 
  - `GET /products/category/:category`
- Single Product: `GET /products/:id`

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Deployment

The project is deployed on [Vercel/Netlify] at: [Live Demo Link]
