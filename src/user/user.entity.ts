import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  constructor(u: Partial<User> = {}) {
    Object.entries(u)
      .forEach(([k, v]) => {
        if(k in this) this[k] = v
      })
  }


  @PrimaryColumn()
  id: number = -1

  @Column()
  firstName: string = ''

  @Column()
  lastName: string = ''

  @Column()
  nickname: string = ''

  @Column()
  photo: string = ''



  @Column()
  crmId: string = ''

  @Column()
  phone: string = ''

  @Column()
  country: string = ''

  @Column()
  city: string = ''

  @Column()
  storehouseId: string = ''

}
