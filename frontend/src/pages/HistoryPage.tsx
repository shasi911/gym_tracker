import React, { useState, useEffect } from 'react';
import { WorkoutSession } from '../types/exercise.types';
import { getAllWorkoutSessions } from '../api/workoutSessions.api';
import { format } from 'date-fns';

const HistoryPage: React.FC = () => {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await getAllWorkoutSessions();
      setSessions(data);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
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
        <h1 className="text-3xl font-bold text-gray-900">Workout History</h1>
        <p className="mt-2 text-gray-600">
          View your past workouts and track your progress
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            No workout sessions logged yet
          </div>
          <a href="/log-workout" className="btn btn-primary">
            Log Your First Workout
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Session List */}
          <div className="space-y-4">
            {sessions.map(session => (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className={`card cursor-pointer transition-all hover:shadow-lg ${
                  selectedSession?.id === session.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {session.dayOfWeek.charAt(0) + session.dayOfWeek.slice(1).toLowerCase()}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(session.date)} at {formatTime(session.date)}
                    </p>
                  </div>
                  {session.completed && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      Completed
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">{session.logs.length}</span> exercises
                  </div>
                  {session.duration && (
                    <div>
                      <span className="font-medium">{session.duration}</span> minutes
                    </div>
                  )}
                </div>

                {session.notes && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {session.notes}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right: Session Details */}
          <div>
            {selectedSession ? (
              <div className="card sticky top-24">
                <h3 className="text-xl font-bold mb-4">
                  {selectedSession.dayOfWeek.charAt(0) + selectedSession.dayOfWeek.slice(1).toLowerCase()} - {formatDate(selectedSession.date)}
                </h3>

                <div className="space-y-4">
                  {selectedSession.logs.map(log => (
                    <div key={log.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <h4 className="font-semibold mb-2">{log.exercise.name}</h4>
                      <div className="space-y-1">
                        {log.sets.map((set) => (
                          <div
                            key={set.setNumber}
                            className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
                          >
                            <span className="text-gray-600">Set {set.setNumber}</span>
                            <span className="font-medium">
                              {set.reps} reps × {set.weight} lbs
                              {set.completed && (
                                <span className="ml-2 text-green-600">✓</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedSession.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <div className="text-xs text-gray-600 mb-1">Notes:</div>
                    <div className="text-sm">{selectedSession.notes}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="card text-center py-12 text-gray-400">
                Select a workout session to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
