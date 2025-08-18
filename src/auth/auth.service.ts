import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schema/role.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  // Create Role
  async createRole(name: string, permissions: string[]): Promise<Role> {
    const role = new this.roleModel({ name, permissions });
    return role.save();
  }

  // Get All Roles
  async getRoles(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  // Get Role by ID
  async getRoleById(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) throw new NotFoundException(`Role with id ${id} not found`);
    return role;
  }

  // Update Role
  async updateRole(
    id: string,
    updateData: Partial<Role>,
  ): Promise<Role> {
    const updated = await this.roleModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Role with id ${id} not found`);
    return updated;
  }

  // Delete Role
  async deleteRole(id: string): Promise<{ deleted: boolean }> {
    const result = await this.roleModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Role with id ${id} not found`);
    return { deleted: true };
  }
}
