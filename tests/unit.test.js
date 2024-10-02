const { app, startServer, closeServer } = require('../server');
const request = require('supertest');

describe('Unit Tests for Ticket Management', () => {
  beforeAll(() => {
    startServer(); // Start the server before tests
  });

  afterAll(() => {
    closeServer(); // Stop the server after tests
  });

  test('Basic unit test to check server status', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
