import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Column, PrimaryColumn } from 'typeorm';

@Injectable()
export class Organization {
  constructor(o: Partial<Organization>) {
    if(o.id) this.id = o.id
    if(o.name) this.name = o.name
    if(o.fullName) this.fullName = o.fullName
    if(o.address) this.address = o.address
    if(o.country) this.country = o.country
    if(o.city) this.city = o.city
    if(o.inn) this.inn = o.inn
    if(o.userId) this.userId = o.userId
    o.createdAt ? this.createdAt = new Date(o.createdAt) : this.createdAt = new Date()
    if(o.updatedAt) this.updatedAt = new Date(o.updatedAt)
    if(o.deletedAt) this.deletedAt = new Date(o.deletedAt)
  }

  @PrimaryColumn()
  id: number = 0

  @Column()
  name: string = ''

  @Column()
  fullName: string = ''

  @Column()
  address: string = ''

  @Column()
  country: string = ''

  @Column()
  city: string = ''

  @Column()
  inn: string = ''

  @Column()
  userId: User['id']

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date | null = null

  @Column()
  deletedAt: Date | null = null
}
