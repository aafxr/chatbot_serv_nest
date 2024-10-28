import { DataSource } from 'typeorm';
import { Order } from '../order/order.entity';

export const organizationProviders = [
  {
    provide: 'ORGANIZATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: ['DATA_SOURCE'],
  },
];