# AutoExperts Frontend

AutoExperts Frontend is a React + Vite web application for a car services and auction platform. It includes a public landing page, inspection booking, used-car listings, auction browsing and bidding, member authentication, admin tools, a car price predictor, and an AI car assistant.

## Features

- Public landing page for AutoExperts services
- Inspection slot booking with OTP verification
- Used-car listing page with filters
- Admin login and dashboard
- Admin tools for adding used cars and auction cars
- Member signup and login
- Auction platform with car listings, auction timers, and bidding
- Car detail pages with images, vehicle information, and inspection report download
- Car price prediction form
- AI car assistant chatbot
- Responsive UI built with React components and Tailwind/CSS styling

## Tech Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Material UI
- Formik
- Yup
- Framer Motion
- Socket.IO Client
- React Toastify
- React Icons

## Project Structure

```text
AutoExperts-Frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── Pages/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── InspectionForm.jsx
│   │   ├── CheckBooking.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProductList.jsx
│   │   ├── Predictor.jsx
│   │   ├── MemberLogin.jsx
│   │   ├── MemberSignin.jsx
│   │   ├── AuctionPlatform.jsx
│   │   ├── AuctionProduct.jsx
│   │   ├── AddCarForm.jsx
│   │   └── AuctionList.jsx
│   ├── components/
│   ├── layout/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
