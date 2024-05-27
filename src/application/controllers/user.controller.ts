import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from 'src/domain/user.entity';
import { UserRequestDto } from 'src/application/dtos/user-request.dto';
import { UserService } from 'src/application/services/user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUser() {
    const users = await this.userService.getAll();

    if (users.length == 0) {
      return {};
    }

    return users;
  }

  @Post()
  async save(@Body() newUser: UserRequestDto) {
    const user = new UserEntity();
    user.name = newUser.name;
    user.username = newUser.username;
    user.password = newUser.password;

    await this.userService.save(user);
    return 'usuario criado';
  }
}
