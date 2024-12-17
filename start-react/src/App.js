import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminRoute } from './service/guard';

// Import components
// import Navbar from './component/common/Navbar';
// import FooterComponent from './component/common/Footer';
import HomePage from './component/home/HomePage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import ArticleForm from './component/article/articleForm';
import ArticleList from './component/article/ArticleList';
import ProfilePage from './component/utils/Private Route';
import AdminDashboard from './component/utils/Admin Route';
import NotFoundPage from './component/utils/Private Route';
import PrivateRoute from "./component/utils/Private Route";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          {/*<Navbar />*/}
          <div className="content">
            <Routes>
               Public Routes
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route
                  path="/write"
                  element={
                    <PrivateRoute>
                      <ArticleForm />
                    </PrivateRoute>
                  }
              />
                <Route
                    path="/artical"
                    element={
                        <PrivateRoute>
                            <ArticleList />
                        </PrivateRoute>
                    }
                />
              <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
              />

              {/* Admin Routes */}
              <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
              />

              {/* 404 Not Found Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          {/*<FooterComponent />*/}
        </div>
      </BrowserRouter>
  );
}

export default App;