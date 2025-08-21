import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { redisService } from './services/redis';
import { objectsRoutes } from './routes/objects';

const server = Fastify({
  logger: process.env.NODE_ENV === 'development' ? {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  } : {
    level: process.env.LOG_LEVEL || 'info',
  },
});

// Register CORS
server.register(cors, {
  origin: process.env.FRONTEND_URL || true, // Allow all origins in development
  credentials: true,
});

// Register Swagger for API documentation
server.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'NASA Dashboard API',
      description: 'API for fetching near-Earth object data from NASA',
      version: '1.0.0',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1',
      },
    ],
    tags: [
      {
        name: 'Near-Earth Objects',
        description: 'Operations related to near-Earth objects',
      },
    ],
  },
});

// Register Swagger UI
server.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

// Health check endpoint
server.get('/health', async (request, reply) => {
//   const isRedisReady = redisService.isReady();
  
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    // redis: isRedisReady ? 'connected' : 'disconnected',
  };
});

// Register API routes under /api/v1 prefix
server.register(async function (fastify) {
  await fastify.register(objectsRoutes);
}, { prefix: '/api/v1' });

// Global error handler
server.setErrorHandler(async (error, request, reply) => {
  server.log.error({ error, request: request.url }, 'Unhandled error');
  
  if (error.validation) {
    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Invalid request parameters',
      details: error.validation,
    });
  }

  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  });
});

// Graceful shutdown handler
async function gracefulShutdown(signal: string) {
  server.log.info(`Received ${signal}, shutting down gracefully...`);
  
  try {
    // await redisService.disconnect();
    await server.close();
    server.log.info('Server shut down successfully');
    process.exit(0);
  } catch (error) {
    server.log.error({ error }, 'Error during shutdown');
    process.exit(1);
  }
}

// Register shutdown handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
async function start() {
  try {
    // Connect to Redis
    // await redisService.connect();
    
    // Start the server
    const port = parseInt(process.env.PORT || '3001', 10);
    const host = process.env.HOST || '0.0.0.0';
    
    await server.listen({ port, host });
    
    server.log.info(`Server is running at http://${host}:${port}`);
    server.log.info(`API documentation available at http://${host}:${port}/docs`);
  } catch (error) {
    server.log.error({ error }, 'Failed to start server');
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  server.log.error({ reason, promise }, 'Unhandled promise rejection');
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  server.log.error({ error }, 'Uncaught exception');
  process.exit(1);
});

if (require.main === module) {
  start();
}

export { server };
