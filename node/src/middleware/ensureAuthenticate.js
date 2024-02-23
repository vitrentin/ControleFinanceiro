import { verify } from 'jsonwebtoken';

import AppError from '../shared/errors/AppError';

const ensureAuthenticated = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }


  const secret = process.env.JWT_SECRET;
  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, secret);

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
};

export default ensureAuthenticated;
