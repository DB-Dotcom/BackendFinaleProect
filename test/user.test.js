import test from 'ava';
import request from 'supertest';
import app from '../app.js'; // Pfad zu Ihrer Express-App anpassen

let token; // Für die Verwendung in mehreren Tests speichern
let userId; // Benutzer-ID speichern für die Verwendung in Tests

// Benutzerregistrierung
test.serial('Benutzerregistrierung', async t => {
  const response = await request(app)
    .post('/api/users/register')
    .send({
      email: 'test@example.com',
      password: 'testPassword',
      superPassword: 'testSuperPassword'
    });

  t.is(response.status, 201); // Erwartet, dass der Statuscode 201 ist
  t.regex(response.body.message, /erfolgreich registriert/);
});

// Benutzerlogin
test.serial('Benutzerlogin', async t => {
  const response = await request(app)
    .post('/api/users/login')
    .send({
      email: 'test@example.com',
      password: 'testPassword'
    });

  t.is(response.status, 200); // Erwartet, dass der Statuscode 200 ist
  t.truthy(response.body.token); // Stellt sicher, dass ein Token zurückgegeben wurde

  token = response.body.token; // Speichert das Token für nachfolgende Anfragen
  userId = response.body.userId; // Speichert die Benutzer-ID für nachfolgende Anfragen
});

/* // Benutzerdaten anzeigen
test.serial('Benutzerdaten anzeigen', async t => {
  const response = await request(app)
    .get(`/api/users/${userId}`)
    .set('Authorization', `Bearer ${token}`);

  t.is(response.status, 200); // Erwartet, dass der Statuscode 200 ist
  t.is(response.body.email, 'test@example.com');
});

// Benutzerdaten aktualisieren
test.serial('Benutzerdaten aktualisieren', async t => {
  const response = await request(app)
    .put(`/api/users/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      email: 'updated@example.com',
      password: 'newPassword',
      superPassword: 'testSuperPassword'
    });

  t.is(response.status, 200); // Erwartet, dass der Statuscode 200 ist
  t.regex(response.body.message, /erfolgreich aktualisiert/);
});

// Benutzer löschen
test.serial('Benutzer löschen', async t => {
  const response = await request(app)
    .delete(`/api/users/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ superPassword: 'testSuperPassword' });

  t.is(response.status, 200); // Erwartet, dass der Statuscode 200 ist
  t.regex(response.body.message, /erfolgreich gelöscht/);
});
 */