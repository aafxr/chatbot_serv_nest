import { Property } from './Property';
import { Photo } from './Photo';

export class Product{
  constructor(p:Partial<Product> = {}){
    Object.entries(p).forEach(([k,v]) => {
      if(k in this) this[k] = v
    })
  }

  id: string = '-1'
  apiCode: string = ''
  apiUID: string = ''
  currency: string = ''
  price: string = ''
  preview: string = ''
  photo: Photo[] = []
  properties: Property[] = []
}