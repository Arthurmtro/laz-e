import { atom, useAtom } from 'jotai';

// types
import { IProfile } from 'type/profile';

const profilesAtom = atom([]);

export default function useProfiles() {
  return useAtom<IProfile[]>(profilesAtom);
}
