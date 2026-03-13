import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  //   constructor(private readonly dbService: DbService) {
  //     console.log('UserService constructor');
  //   }

  //   connectDB() {
  //     return this.dbService.connectDB();
  //   }
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
  create(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: number, userData: Partial<User>) {
    userData.updatedAt = new Date();
    await this.userRepository.update(id, userData);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    await this.userRepository.delete(id);
    return user;
  }
}
