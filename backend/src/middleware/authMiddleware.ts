import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret';

// Authenticate request using Bearer token
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Extract authorization header
  const authHeader = req.headers.authorization;

  // Validate presence and format of token
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  // Extract raw token
  const token = authHeader.split(' ')[1];

  try {
    // Verify token and attach decoded payload
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
