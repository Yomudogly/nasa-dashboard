import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { NASAService } from '../services/nasa';
import { redisService } from '../services/redis';
import { QueryParams } from '../types';

const queryParamsSchema = {
  type: 'object',
  properties: {
    start: {
      type: 'string',
      format: 'date',
      description: 'Start date in YYYY-MM-DD format',
    },
    end: {
      type: 'string',
      format: 'date',
      description: 'End date in YYYY-MM-DD format',
    },
    sort: {
      type: 'string',
      enum: ['size', 'closeness', 'velocity'],
      default: 'closeness',
      description: 'Field to sort the results by',
    },
  },
  required: ['start', 'end'],
};

const responseSchema = {
  200: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        size: { type: 'number' },
        close_approach: { type: 'number' },
        velocity: { type: 'number' },
        is_potentially_hazardous: { type: 'boolean' },
      },
    },
  },
  400: {
    type: 'object',
    properties: {
      statusCode: { type: 'number' },
      error: { type: 'string' },
      message: { type: 'string' },
    },
  },
  500: {
    type: 'object',
    properties: {
      statusCode: { type: 'number' },
      error: { type: 'string' },
      message: { type: 'string' },
    },
  },
};

export async function objectsRoutes(fastify: FastifyInstance) {
  const nasaService = new NASAService();

  fastify.get(
    '/objects',
    {
      schema: {
        querystring: queryParamsSchema,
        response: responseSchema,
        tags: ['Near-Earth Objects'],
        summary: 'Get Near-Earth Objects',
        description: 'Fetches a list of near-Earth objects for a given date range, with optional sorting.',
      },
    },
    async (request: FastifyRequest<{ Querystring: QueryParams }>, reply: FastifyReply) => {
      try {
        const { start, end, sort = 'closeness' } = request.query;

        // Validate date format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(start) || !dateRegex.test(end)) {
          return reply.status(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Invalid date format. Use YYYY-MM-DD format.',
          });
        }

        // Validate date range
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          return reply.status(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Invalid date values.',
          });
        }

        if (startDate > endDate) {
          return reply.status(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Start date must be before or equal to end date.',
          });
        }

        // Check cache first
        const cacheKey = redisService.generateCacheKey(start, end, sort);
        const cachedData = await redisService.get(cacheKey);

        if (cachedData) {
          fastify.log.info(`Cache hit for key: ${cacheKey}`);
          return reply.send(JSON.parse(cachedData));
        }

        fastify.log.info(`Cache miss for key: ${cacheKey}. Fetching from NASA API...`);

        // Fetch from NASA API
        const nasaResponse = await nasaService.fetchNearEarthObjects(start, end);
        
        // Transform the data
        const transformedObjects = nasaService.transformNASAData(nasaResponse);
        
        // Sort the data
        const sortedObjects = nasaService.sortObjects(transformedObjects, sort);

        // Cache the result
        await redisService.set(cacheKey, JSON.stringify(sortedObjects));

        fastify.log.info(`Successfully fetched and cached ${sortedObjects.length} objects`);

        return reply.send(sortedObjects);
      } catch (error) {
        fastify.log.error({ error }, 'Error in /objects endpoint');
        
        if (error instanceof Error) {
          if (error.message.includes('NASA API')) {
            return reply.status(500).send({
              statusCode: 500,
              error: 'Internal Server Error',
              message: error.message,
            });
          }
        }

        return reply.status(500).send({
          statusCode: 500,
          error: 'Internal Server Error',
          message: 'An unexpected error occurred while fetching data.',
        });
      }
    }
  );
}
