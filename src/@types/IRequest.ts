import { Request } from 'express';

export interface IRequest extends Request{
  userId?: number
  isAdmin?: boolean
  isManager?: boolean
  isCustomer?: boolean
}