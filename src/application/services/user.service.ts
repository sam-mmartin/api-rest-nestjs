import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepo.find();
    return users;
  }

  async save(user: UserEntity) {
    await this.userRepo.save(user);
  }
}
