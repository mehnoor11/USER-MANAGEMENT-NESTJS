import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(dto: CreateUserDto) {
    const existing = await this.usersRepo.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.usersRepo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashed,
    } as any);

    const { password, ...result } = user.get({ plain: true }) as any;
    return result;
  }

  async findAll() {
    return this.usersRepo.findAll();
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.usersRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, SALT_ROUNDS);
    }

    const updated = await this.usersRepo.update(user, dto);
    const { password, ...result } = updated.get({ plain: true }) as any;
    return result;
  }

  async remove(id: number) {
    const user = await this.usersRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.usersRepo.softDelete(user);
    return { success: true, message: 'User soft deleted' };
  }
}
