import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import AppError from './shared/errors/AppError';
import { routes } from './routes';
import { errors } from 'celebrate';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err, request, response, _) => {
  console.error(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
