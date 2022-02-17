import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// Libs
import { parseProfileData } from './libs/ProfilesFuncs';

// Hooks
import useProfiles from './hooks/useProfiles';

// Pages
import ProfileConfig from './pages/ProfileConfig';
import Dashboard from './pages/Dashboard';

// layout
import Layout from './layout';

export default function App() {
  const [, setProfiles] = useProfiles();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('REFRESH TRIGGERED');
    parseProfileData(setProfiles);
  }, [setProfiles]);

  return (
    <MemoryRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-profile" element={<ProfileConfig />} />
          <Route path="/edit-profile" element={<ProfileConfig />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  );
}
