# KishanBrand - Personal Brand Website

A premium personal brand website for Kishan Kumar (Build With Kishan) with workshop registration functionality and admin panel.

## Features

- 🎨 **Modern Dark Theme** - Beautiful dark UI with glass morphism effects
- 📝 **Workshop Registration** - Users can register for workshops
- 🔐 **Admin Panel** - View all workshop registrations
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - Built with Vite and React
- 🗄️ **SQLite Database** - Local database for storing registrations

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Express.js, Node.js
- **Database**: SQLite with Drizzle ORM
- **Build Tool**: Vite
- **Routing**: Wouter

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npm run db:push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit: `http://localhost:5001`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes

## Project Structure

```
KishanBrand/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   └── ...
├── server/                # Backend Express server
│   ├── database.ts        # Database configuration
│   ├── routes.ts          # API routes
│   └── ...
├── shared/                # Shared schemas and types
└── kishanbrand.db         # SQLite database file
```

## API Endpoints

- `POST /api/workshop/register` - Register for workshop
- `GET /api/admin/registrations` - Get all registrations (admin)

## Admin Panel

Access the admin panel at `/admin` to view all workshop registrations. The admin panel shows:
- Total number of registrations
- Registration details (name, email, profession, date)
- Real-time data from the database

## Database Schema

The application uses SQLite with the following tables:
- `workshop_registrations` - Stores workshop registration data
- `users` - User authentication (for future use)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
