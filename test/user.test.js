// Importieren der benötigten Module
import request from 'supertest';
import app from './app';

describe('GET /', () => {
  it('sollte den Statuscode 200 und eine Willkommensnachricht zurückgeben', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Willkommen');
  });
});
