import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { rateLimiter } from './middleware/rateLimiter';
import { requestLogger } from './middleware/requestLogger';
import { swaggerDocument } from './docs/swagger';

const app = express();

// Security & parsing
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());

// Logging & rate limiting
app.use(requestLogger);
app.use(rateLimiter);

// Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api', apiRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
