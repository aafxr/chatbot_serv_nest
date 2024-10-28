import { Price } from './Price';
import { Balance } from './Balance';
import { Transit } from './Transit';

export class ProductDetail{
  constructor(p:Partial<ProductDetail> = {}){
    Object.entries(p).forEach(([k,v]) => {
      if(k in this) this[k] = v
    })
  }


  // ApiCode: string = ''
  // ProductID: string = ''
  LinkToSite: string = ''
  PackUnitMeasure: string = ''
  PackUnitQuantity: string = ''
  ProductArticle: string = ''
  ProductArticleForChatBot: string = ''
  ProductName: string = ''
  TransitAmount: string = ''
  UnitOfMeasure: string = ''
  Price_MRC: Price = new Price()
  Price_RRC: Price = new Price()
  Balance_Strings: Balance[] = []
  Transit: Transit = new Transit()
}