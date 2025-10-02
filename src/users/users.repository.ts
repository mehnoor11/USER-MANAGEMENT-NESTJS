import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(userData: CreationAttributes<User>): Promise<User> {
    return this.userModel.create(userData);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ attributes: { exclude: ['password'] } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id, { attributes: { exclude: ['password'] } });
  }

  async update(user: User, updates: Partial<User>): Promise<User> {
    return user.update(updates);
  }

  async softDelete(user: User): Promise<User> {
    user.isActive = false;
    user.deletedAt = new Date();
    return user.save();
  }
}
