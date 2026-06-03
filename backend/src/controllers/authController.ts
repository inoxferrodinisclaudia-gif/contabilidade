import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/prismaClient';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e palavra-passe são obrigatórios.' });
    }

    // Fallback for local development when DATABASE_URL is not configured.
    // Allows quick login with the seeded admin credentials without a DB.
    if (!process.env.DATABASE_URL) {
      const fallbackEmail = 'inoxferrodinisclaudia@gmail.com';
      const fallbackPassword = 'admin123';
      if (email.toLowerCase().trim() === fallbackEmail && password === fallbackPassword) {
        const fakeUser = {
          id: '00000000-0000-0000-0000-000000000000',
          email: fallbackEmail,
          name: 'Administrador Inox Ferro',
          role: 'ADMIN',
        };

        const token = jwt.sign({ sub: fakeUser.id, email: fakeUser.email, role: fakeUser.role }, JWT_SECRET, {
          expiresIn: '8h',
        });

        return res.status(200).json({ token, user: fakeUser });
      }
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: '8h',
      },
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
