// role.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  name: string; // e.g. 'admin', 'editor', 'viewer'

  @Prop({ type: [String], default: [] })
  permissions: string[]; 
  // e.g. ['dashboard.read', 'users.create', 'users.update', 'orders.delete']
}

export const RoleSchema = SchemaFactory.createForClass(Role);
    