import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { Section } from './entities/section.entity';
import { Article } from './entities/article.entity';
import { ProductDetail } from './entities/productDetail.entity';



function loadData(){
  const appDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT) ?? 3306,
    username: process.env.DB_USER_NAME ?? 'root',
    password: process.env.DB_PASS ?? 'root',
    database: process.env.DB_NAME ?? 'test',
    entities: [
      __dirname + './**/*.entity{.js}',
    ],
    synchronize: true,
  })

  return appDataSource.initialize()
    .then(async () => {
      let {articles, elements, sections} = await fetch('https://refloor-opt.ru/api/telegram/').then(r => r.json())

      articles = Object.entries(articles).map(([k,v]) => {
        const a = new Article()
        a.id = v as string
        a.name = k
        return a
      })

      elements = Object.values(elements).map(p => new Product(p))
      sections = sections.map(s => new Section(s))

      for(const article of articles) await appDataSource.manager.save(article).catch(e => console.error(e.message))
      for(const section of sections) await appDataSource.manager.save(section).catch(e => console.error(e.message))

      const detailsUrl = 'https://refloor-bot.ru/api/getDetail?'
      for(const p of elements) {
        await appDataSource.manager.save(p).catch(e => console.error(e.message))
        const sp = new URLSearchParams()
        sp.set('code', p.apiCode)
        const res = await fetch(detailsUrl + sp.toString()).then(r => r.json()).catch(e => console.error(e.message))
        if(res) await appDataSource.manager.save(new ProductDetail(res.product)).catch(e => console.error(e.message))
      }
    })
}

loadData()
  .then(() => {
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      app.setGlobalPrefix('api')
      await app.listen(process.env.PORT ?? 3000, () => console.log('listen on port ', process.env.PORT ?? 3000));
    }
    bootstrap();
  })




