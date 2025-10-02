import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './models/user.model';
import { ApiLog } from '../apilogs/models/apilogs.model';
import { UsersController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User, ApiLog])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
