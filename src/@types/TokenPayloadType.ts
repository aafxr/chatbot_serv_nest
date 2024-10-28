import { UserRole } from './UserRole';

export type TokenPayloadType = {
  userId: string
  role: UserRole
  [key: string]: any
}