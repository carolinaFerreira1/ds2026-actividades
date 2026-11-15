import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app';
import prisma from '../config/prisma';

describe('Auth Routes - Base de Datos (Integración)', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('debe rechazar el inicio de sesión con credenciales inexistentes', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'correo_falso@test.com',
        password: 'password123',
      });

    expect(response.status).toBe(401);
  });
});