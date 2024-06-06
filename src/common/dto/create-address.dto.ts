import { IsInt, IsString, IsOptional, IsArray } from 'class-validator';
import { Address, ApplicationRequest, Client, User } from '@prisma/client';

export class CreateClientDto implements Address {
  @IsInt()
  id: number;

  @IsString()
  address: string;

  @IsOptional()
  @IsArray()
  User: User[];

  @IsOptional()
  @IsArray()
  Client: Client[];

  @IsOptional()
  @IsArray()
  ApplicationRequest: ApplicationRequest[];
}
