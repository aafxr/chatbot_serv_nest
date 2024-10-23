
export class Article{
  constructor(p:Partial<Article> = {}){
    Object.entries(p).forEach(([k,v]) => {
      if(k in this) this[k] = v
    })
  }

  id: string = '-1'

  name:string = ''
}