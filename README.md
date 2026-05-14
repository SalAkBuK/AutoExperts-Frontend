## Requirements

Before running the project, make sure you have:

- Node.js installed
- npm installed
- Backend APIs running for:
  - Authentication
  - Bookings
  - Products
  - Auctions
  - Chatbot
  - Price prediction

## Installation

Clone the repository:

```bash
git clone https://github.com/SalAkBuK/AutoExperts-Frontend.git
cd AutoExperts-Frontend
```

Install dependencies:

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Open the local development URL shown in your terminal.

Usually it will be:

```text
http://localhost:5173
```

## Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

### Start Development Server

```bash
npm run dev
```

Runs the app in development mode using Vite.

### Build Project

```bash
npm run build
```

Builds the app for production.

### Preview Build

```bash
npm run preview
```

Runs a local preview of the production build.

### Lint Code

```bash
npm run lint
```

Runs ESLint checks for JavaScript and JSX files.

## Main Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/dashboard` | Admin dashboard |
| `/booking-form` | Vehicle inspection booking form |
| `/booking-details` | Booking details page |
| `/product-form` | Add or manage product form |
| `/add-car-form` | Add auction car form |
| `/auction-car-list` | Auction car list |
| `/collection` | Used-car collection page |
| `/product/:productId` | Used-car product detail page |
| `/predictor` | Car price predictor |
| `/member` | Member page |
| `/member-login` | Member login |
| `/member-signin` | Member signup |
| `/ai-assistant` | AI assistant chatbot |
| `/forms/failure` | Failure response page |
| `/forms/success` | Success response page |
| `/profile/:memberId` | Member profile page |
| `/auction-platform` | Auction platform |
| `/member-platform` | Member auction platform |
| `/car/:carId` | Auction car detail page |
| `/car-details` | Car details page |
| `/logout` | Logout route |

## Backend API Notes

This repository contains the frontend only. The app expects backend services for:

- Admin authentication
- Member authentication
- Member registration
- Booking form submission
- Booking status/details
- Product listing
- Product upload
- Auction car listing
- Auction bidding
- Chatbot responses
- Car price prediction

For production, it is recommended to keep API URLs in environment variables instead of hard-coding them in source files.

Example:

```env
VITE_API_BASE_URL=
VITE_SOCKET_URL=
VITE_CHATBOT_API_URL=
VITE_PREDICTOR_API_URL=
```

## Deployment

Build the project:

```bash
npm run build
```

After building, deploy the generated `dist/` folder to a static hosting provider.

Common deployment options:

- Vercel
- Netlify
- GitHub Pages
- cPanel hosting
- Apache server
- Nginx server

Make sure your backend APIs are deployed and accessible from the frontend domain.

## Notes

- This is the frontend application for AutoExperts.
- Backend services must run separately.
- Auction features may require real-time backend support.
- Some features depend on external API endpoints.
- Review API URLs before deploying to production.
- Keep sensitive keys and backend credentials out of the frontend repository.

## License

No license file has been added yet. Add a license if you plan to make the project open source or distribute it publicly.
