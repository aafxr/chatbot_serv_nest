import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Property } from '../@types/Property';
import { Photo } from '../@types/Photo';

@Entity()
export class Product{
  @PrimaryColumn({type:'varchar', length: 255})
  id: string

  @Column({name: 'api_code', type:'longtext'})
  apiCode: string

  @Column({name: 'api_uid', type: 'longtext'})
  apiUID: string

  @Column({type: 'longtext'})
  currency: string

  @Column({type: 'longtext'})
  price: string

  @Column({type: 'longtext'})
  preview: string

  @Column({type:'json'})
  photo: Photo[]

  @Column({type:'json'})
  properties: Property[]
}