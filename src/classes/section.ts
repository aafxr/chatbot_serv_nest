export class Section{
  constructor(p:Partial<Section> = {}){
    Object.entries(p).forEach(([k,v]) => {
      if(k in this) this[k] = v
    })
  }

  id: number = -1
  items: string[] = []
  parent: string = ''
  sort: string = ''
  title: string = ''
}