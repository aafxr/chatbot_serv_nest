import { Injectable } from '@nestjs/common';
import { Product, Article, Section, ProductDetail } from '../entities';

@Injectable()
export class ProductService {
  private readonly detailsUrl = 'https://refloor-bot.ru/api/getDetail?';

  private articles: Map<Article['id'], Article>
  private products: Map<Product['id'], Product>
  private sections: Map<Section['id'], Section>
  private details: Map<Product['id'], ProductDetail>

  constructor() {
    this.articles = new Map()
    this.products = new Map()
    this.sections = new Map()
    this.details = new Map()

    this.all = this.all.bind(this)
    this.getProducts = this.getProducts.bind(this)
    this.getProductById = this.getProductById.bind(this)
    this.getArticles = this.getArticles.bind(this)
    this.getSections = this.getSections.bind(this)
    this.getDetails = this.getDetails.bind(this)
  }

  async all(): Promise<{
    articles: Article[];
    products: Product[];
    sections: Section[];
  }> {
    try {
      let { articles, elements, sections } = await fetch('https://refloor-opt.ru/api/telegram/',)
        .then((r) => r.json());

      articles = Object.entries<string>(articles).map(([k, v]) => new Article({ id: v, name: k }))
      elements = Object.values(elements).map((p) => new Product(p))
      sections = sections.map((s) => new Section(s))

      if (this.products.size == 0) elements.forEach((el) => this.products.set(el.id, el));
      if (this.articles.size == 0) articles.forEach((el) => this.articles.set(el.id, el));
      if (this.sections.size == 0) sections.forEach((el) => this.sections.set(el.id, el));

      return { articles, products: elements, sections };
    } catch (e) {
      return {
        articles: Array.from(this.articles.values()),
        products: Array.from(this.products.values()),
        sections: Array.from(this.sections.values()),
      };
    }
  }


  async getProducts() {
    if (this.products.size) return Array.from(this.products.values());
    return (await this.all()).products;
  }


  async getProductById(id: Product['id']) {
    if (this.products.size) return this.products.get(id);
    await this.all().catch(e => {})
    return this.products.get(id)
  }


  async getArticles() {
    if (this.articles.size) return this.articles.size// Array.from(this.articles.values());
    return (await this.all()).articles;
  }


  async getSections() {
    if (this.sections.size) return Array.from(this.sections.values());
    return (await this.all()).sections;
  }


  async getDetails(id: Product['id']) {
    try {
      let code = this.products.get(id)?.apiCode;
      if (!code) {
        await this.all();
        code = this.products.get(id)?.apiCode;
      }

      if (code) {
        const sp = new URLSearchParams();
        sp.set('code', code);
        const res = await fetch(this.detailsUrl + sp.toString()).then((r) =>
          r.json(),
        );
        if (res) {
          this.details.set(id, new ProductDetail(res.product));
        }
      }
    } catch (e) {}
    return this.details.get(id);
  }


  clear(){
    this.articles.clear()
    this.products.clear()
    this.sections.clear()
    this.details.clear()
  }
}
