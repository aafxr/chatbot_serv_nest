import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { organizationProviders } from './organization.providers';

@Module({
  controllers: [OrganizationController],
  providers: [...organizationProviders, OrganizationService],
  exports: [...organizationProviders, OrganizationService]
})
export class OrganizationModule {}
