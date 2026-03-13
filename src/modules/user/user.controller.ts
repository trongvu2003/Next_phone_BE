import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    // console.log('UserController constructor');
  }
  @Get()
  index(@Query() query: any) {
    // return this.userService.getUser();
    // return {
    //   keyword: query.keyword,
    //   category: query.category,
    // };
    return this.userService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get('login')
  login() {
    return this.authService.login();
  }
  //   @Get('connectDB')
  //   connectDB() {
  //     return this.userService.connectDB();
  //   }
  @Post()
  create(@Body() body: any) {
    return this.userService.create(body);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }
}
