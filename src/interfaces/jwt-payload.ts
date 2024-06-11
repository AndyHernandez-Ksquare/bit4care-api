import { UserRole } from 'src/common/enums';

export interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}
