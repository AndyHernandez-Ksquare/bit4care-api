import 'express-session';

declare global {
  namespace Express {
    interface Request {
      where?: Record<string, any>;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    state: string;
  }
}
