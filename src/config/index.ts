require('dotenv').config();

export const config: any = {
  db: {
    url: process.env.DATABASE_URL,
  },
};
