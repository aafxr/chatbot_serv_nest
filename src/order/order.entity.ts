import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { OrderItem } from '../classes';
import { Organization } from '../organization/organization.entity';

@Entity()
export class Order{
  constructor(o: Partial<Order>) {
    if(o.id !== undefined) this.id = o.id
    if(o.userId !== undefined) this.userId = o.userId
    if(o.status !== undefined) this.status = o.status
    if(o.comment !== undefined) this.comment = o.comment
    if(o.orderItems !== undefined) this.orderItems = o.orderItems
    if(o.organizationId !== undefined) this.organizationId = o.organizationId
    if(o.createdAt !== undefined) this.createdAt = new Date(o.createdAt)
    if(o.deletedAt !== undefined) this.deletedAt = new Date(o.deletedAt)
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: User['id']

  @Column()
  status: string = ''

  @Column()
  comment: string = ''

  @Column()
  orderItems: OrderItem

  @Column()
  organizationId: Organization['id']

  @Column()
  createdAt: Date

  @Column()
  deletedAt: Date | null = null
}