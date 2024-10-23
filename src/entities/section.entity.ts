import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Section{
  constructor(p:Partial<Section> = {}){
    Object.entries(p).forEach(([k,v]) => {
      if(k in this) this[k] = v
    })
  }

  @PrimaryColumn()
  id: number

  @Column({type: 'json'})
  items: string[] = []

  @Column()
  parent: string = ''

  @Column()
  sort: string = ''

  @Column()
  title: string = ''
}