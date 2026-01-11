import React, { useState, useEffect } from 'react';
import { Exercise, Category } from '../types/exercise.types';
import { getAllExercises } from '../api/exercises.api';

const ExercisesPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [exercises, selectedCategory, searchTerm]);

  const loadExercises = async () => {
    try {
      const data = await getAllExercises();
      setExercises(data);
      setFilteredExercises(data);
    } catch (error) {
      console.error('Error loading exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = () => {
    let filtered = exercises;

    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(ex => ex.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(ex =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.muscleGroups.some(mg => mg.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredExercises(filtered);
  };

  const getCategoryCount = (category: Category | 'ALL') => {
    if (category === 'ALL') return exercises.length;
    return exercises.filter(ex => ex.category === category).length;
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
        <h1 className="text-3xl font-bold text-gray-900">Exercise Library</h1>
        <p className="mt-2 text-gray-600">
          Browse through {exercises.length}+ exercises across all categories
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search exercises by name or muscle group..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'ALL'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All ({getCategoryCount('ALL')})
        </button>
        {Object.values(Category).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat} ({getCategoryCount(cat)})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Exercise List */}
        <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {filteredExercises.map(exercise => (
            <div
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              className={`card cursor-pointer transition-all hover:shadow-lg ${
                selectedExercise?.id === exercise.id ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{exercise.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {exercise.category}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {exercise.difficulty}
                    </span>
                    {exercise.equipment && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {exercise.equipment}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {exercise.muscleGroups.join(', ')}
                  </div>
                  {exercise.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {exercise.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredExercises.length === 0 && (
            <div className="card text-center py-12 text-gray-400">
              No exercises found matching your criteria
            </div>
          )}
        </div>

        {/* Right: Exercise Details */}
        <div>
          {selectedExercise ? (
            <div className="card sticky top-24">
              <h3 className="text-2xl font-bold mb-4">{selectedExercise.name}</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Category</h4>
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {selectedExercise.category}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Difficulty</h4>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedExercise.difficulty === 'BEGINNER'
                      ? 'bg-green-100 text-green-700'
                      : selectedExercise.difficulty === 'INTERMEDIATE'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedExercise.difficulty}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Muscle Groups</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExercise.muscleGroups.map((mg, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                        {mg}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedExercise.equipment && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Equipment</h4>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm capitalize">
                      {selectedExercise.equipment}
                    </span>
                  </div>
                )}

                {selectedExercise.description && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                    <p className="text-gray-600 text-sm">{selectedExercise.description}</p>
                  </div>
                )}

                {selectedExercise.instructions && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Instructions</h4>
                    <p className="text-gray-600 text-sm">{selectedExercise.instructions}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card text-center py-12 text-gray-400 sticky top-24">
              Select an exercise to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
