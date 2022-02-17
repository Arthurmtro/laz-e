import { atom, useAtom } from 'jotai';

// types
import { IProfile } from 'type/profile';

const profilesAtom = atom<IProfile[]>([]);

export default function useProfiles() {
  return useAtom(profilesAtom);
}
