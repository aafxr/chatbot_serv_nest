import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('ORGANIZATION__REPOSITORY')
    private readonly organizationRepository: Repository<Organization>
  ) {}


}
