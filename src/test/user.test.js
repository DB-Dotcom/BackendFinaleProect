import test from 'ava';
import request from 'supertest';
import app from '../app.js'; // Pfad zur Hauptdatei Ihrer App
import 'dotenv/config'; // Stellt sicher, dass Ihre Umgebungsvariablen geladen werden

// Vor jedem Test einen neuen Benutzer registrieren, um Duplikate zu vermeiden
test.beforeEach(async t => {
  await request(app)
    .post('/api/register')
    .send({
      email: `test_user_${Date.now()}@test.com`,
      password: 'password123',
      superPassword: 'superPassword123'
    });
});



test('Benutzerregistrierung', async t => {
  const response = await request(app)
    .post('/api/register')
    .send({
      email: `new_test_user_${Date.now()}@test.com`,
      password: 'password123',
      superPassword: 'superPassword123'
    });
  
  t.is(response.status, 201);
  t.regex(response.body.message, /erfolgreich registriert/);
});



test('Benutzeranmeldung', async t => {
  const response = await request(app)
    .post('/api/login')
    .send({
      email: 'test_user@test.com', // Nutzen Sie eine E-Mail, die in der Test-DB existiert
      password: 'password123'
    });

  t.is(response.status, 200);
  t.truthy(response.body.token);
});


// Passwortzurücksetzung mit Super Passwort
test('Passwortzurücksetzung mit Super Passwort', async t => {
    // Annahme: ein Benutzer existiert bereits in der Datenbank
    const resetResponse = await request(app)
      .post('/api/reset-password')
      .send({
        email: 'existing_user@test.com', // E-Mail eines existierenden Benutzers
        superPassword: 'superPassword123', // Korrektes Super Passwort
        newPassword: 'newPassword123'
      });
  
    t.is(resetResponse.status, 200);
    t.regex(resetResponse.body.message, /erfolgreich zurückgesetzt/);
  
    // Optional: Anmeldeversuch mit dem neuen Passwort, um die Änderung zu bestätigen
  });
  
// Benutzerdaten abrufen
test('Benutzerdaten abrufen', async t => {
    const userId = 'someUserId'; // Ersetzen Sie dies durch eine gültige Benutzer-ID
    const getResponse = await request(app)
      .get(`/api/user/${userId}`);
  
    t.is(getResponse.status, 200);
    t.truthy(getResponse.body.user);
  });
  
  // Benutzerdaten aktualisieren
  test('Benutzerdaten aktualisieren', async t => {
    const updateResponse = await request(app)
      .put('/api/update-user')
      .send({
        email: 'existing_user@test.com', // E-Mail eines existierenden Benutzers
        superPassword: 'superPassword123', // Korrektes Super Passwort
        newPassword: 'updatedPassword123' // Neues Passwort
      });
  
    t.is(updateResponse.status, 200);
    t.regex(updateResponse.body.message, /erfolgreich aktualisiert/);
  });


// Benutzerlöschung
test('Benutzerlöschung', async t => {
    const deleteResponse = await request(app)
      .post('/api/delete-user')
      .send({
        email: 'user_to_delete@test.com', // E-Mail eines zu löschenden Benutzers
        superPassword: 'superPassword123' // Korrektes Super Passwort
      });
  
    t.is(deleteResponse.status, 200);
    t.regex(deleteResponse.body.message, /erfolgreich gelöscht/);
  });
  