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
  first_name: string = ''

  @Column()
  last_name: string = ''

  @Column()
  username: string = ''

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
