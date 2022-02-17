import { IProfile } from 'type/profile';

export interface IStore {
  configName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaults: IProfile[] | any;
}
