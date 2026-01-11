import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import WorkoutPlanPage from './pages/WorkoutPlanPage';
import LogWorkoutPage from './pages/LogWorkoutPage';
import HistoryPage from './pages/HistoryPage';
import ExercisesPage from './pages/ExercisesPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout-plan"
            element={
              <ProtectedRoute>
                <Layout>
                  <WorkoutPlanPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/log-workout"
            element={
              <ProtectedRoute>
                <Layout>
                  <LogWorkoutPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <Layout>
                  <HistoryPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercises"
            element={
              <ProtectedRoute>
                <Layout>
                  <ExercisesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
