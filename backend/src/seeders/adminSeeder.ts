import bcrypt from 'bcrypt';
import { prisma } from '../database/prismaClient';

export const seedAdminUser = async () => {
  const adminEmail = 'inoxferrodinisclaudia@gmail.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (existingAdmin) {
    return;
  }

  const passwordHash = await bcrypt.hash('admin123', 12);

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: passwordHash,
      name: 'Administrador Inox Ferro',
      role: 'ADMIN',
    },
  });
};
