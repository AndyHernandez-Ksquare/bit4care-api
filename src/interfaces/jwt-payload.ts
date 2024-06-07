import { UserRole } from '@prisma/client';

export interface JwtPayload {
  id: number;
  email: string;
  roles: UserRole;
  iat: number;
  exp: number;
}
