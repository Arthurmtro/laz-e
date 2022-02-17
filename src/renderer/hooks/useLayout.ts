import { atom, useAtom } from 'jotai';

const LayoutAtom = atom('Laz-e');

export default function useLayout() {
  return useAtom(LayoutAtom);
}
