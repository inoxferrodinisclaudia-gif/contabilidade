import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { seedAdminUser } from './seeders/adminSeeder';
import { errorHandler } from './middleware/errorHandler';
import { loadEnv } from './config/env';

loadEnv();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.APP_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use('/api', routes);

seedAdminUser().catch((error) => {
  console.error('Erro ao criar utilizador admin inicial:', error);
});

app.use(errorHandler);

const port = Number(process.env.PORT || 4000);
const server = app.listen(port, () => {
  console.log(`Backend inicializado em http://localhost:${port}`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the existing server or set a different PORT.`);
    process.exit(1);
  }
  throw error;
});
