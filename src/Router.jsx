import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AddEntryPage } from './components/AddEntryPage';
import { DirectoryDashboardPage } from './components/DirectoryDashboardPage';
import { EditEntryPage } from './components/EditEntryPage';
import { EntryDetailsPage } from './components/EntryDetailsPage';
import { LoginPage } from './components/LoginPage';
import { NotFoundPage } from './components/NotFoundPage';
import { OtherPage } from './components/OtherPage';
import { RoomsPage } from './components/RoomsPage';
import { ScrollToTop } from './components/ScrollToTop';
import { TeamPage } from './components/TeamPage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => !!state.auth.uid);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const Router = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<DirectoryDashboardPage />} />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <AddEntryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditEntryPage />
          </PrivateRoute>
        }
      />
      <Route path="/details/:id" element={<EntryDetailsPage />} />
      <Route path="/teams/:team" element={<TeamPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/other" element={<OtherPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
