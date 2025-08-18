import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from './schema/role.schema';

@Controller('roles')
export class AuthController {
  constructor(private readonly roleService: AuthService) {}

  // Create a role
  @Post()
  async create(
    @Body('name') name: string,
    @Body('permissions') permissions: string[],
  ): Promise<Role> {
    return this.roleService.createRole(name, permissions);
  }

  // Get all roles
  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.getRoles();
  }

  // Get a role by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.getRoleById(id);
  }

  // Update role
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<Role>,
  ): Promise<Role> {
    return this.roleService.updateRole(id, body);
  }

  // Delete role
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.roleService.deleteRole(id);
  }
}
