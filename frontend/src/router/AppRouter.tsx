import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { LoginPage } from '../pages/Login/LoginPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { TasksPage } from '../pages/Tasks/TasksPage';
import { TaskDetailPage } from '../pages/TaskDetail/TaskDetailPage';
import { AccessControlPage } from '../pages/AccessControl/AccessControlPage';
import { NotificationsPage } from '../pages/Notifications/NotificationsPage';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/:id" element={<TaskDetailPage />} />
        <Route path="access" element={<AccessControlPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);