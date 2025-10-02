import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApiLog } from './models/apilogs.model';

@Module({
  imports: [SequelizeModule.forFeature([ApiLog])],
  exports: [SequelizeModule]
})
export class ApiLogsModule {}


