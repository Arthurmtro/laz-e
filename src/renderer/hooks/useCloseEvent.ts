import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

// Libs
import {
  getCloseEvent,
  setCloseEvent as setCloseEventFunc,
} from '../libs/ProfilesFuncs';

const CloseEventAtom = atom(false);

export default function useCloseEvent() {
  const [closeEvent, setCloseEvent] = useAtom(CloseEventAtom);

  const init = async () => {
    setCloseEventFunc(await getCloseEvent());
    setCloseEvent(await getCloseEvent());
  };

  const handleChange = async () => {
    const storedCloseEvent = await getCloseEvent();

    if (closeEvent !== storedCloseEvent) {
      setCloseEventFunc(!storedCloseEvent);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeEvent]);

  return { closeEvent, setCloseEvent };
}
