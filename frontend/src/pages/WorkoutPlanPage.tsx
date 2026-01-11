import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DayOfWeek, Category, Exercise, WorkoutPlan } from '../types/exercise.types';
import { getAllExercises } from '../api/exercises.api';
import { createWorkoutPlan, updateWorkoutPlan, getWorkoutPlanByDay } from '../api/workoutPlans.api';

interface SelectedExercise {
  exercise: Exercise;
  plannedSets: number;
  plannedReps: number;
  plannedWeight?: number;
  orderIndex: number;
}

const WorkoutPlanPage: React.FC = () => {
  const location = useLocation();
  const initialDay = location.state?.dayOfWeek || DayOfWeek.MONDAY;

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(initialDay);
  const [planName, setPlanName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);
  const [existingPlan, setExistingPlan] = useState<WorkoutPlan | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadExercises();
    loadExistingPlan();
  }, [selectedDay]);

  const loadExercises = async () => {
    try {
      const data = await getAllExercises();
      setExercises(data);
    } catch (error) {
      console.error('Error loading exercises:', error);
    }
  };

  const loadExistingPlan = async () => {
    try {
      const plan = await getWorkoutPlanByDay(selectedDay);
      if (plan) {
        setExistingPlan(plan);
        setPlanName(plan.name);
        setSelectedExercises(
          plan.exercises.map((ex, idx) => ({
            exercise: ex.exercise,
            plannedSets: ex.plannedSets,
            plannedReps: ex.plannedReps,
            plannedWeight: ex.plannedWeight || undefined,
            orderIndex: idx
          }))
        );
      } else {
        setExistingPlan(null);
        setPlanName(`${selectedDay.charAt(0) + selectedDay.slice(1).toLowerCase()} Workout`);
        setSelectedExercises([]);
      }
    } catch (error) {
      console.error('Error loading existing plan:', error);
    }
  };

  const filteredExercises = exercises.filter(ex => {
    const matchesCategory = selectedCategory === 'ALL' || ex.category === selectedCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addExercise = (exercise: Exercise) => {
    if (selectedExercises.find(e => e.exercise.id === exercise.id)) {
      return;
    }
    setSelectedExercises([
      ...selectedExercises,
      {
        exercise,
        plannedSets: 3,
        plannedReps: 10,
        orderIndex: selectedExercises.length
      }
    ]);
  };

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter(e => e.exercise.id !== exerciseId));
  };

  const updateExerciseData = (exerciseId: string, field: string, value: number) => {
    setSelectedExercises(
      selectedExercises.map(e =>
        e.exercise.id === exerciseId ? { ...e, [field]: value } : e
      )
    );
  };

  const savePlan = async () => {
    if (!planName.trim() || selectedExercises.length === 0) {
      alert('Please enter a plan name and add at least one exercise');
      return;
    }

    setLoading(true);
    try {
      const planData = {
        name: planName,
        dayOfWeek: selectedDay,
        isActive: true,
        exercises: selectedExercises.map((ex, idx) => ({
          exerciseId: ex.exercise.id,
          orderIndex: idx,
          plannedSets: ex.plannedSets,
          plannedReps: ex.plannedReps,
          plannedWeight: ex.plannedWeight,
          restSeconds: 60
        }))
      };

      if (existingPlan) {
        await updateWorkoutPlan(existingPlan.id, planData as any);
        alert('Workout plan updated successfully!');
      } else {
        await createWorkoutPlan(planData as any);
        alert('Workout plan created successfully!');
      }

      await loadExistingPlan();
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save workout plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Workout Plan</h1>
        <p className="mt-2 text-gray-600">
          Select a day and add exercises to create your workout plan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Exercise Selection */}
        <div>
          <div className="card mb-6">
            <div className="mb-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan Name
              </label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="input"
                placeholder="e.g., Push Day, Leg Day"
              />
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Browse Exercises</h3>

            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input mb-4"
            />

            <div className="mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === 'ALL'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                All
              </button>
              {Object.values(Category).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredExercises.map(exercise => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{exercise.name}</div>
                    <div className="text-xs text-gray-500">
                      {exercise.category} • {exercise.muscleGroups.join(', ')}
                    </div>
                  </div>
                  <button
                    onClick={() => addExercise(exercise)}
                    className="btn btn-primary text-sm"
                    disabled={selectedExercises.some(e => e.exercise.id === exercise.id)}
                  >
                    {selectedExercises.some(e => e.exercise.id === exercise.id) ? 'Added' : 'Add'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Selected Exercises */}
        <div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">
              Selected Exercises ({selectedExercises.length})
            </h3>

            {selectedExercises.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No exercises added yet. Add exercises from the left panel.
              </div>
            ) : (
              <div className="space-y-4">
                {selectedExercises.map((item) => (
                  <div key={item.exercise.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="font-medium">{item.exercise.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.exercise.muscleGroups.join(', ')}
                        </div>
                      </div>
                      <button
                        onClick={() => removeExercise(item.exercise.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Sets
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.plannedSets}
                          onChange={(e) =>
                            updateExerciseData(item.exercise.id, 'plannedSets', parseInt(e.target.value))
                          }
                          className="input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Reps
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.plannedReps}
                          onChange={(e) =>
                            updateExerciseData(item.exercise.id, 'plannedReps', parseInt(e.target.value))
                          }
                          className="input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Weight (lbs)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="5"
                          value={item.plannedWeight || ''}
                          onChange={(e) =>
                            updateExerciseData(
                              item.exercise.id,
                              'plannedWeight',
                              e.target.value ? parseFloat(e.target.value) : 0
                            )
                          }
                          className="input text-sm"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={savePlan}
              disabled={loading || selectedExercises.length === 0}
              className="btn btn-primary w-full mt-6"
            >
              {loading ? 'Saving...' : existingPlan ? 'Update Plan' : 'Create Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanPage;
