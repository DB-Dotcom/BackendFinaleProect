// Importieren der benötigten Module
import test from 'ava';
import request from 'supertest';
import app from '../app.js'; 

let token;
let userId;
let carId;

test.before(async t => {
  const registerResponse = await request(app)
    .post('/api/users/register')
    .send({
      email: 'test@example.com',
      password: 'password123',
      superPassword: 'superPassword123'
    });
  userId = registerResponse.body.userId;

  const loginResponse = await request(app)
    .post('/api/users/login')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });
  token = loginResponse.body.token;
});

test.serial('Benutzer registrieren', async t => {
  const response = await request(app)
    .post('/api/users/register')
    .send({
      email: 'test2@example.com',
      password: 'password123',
      superPassword: 'superPassword123'
    });
  t.is(response.status, 201);
});

test.serial('Benutzer anmelden', async t => {
  const response = await request(app)
    .post('/api/users/login')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });
  t.is(response.status, 200);
  t.truthy(response.body.token);
});

test.serial('Fahrzeug registrieren', async t => {
  const response = await request(app)
    .post('/api/cars/')
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId,
      kennzeichen: "B-XY123",
      marke: "Volkswagen",
      modell: "Golf",
      baujahr: 2017,
      kraftstoff: "Diesel",
      schadstoffklasse: "Euro 6",
      leistungKW: 110,
      leistungPS: 150,
      kilometerstand: 85000,
      nächsteTüvUntersuchung: "2023-10-30"
    });
  t.is(response.status, 201);
  carId = response.body.carId;
});

// Fügen Sie hier weitere Tests hinzu, z.B. für Kilometerstand hinzufügen, TÜV-Eintrag hinzufügen, etc.

test('cleanup: Lösche Testdaten', async t => {
    await request(app)
      .delete(`/api/users/delete-user`)
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'test@example.com', superPassword: 'superPassword123' });
  
    t.pass(); // Markiert diesen Test als bestanden, da das Ziel ist, Aufräumaktionen durchzuführen
  });