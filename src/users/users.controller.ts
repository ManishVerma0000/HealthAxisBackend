import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/auth/auth.decorator';
import { PermissionsGuard } from 'src/auth/auth.guards';


@Controller('users')
@UseGuards(PermissionsGuard)
export class UsersController {
  @Get()
  @Permissions('users.read')

  findAll() {
    return 'List of users';
  }

  @Post()
  @Permissions('users.create')
  create() {
    return 'User created';
  }
}
