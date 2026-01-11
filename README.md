# Gym Workout Tracker

A full-stack web application for tracking gym workouts with comprehensive exercise database, workout planning, and progress tracking.

## Features

- **Weekly Workout Planning**: Create workout plans for each day of the week
- **Comprehensive Exercise Library**: 117+ exercises across all categories (Push, Pull, Legs, Chest, Shoulders, Back, Arms, Core, Cardio, Olympic)
- **Workout Logging**: Track sets, reps, and weights for each exercise
- **Workout History**: View past workout sessions and track progress
- **Exercise Browser**: Browse and filter exercises by category and muscle group
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Backend
- Node.js + Express + TypeScript
- PostgreSQL database
- Prisma ORM
- RESTful API

### Frontend
- React + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router
- Axios

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository

```bash
cd gym-workout-tracker
```

### 2. Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new PostgreSQL database:

```bash
createdb gym_tracker
```

Or using psql:
```sql
CREATE DATABASE gym_tracker;
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
```

Edit the `.env` file with your database credentials:
```
DATABASE_URL="postgresql://username:password@localhost:5432/gym_tracker"
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Replace `username` and `password` with your PostgreSQL credentials.

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database with exercises
npm run prisma:seed

# Start the backend server
npm run dev
```

The backend server should now be running on `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env
```

The `.env` file should contain:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
# Start the development server
npm run dev
```

The frontend should now be running on `http://localhost:5173`

## Usage

### 1. Create Workout Plans

1. Navigate to "Workout Plans" from the sidebar
2. Select a day of the week
3. Browse exercises by category
4. Add exercises to your plan
5. Set default sets, reps, and weights
6. Save your workout plan

### 2. Log Workouts

1. Navigate to "Log Workout" from the sidebar
2. Select the day (or use today's automatically loaded plan)
3. For each exercise, log your sets with reps and weights
4. Mark sets as completed
5. Add optional workout notes
6. Click "Complete Workout" to save

### 3. View History

1. Navigate to "History" from the sidebar
2. Browse your past workout sessions
3. Click on a session to view details
4. See all exercises, sets, reps, and weights logged

### 4. Browse Exercises

1. Navigate to "Exercises" from the sidebar
2. Use the search bar to find specific exercises
3. Filter by category (Push, Pull, Legs, etc.)
4. Click on an exercise to view detailed information

## API Endpoints

### Exercises
- `GET /api/exercises` - Get all exercises
- `GET /api/exercises/:id` - Get single exercise
- `GET /api/exercises/category/:category` - Get exercises by category

### Workout Plans
- `GET /api/workout-plans` - Get all workout plans
- `GET /api/workout-plans/:id` - Get single workout plan
- `GET /api/workout-plans/day/:dayOfWeek` - Get plan for specific day
- `POST /api/workout-plans` - Create workout plan
- `PUT /api/workout-plans/:id` - Update workout plan
- `DELETE /api/workout-plans/:id` - Delete workout plan

### Workout Sessions
- `GET /api/workout-sessions` - Get all sessions
- `GET /api/workout-sessions/:id` - Get single session
- `POST /api/workout-sessions` - Create session
- `PUT /api/workout-sessions/:id` - Update session
- `POST /api/workout-sessions/:id/complete` - Mark session complete
- `DELETE /api/workout-sessions/:id` - Delete session

## Project Structure

```
gym-workout-tracker/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.ts             # Exercise seed data
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   └── server.ts           # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/                # API client functions
    │   ├── components/         # React components
    │   ├── pages/              # Route pages
    │   ├── types/              # TypeScript types
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## Exercise Categories

The app includes 117+ exercises across these categories:

- **PUSH** (32 exercises): Chest, Shoulders, Triceps
  - Bench Press, Overhead Press, Dips, Push-ups, etc.

- **PULL** (26 exercises): Back, Biceps
  - Deadlift, Pull-ups, Rows, Curls, etc.

- **LEGS** (28 exercises): Quads, Hamstrings, Glutes, Calves
  - Squats, Lunges, Leg Press, Romanian Deadlifts, etc.

- **CORE** (14 exercises): Abs, Obliques
  - Planks, Crunches, Leg Raises, etc.

- **CARDIO** (10 exercises)
  - Treadmill, Rowing, Jump Rope, Burpees, etc.

- **OLYMPIC/FULL BODY** (7 exercises)
  - Clean & Jerk, Snatch, Thrusters, Kettlebell Swings, etc.

## Development Commands

### Backend
```bash
npm run dev          # Start development server with auto-reload
npm run build        # Build for production
npm start            # Start production server
npm run prisma:migrate  # Run database migrations
npm run prisma:seed     # Seed database with exercises
npm run prisma:studio   # Open Prisma Studio (database GUI)
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Troubleshooting

### Backend won't start
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Run `npm run prisma:generate` to regenerate Prisma client

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `VITE_API_BASE_URL` in frontend `.env`
- Check CORS settings in backend

### Database migration fails
- Ensure database exists
- Check PostgreSQL connection
- Try deleting `prisma/migrations` folder and run migrations again

## Future Enhancements

- User authentication and profiles
- Progress charts and analytics
- Body measurements tracking
- Photo progress tracking
- Rest timer between sets
- Exercise form videos
- Social features (share workouts)
- Mobile app

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
