export class OrderItem{
  id?: number
  title: string = ''
  count: number = 0
  price: string = '0'
  measure: string = ''
  packCount: number = 0
  packUnitQuantity: number = 0
  packMeasure: string = ''


  constructor(o: Partial<OrderItem> = {}) {
    if(o.id) this.id = o.id
    if(o.title) this.title = o.title
    if(o.count) this.count = o.count
    if(o.price) this.price = o.price
    if(o.measure) this.measure = o.measure
    if(o.packCount) this.packCount = o.packCount
    if(o.packUnitQuantity) this.packUnitQuantity = o.packUnitQuantity
    if(o.packMeasure) this.packMeasure = o.packMeasure
  }


}