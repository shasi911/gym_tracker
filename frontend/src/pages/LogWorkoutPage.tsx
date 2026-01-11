import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DayOfWeek, Exercise, SetLog } from '../types/exercise.types';
import { getWorkoutPlanByDay } from '../api/workoutPlans.api';
import { createWorkoutSession } from '../api/workoutSessions.api';

interface ExerciseLog {
  exercise: Exercise;
  sets: SetLog[];
}

const LogWorkoutPage: React.FC = () => {
  const location = useLocation();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase() as DayOfWeek;
  const initialDay = location.state?.dayOfWeek || today;

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(initialDay);
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [startTime] = useState(new Date());

  useEffect(() => {
    loadWorkoutPlan();
  }, [selectedDay]);

  const loadWorkoutPlan = async () => {
    try {
      const plan = await getWorkoutPlanByDay(selectedDay);
      if (plan && plan.exercises.length > 0) {
        setExerciseLogs(
          plan.exercises.map(ex => ({
            exercise: ex.exercise,
            sets: Array.from({ length: ex.plannedSets }, (_, i) => ({
              setNumber: i + 1,
              reps: ex.plannedReps,
              weight: ex.plannedWeight || 0,
              completed: false
            }))
          }))
        );
      } else {
        setExerciseLogs([]);
      }
    } catch (error) {
      console.error('Error loading workout plan:', error);
    }
  };

  const updateSet = (exerciseId: string, setNumber: number, field: keyof SetLog, value: any) => {
    setExerciseLogs(
      exerciseLogs.map(log =>
        log.exercise.id === exerciseId
          ? {
              ...log,
              sets: log.sets.map(set =>
                set.setNumber === setNumber ? { ...set, [field]: value } : set
              )
            }
          : log
      )
    );
  };

  const addSet = (exerciseId: string) => {
    setExerciseLogs(
      exerciseLogs.map(log =>
        log.exercise.id === exerciseId
          ? {
              ...log,
              sets: [
                ...log.sets,
                {
                  setNumber: log.sets.length + 1,
                  reps: log.sets[log.sets.length - 1]?.reps || 10,
                  weight: log.sets[log.sets.length - 1]?.weight || 0,
                  completed: false
                }
              ]
            }
          : log
      )
    );
  };

  const saveWorkout = async () => {
    if (exerciseLogs.length === 0) {
      alert('No exercises to log');
      return;
    }

    setLoading(true);
    try {
      const duration = Math.round((new Date().getTime() - startTime.getTime()) / 60000);

      await createWorkoutSession({
        date: new Date().toISOString(),
        dayOfWeek: selectedDay,
        duration,
        notes,
        completed: true,
        logs: exerciseLogs.map(log => ({
          exerciseId: log.exercise.id,
          sets: log.sets,
          notes: ''
        }))
      });

      alert('Workout logged successfully!');
      setExerciseLogs([]);
      setNotes('');
      await loadWorkoutPlan();
    } catch (error) {
      console.error('Error saving workout:', error);
      alert('Failed to save workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Log Workout</h1>
        <p className="mt-2 text-gray-600">
          Record your sets, reps, and weights for today's workout
        </p>
      </div>

      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Day of Week
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value as DayOfWeek)}
              className="select"
            >
              {Object.values(DayOfWeek).map(day => (
                <option key={day} value={day}>
                  {day.charAt(0) + day.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Started: {startTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {exerciseLogs.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            No workout plan found for {selectedDay.charAt(0) + selectedDay.slice(1).toLowerCase()}
          </div>
          <a href="/workout-plan" className="btn btn-primary">
            Create Workout Plan
          </a>
        </div>
      ) : (
        <>
          <div className="space-y-6 mb-6">
            {exerciseLogs.map((log) => (
              <div key={log.exercise.id} className="card">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{log.exercise.name}</h3>
                  <p className="text-sm text-gray-500">
                    {log.exercise.muscleGroups.join(', ')}
                  </p>
                </div>

                <div className="space-y-2">
                  {log.sets.map((set) => (
                    <div
                      key={set.setNumber}
                      className="grid grid-cols-12 gap-3 items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="col-span-2 text-sm font-medium text-gray-700">
                        Set {set.setNumber}
                      </div>
                      <div className="col-span-3">
                        <label className="block text-xs text-gray-600 mb-1">Reps</label>
                        <input
                          type="number"
                          min="1"
                          value={set.reps}
                          onChange={(e) =>
                            updateSet(log.exercise.id, set.setNumber, 'reps', parseInt(e.target.value))
                          }
                          className="input text-sm"
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="block text-xs text-gray-600 mb-1">Weight (lbs)</label>
                        <input
                          type="number"
                          min="0"
                          step="5"
                          value={set.weight}
                          onChange={(e) =>
                            updateSet(log.exercise.id, set.setNumber, 'weight', parseFloat(e.target.value))
                          }
                          className="input text-sm"
                        />
                      </div>
                      <div className="col-span-4 flex items-center justify-center">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={set.completed}
                            onChange={(e) =>
                              updateSet(log.exercise.id, set.setNumber, 'completed', e.target.checked)
                            }
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Completed</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addSet(log.exercise.id)}
                  className="btn btn-secondary w-full mt-3 text-sm"
                >
                  + Add Set
                </button>
              </div>
            ))}
          </div>

          <div className="card mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workout Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input min-h-24"
              placeholder="How did the workout feel? Any observations?"
            />
          </div>

          <button
            onClick={saveWorkout}
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'Saving...' : 'Complete Workout'}
          </button>
        </>
      )}
    </div>
  );
};

export default LogWorkoutPage;
