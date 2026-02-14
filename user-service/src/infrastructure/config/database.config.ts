import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri:
    process.env.MONGODB_URI ||
    'mongodb://admin:admin123@localhost:27018/users_db?authSource=admin',
}));
