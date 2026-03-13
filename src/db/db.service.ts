import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  connectDB() {
    return 'connectDB';
  }
}
