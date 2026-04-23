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
import { mockPeopleListResponse, mockPersonDetails } from '../helpers/setup';

const mockGet = vi.mocked(tmdbClient.get);

describe('People API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/people', () => {
    it('should return paginated people list', async () => {
      mockGet.mockResolvedValueOnce({ data: mockPeopleListResponse });

      const res = await request(app).get('/api/people?query=Brad+Pitt&page=1');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.pagination.page).toBe(1);
    });

    it('should return 400 for invalid page', async () => {
      const res = await request(app).get('/api/people?page=0');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/people/:id', () => {
    it('should return person details', async () => {
      mockGet.mockResolvedValueOnce({ data: mockPersonDetails });

      const res = await request(app).get('/api/people/287');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(287);
    });

    it('should return 400 for non-numeric ID', async () => {
      const res = await request(app).get('/api/people/abc');

      expect(res.status).toBe(400);
    });

    it('should not contain API key in response', async () => {
      mockGet.mockResolvedValueOnce({ data: mockPersonDetails });

      const res = await request(app).get('/api/people/287');

      expect(JSON.stringify(res.body)).not.toContain('test_access_token_12345');
    });
  });
});
