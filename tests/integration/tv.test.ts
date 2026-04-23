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
import { mockTvListResponse, mockTvDetails } from '../helpers/setup';

const mockGet = vi.mocked(tmdbClient.get);

describe('TV Shows API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/tv', () => {
    it('should return paginated TV show list', async () => {
      mockGet.mockResolvedValueOnce({ data: mockTvListResponse });

      const res = await request(app).get('/api/tv?page=1&language=en-US');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.pagination.page).toBe(1);
    });

    it('should use search endpoint when query provided', async () => {
      mockGet.mockResolvedValueOnce({ data: mockTvListResponse });

      await request(app).get('/api/tv?query=breaking+bad');

      expect(mockGet).toHaveBeenCalledWith('/search/tv', expect.objectContaining({
        params: expect.objectContaining({ query: 'breaking bad' }),
      }));
    });

    it('should return 400 for invalid page', async () => {
      const res = await request(app).get('/api/tv?page=-1');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/tv/:id', () => {
    it('should return TV show details', async () => {
      mockGet.mockResolvedValueOnce({ data: mockTvDetails });

      const res = await request(app).get('/api/tv/1399');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(1399);
    });

    it('should return 400 for non-numeric ID', async () => {
      const res = await request(app).get('/api/tv/abc');

      expect(res.status).toBe(400);
    });
  });
});
