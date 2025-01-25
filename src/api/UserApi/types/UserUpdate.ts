import { User } from '../../../types/User.ts';

export type UserUpdate = Omit<User, 'id' | 'avatar'>;
