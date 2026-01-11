import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DayOfWeek, WorkoutPlan } from '../types/exercise.types';
import { getAllWorkoutPlans } from '../api/workoutPlans.api';

const daysOfWeek = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
  DayOfWeek.SUNDAY,
];

const HomePage: React.FC = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkoutPlans();
  }, []);

  const loadWorkoutPlans = async () => {
    try {
      const plans = await getAllWorkoutPlans();
      setWorkoutPlans(plans);
    } catch (error) {
      console.error('Error loading workout plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlanForDay = (day: DayOfWeek) => {
    return workoutPlans.find(plan => plan.dayOfWeek === day && plan.isActive);
  };

  const formatDayName = (day: DayOfWeek) => {
    return day.charAt(0) + day.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Weekly Plan</h1>
        <p className="mt-2 text-gray-600">
          Plan your workouts for each day of the week
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {daysOfWeek.map((day) => {
          const plan = getPlanForDay(day);
          const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase() === day;

          return (
            <div
              key={day}
              className={`card transition-all hover:shadow-lg ${
                isToday ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-lg font-semibold ${isToday ? 'text-primary-600' : 'text-gray-800'}`}>
                  {formatDayName(day)}
                  {isToday && <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">Today</span>}
                </h3>
              </div>

              {plan ? (
                <div>
                  <p className="text-sm text-gray-600 mb-3">{plan.name}</p>
                  <div className="space-y-1 mb-4">
                    {plan.exercises.slice(0, 3).map((ex) => (
                      <div key={ex.id} className="text-xs text-gray-500">
                        • {ex.exercise.name}
                      </div>
                    ))}
                    {plan.exercises.length > 3 && (
                      <div className="text-xs text-gray-400">
                        +{plan.exercises.length - 3} more exercises
                      </div>
                    )}
                  </div>
                  <Link
                    to="/log-workout"
                    state={{ dayOfWeek: day }}
                    className="btn btn-primary w-full text-sm"
                  >
                    Start Workout
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400 mb-4">No workout planned</p>
                  <Link
                    to="/workout-plan"
                    state={{ dayOfWeek: day }}
                    className="btn btn-secondary w-full text-sm"
                  >
                    Create Plan
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/workout-plan" className="card hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">📋</div>
          <h3 className="text-xl font-semibold mb-2">Workout Plans</h3>
          <p className="text-gray-600 text-sm">
            Create and manage your workout plans for each day
          </p>
        </Link>

        <Link to="/log-workout" className="card hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">✏️</div>
          <h3 className="text-xl font-semibold mb-2">Log Workout</h3>
          <p className="text-gray-600 text-sm">
            Record your sets, reps, and weights
          </p>
        </Link>

        <Link to="/history" className="card hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-xl font-semibold mb-2">View History</h3>
          <p className="text-gray-600 text-sm">
            Track your progress and past workouts
          </p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
