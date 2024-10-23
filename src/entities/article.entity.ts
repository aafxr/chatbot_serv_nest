import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Article{
  constructor(p:Partial<Article> = {}){
    Object.entries(p).forEach(([k,v]) => {
      if(k in this) this[k] = v
    })
  }

  @PrimaryColumn()
  id: string

  @Column()
  name:string = ''
}