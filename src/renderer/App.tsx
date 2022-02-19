/* eslint-disable no-console */
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Libs
import { parseProfileData } from './libs/ProfilesFuncs';

// Hooks
import useProfiles from './hooks/useProfiles';
import useTheme from './hooks/useTheme';
import useCloseEvent from './hooks/useCloseEvent';

// layout
const Layout = lazy(() => import('./layout'));

// Pages
const ProfileConfig = lazy(() => import('./pages/ProfileConfig'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
  const [, setProfiles] = useProfiles();
  const { theme, setTheme } = useTheme();
  useCloseEvent();

  useEffect(() => {
    parseProfileData(setProfiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    parseProfileData(setProfiles);
  }, [setProfiles]);

  return (
    <MemoryRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
      />
      <Suspense fallback={<h1>LOADING</h1>}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/edit-profile" element={<ProfileConfig />} />
            <Route path="/add-profile" element={<ProfileConfig />} />
            <Route
              path="/settings"
              element={<Settings theme={theme} setTheme={setTheme} />}
            />
          </Routes>
        </Layout>
      </Suspense>
    </MemoryRouter>
  );
}
