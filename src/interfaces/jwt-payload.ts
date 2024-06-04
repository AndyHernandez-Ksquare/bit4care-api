import { UserRole } from '@prisma/client';

export interface JwtPayload {
  sub: number;
  username: string;
  roles: UserRole;
  iat: number;
  exp: number;
}
