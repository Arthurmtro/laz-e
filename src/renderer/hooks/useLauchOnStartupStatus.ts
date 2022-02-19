import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

// Libs
import {
  getLauchOnStartupStatus,
  setLauchOnStartupStatus as setLauchOnStartupStatusFunc,
} from '../libs/ProfilesFuncs';

const LauchOnStartupStatusAtom = atom(true);

export default function useLauchOnStartupStatus() {
  const [lauchOnStartupStatus, setLauchOnStartupStatus] = useAtom(
    LauchOnStartupStatusAtom
  );

  const init = async () => {
    setLauchOnStartupStatusFunc(await getLauchOnStartupStatus());
    setLauchOnStartupStatus(await getLauchOnStartupStatus());
  };

  const handleChange = async () => {
    const storedLauchOnStartupStatus = await getLauchOnStartupStatus();

    if (lauchOnStartupStatus !== storedLauchOnStartupStatus) {
      setLauchOnStartupStatusFunc(!storedLauchOnStartupStatus);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lauchOnStartupStatus]);

  return { lauchOnStartupStatus, setLauchOnStartupStatus };
}
