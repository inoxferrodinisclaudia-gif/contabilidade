import dotenv from 'dotenv';
import path from 'path';

export const loadEnv = () => {
  const envFile = path.resolve(process.cwd(), '.env');
  dotenv.config({ path: envFile });
};
