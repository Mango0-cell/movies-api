import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import './../../tests/helpers/setup';

// Mock tmdb.service before app import
vi.mock('../../src/services/tmdb.service', () => {
  const mockGet = vi.fn();
  return {
    tmdbClient: {
      get: mockGet,
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    },
  };
});

import app from '../../src/app';
import { tmdbClient } from '../../src/services/tmdb.service';
import { mockMovieListResponse, mockMovieDetails } from '../helpers/setup';

const mockGet = vi.mocked(tmdbClient.get);

describe('Movies API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/movies', () => {
    it('should return paginated movie list', async () => {
      mockGet.mockResolvedValueOnce({ data: mockMovieListResponse });

      const res = await request(app).get('/api/movies?page=1&language=en-US');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.pagination).toHaveProperty('page');
      expect(res.body.pagination).toHaveProperty('totalPages');
      expect(res.body.pagination).toHaveProperty('totalResults');
    });

    it('should use search endpoint when query is provided', async () => {
      mockGet.mockResolvedValueOnce({ data: mockMovieListResponse });

      await request(app).get('/api/movies?query=fight+club');

      expect(mockGet).toHaveBeenCalledWith(
        '/search/movie',
        expect.objectContaining({
          params: expect.objectContaining({ query: 'fight club' }),
        }),
      );
    });

    it('should use discover endpoint when no query', async () => {
      mockGet.mockResolvedValueOnce({ data: mockMovieListResponse });

      await request(app).get('/api/movies?page=1');

      expect(mockGet).toHaveBeenCalledWith('/discover/movie', expect.anything());
    });

    it('should return 400 for invalid page', async () => {
      const res = await request(app).get('/api/movies?page=0');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should not contain API key in response', async () => {
      mockGet.mockResolvedValueOnce({ data: mockMovieListResponse });

      const res = await request(app).get('/api/movies');
      const body = JSON.stringify(res.body);

      expect(body).not.toContain('test_access_token_12345');
    });
  });

  describe('GET /api/movies/:id', () => {
    it('should return movie details', async () => {
      mockGet.mockResolvedValueOnce({ data: mockMovieDetails });

      const res = await request(app).get('/api/movies/550');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(550);
      expect(res.body.pagination).toBeUndefined();
    });

    it('should return 400 for non-numeric ID', async () => {
      const res = await request(app).get('/api/movies/abc');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should not contain API key in detail response', async () => {
      mockGet.mockResolvedValueOnce({ data: mockMovieDetails });

      const res = await request(app).get('/api/movies/550');
      const body = JSON.stringify(res.body);

      expect(body).not.toContain('test_access_token_12345');
    });
  });
});
