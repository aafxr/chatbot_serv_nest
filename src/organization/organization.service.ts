import { Inject, Injectable } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from '../user/user.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('ORGANIZATION__REPOSITORY')
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async create(org: Organization){
    return this.organizationRepository.save(org)
  }

  async getBtId(id: Organization['id']) {
    return this.organizationRepository.findOneBy({id})
  }
  
  async getAll(userId: User['id']){
    return this.organizationRepository.find({ where: {userId, deletedAt: IsNull()} });
  }

  async delete(org: Organization){
    const o = new Organization(org)
    o.deletedAt = new Date()
    return this.organizationRepository.save(o)
  }
}
