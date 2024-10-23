import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Price } from '../classes/Price';
import { Balance } from '../classes/Balance';
import { Transit } from '../classes/Transit';

@Entity()
export class ProductDetail{
  constructor(p:Partial<ProductDetail> = {}){
    Object.entries(p).forEach(([k,v]) => {
      if(k in this) this[k] = v
    })
  }


  @PrimaryColumn()
  id: number

  @Column({name: 'api_code',type: 'longtext'})
  ApiCode: string = ''

  @Column({name: 'product_id', type: 'longtext'})
  ProductID: string = ''

  @Column({name: 'link_to_site', type: 'longtext'})
  linkToSite: string = ''

  @Column({name: 'pack_unit_measure', type: 'longtext'})
  PackUnitMeasure: string = ''

  @Column({name: 'pack_unit_quantity', type: 'longtext'})
  PackUnitQuantity: string = ''

  @Column({name: 'product_article', type: 'longtext'})
  ProductArticle: string = ''

  @Column({name: 'product_article_for_chat_bot', type: 'longtext'})
  ProductArticleForChatBot: string = ''

  @Column({name: 'product_name', type: 'longtext'})
  ProductName: string = ''

  @Column({name: 'transit_amount', type: 'longtext'})
  TransitAmount: string = ''

  @Column({name: 'unit_of_measure', type: 'longtext'})
  UnitOfMeasure: string = ''


  @Column({name: 'price_mrc', type: 'json'})
  Price_MRC: Price = new Price()

  @Column({name: 'price_rrc', type: 'json'})
  Price_RRC: Price = new Price()

  @Column({name: 'balance_strings', type: 'json'})
  Balance_Strings: Balance[] = []

  @Column({name: 'transit', type: 'json'})
  Transit: Transit = new Transit()
}