import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import './../../tests/helpers/setup';

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
import { mockTrendingResponse } from '../helpers/setup';

const mockGet = vi.mocked(tmdbClient.get);

describe('Trending API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/trending/:type', () => {
    it('should return trending movies', async () => {
      mockGet.mockResolvedValueOnce({ data: mockTrendingResponse });

      const res = await request(app).get('/api/trending/movie?time_window=day');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.pagination.page).toBe(1);
    });

    it('should return trending tv shows', async () => {
      mockGet.mockResolvedValueOnce({ data: mockTrendingResponse });

      const res = await request(app).get('/api/trending/tv?time_window=week');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should return 400 for invalid type', async () => {
      const res = await request(app).get('/api/trending/invalid');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should default time_window to day', async () => {
      mockGet.mockResolvedValueOnce({ data: mockTrendingResponse });

      await request(app).get('/api/trending/movie');

      expect(mockGet).toHaveBeenCalledWith('/trending/movie/day');
    });

    it('should not contain API key in response', async () => {
      mockGet.mockResolvedValueOnce({ data: mockTrendingResponse });

      const res = await request(app).get('/api/trending/person');

      expect(JSON.stringify(res.body)).not.toContain('test_access_token_12345');
    });
  });
});
