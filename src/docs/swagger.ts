export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'TMDb REST API',
    version: '1.0.0',
    description: 'A production-grade REST API proxy for The Movie Database (TMDb)',
  },
  servers: [{ url: '/api', description: 'API server' }],
  paths: {
    '/movies': {
      get: {
        tags: ['Movies'],
        summary: 'List or search movies',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'language', in: 'query', schema: { type: 'string', default: 'en-US' } },
          { name: 'query', in: 'query', schema: { type: 'string' }, description: 'Search query (uses search endpoint instead of discover)' },
          { name: 'genre', in: 'query', schema: { type: 'string' }, description: 'Genre ID for filtering' },
          { name: 'region', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'List of movies', content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedMovies' } } } },
          '400': { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/movies/{id}': {
      get: {
        tags: ['Movies'],
        summary: 'Get movie details',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', pattern: '^\\d+$' } }],
        responses: {
          '200': { description: 'Movie details' },
          '404': { description: 'Movie not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/tv': {
      get: {
        tags: ['TV Shows'],
        summary: 'List or search TV shows',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'language', in: 'query', schema: { type: 'string', default: 'en-US' } },
          { name: 'query', in: 'query', schema: { type: 'string' } },
          { name: 'genre', in: 'query', schema: { type: 'string' } },
          { name: 'region', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'List of TV shows' },
          '400': { description: 'Validation error' },
        },
      },
    },
    '/tv/{id}': {
      get: {
        tags: ['TV Shows'],
        summary: 'Get TV show details',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', pattern: '^\\d+$' } }],
        responses: {
          '200': { description: 'TV show details' },
          '404': { description: 'TV show not found' },
        },
      },
    },
    '/people': {
      get: {
        tags: ['People'],
        summary: 'Search people',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'language', in: 'query', schema: { type: 'string', default: 'en-US' } },
          { name: 'query', in: 'query', schema: { type: 'string' } },
          { name: 'include_adult', in: 'query', schema: { type: 'boolean', default: false } },
        ],
        responses: {
          '200': { description: 'List of people' },
          '400': { description: 'Validation error' },
        },
      },
    },
    '/people/{id}': {
      get: {
        tags: ['People'],
        summary: 'Get person details',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', pattern: '^\\d+$' } }],
        responses: {
          '200': { description: 'Person details' },
          '404': { description: 'Person not found' },
        },
      },
    },
    '/trending/{type}': {
      get: {
        tags: ['Trending'],
        summary: 'Get trending content',
        parameters: [
          { name: 'type', in: 'path', required: true, schema: { type: 'string', enum: ['movie', 'tv', 'person'] } },
          { name: 'time_window', in: 'query', schema: { type: 'string', enum: ['day', 'week'], default: 'day' } },
        ],
        responses: {
          '200': { description: 'Trending content' },
          '400': { description: 'Validation error' },
        },
      },
    },
  },
  components: {
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              status: { type: 'integer' },
              message: { type: 'string' },
              code: { type: 'string' },
            },
          },
        },
      },
      PaginatedMovies: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { type: 'array', items: { type: 'object' } },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              totalPages: { type: 'integer' },
              totalResults: { type: 'integer' },
            },
          },
        },
      },
    },
  },
};
