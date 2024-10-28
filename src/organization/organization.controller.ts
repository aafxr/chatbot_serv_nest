import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { IRequest } from '../@types/IRequest';
import { AppResponse } from '../classes/AppResponse';
import { Organization } from './organization.entity';

@Controller('org')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}


  /**
   * апи для получения списка организация пользователя
   * @param req
   */
  @Get('all')
  async getAll(@Req() req: IRequest) {
    try {
      const id = req.userId;
      const res = await this.organizationService.getAll(id);
      if (res) return new AppResponse(true, res);
      return new AppResponse(false, undefined, 'not found');
    } catch (e) {
      return new AppResponse(false, undefined, 'not found\n' + e.message);
    }
  }


  /**
   * апи для получения организации по ид
   * @param id
   * @param req
   */
  @Get(':orgId')
  async getById(@Body('orgId') id: string, @Req() req: IRequest) {
    try {
      const userId = req.userId;
      const o = await this.organizationService.getBtId(+id);
      if (!o) return new AppResponse(false, undefined, 'not found');
      if (o.userId == req.userId || req.isAdmin || req.isManager)
        return new AppResponse(true, o);
      return new AppResponse(false, undefined, 'permission denied');
    } catch (e) {
      return new AppResponse(false, undefined, 'something wrong\n' + e.message);
    }
  }


  /**
   * апи для создания организации
   * @param org
   */
  @Post('new')
  async create(@Body() org: Organization) {
    try {
      const res = await this.organizationService.create(org);
      if (res) return new AppResponse(true, res);
      return new AppResponse(false, undefined, 'something wrong');
    } catch (e) {
      return new AppResponse(false, undefined, 'something wrong\n' + e.message);
    }
  }


  /**
   * апи для обновления организации
   * @param org
   * @param req
   */
  @Post('update')
  async update(@Body() org: Organization, @Req() req: IRequest) {
    try {
      if (org.userId !== req.userId || !req.isAdmin || !req.isManager) return new AppResponse(false, undefined, 'permission denied');
      const res = await this.organizationService.update(org);
      if (res) return new AppResponse(true, res);
      return new AppResponse(false, undefined, 'something wrong');
    } catch (e) {
      return new AppResponse(false, undefined, 'something wrong\n' + e.message);
    }
  }


  /**
   * апи для удаления организации путем добавления поля deletedAt
   * @param org
   * @param req
   */
  @Post('rm')
  async delete(@Body() org: Organization, @Req() req: IRequest){
    try {
      if (org.userId !== req.userId || !req.isAdmin || !req.isManager) return new AppResponse(false, undefined, 'permission denied');
      const res = await this.organizationService.delete(org);
      if (res) return new AppResponse(true, res);
      return new AppResponse(false, undefined, 'something wrong');
    } catch (e) {
      return new AppResponse(false, undefined, 'something wrong\n' + e.message);
    }
  }
}
