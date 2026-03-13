import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
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
}
