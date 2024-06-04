import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserRole } from 'src/common/enums';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  privacySettingsId: number;

  @ApiProperty()
  address: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty()
  email: string;

  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
