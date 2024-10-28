import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Column, PrimaryColumn } from 'typeorm';

@Injectable()
export class Organization {

  @PrimaryColumn()
  id: number

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
}
