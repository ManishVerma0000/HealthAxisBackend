// users.controller.ts
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/auth/auth.decorator';
import { PermissionsGuard } from 'src/auth/auth.guards';
import { UsersService } from './users.service';
import { Types } from 'mongoose';

@Controller('users')
@UseGuards(PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Permissions('users.read')
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @Permissions('users.create')
  async create(
    @Body()
    createUserDto: {
      username: string;
      email: string;
      password: string;
      roles?: string[]; // role IDs
    },
  ) {
    return this.usersService.create({
      ...createUserDto,
      roles: createUserDto.roles?.map((r) => new Types.ObjectId(r)),
    });
  }
}
