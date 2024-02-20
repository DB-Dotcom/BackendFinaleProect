# Autoverwaltungs-App Backend-Dokumentation

## Einrichtung

Stellen Sie sicher, dass Node.js und npm auf Ihrem System installiert sind.
Installieren Sie die notwendigen NPM-Pakete durch Ausführung von `npm install
express mongoose bcrypt jsonwebtoken dotenv cors` im Wurzelverzeichnis Ihres Projekts. 

Erstellen Sie eine `.env`-Datei im Wurzelverzeichnis und definieren Sie die Umgebungsvariablen

`MONGODB_URI` (Ihre MongoDB-Verbindungszeichenfolge) und `JWT_SECRET` (ein Geheimnis für die Signierung von JWTs).

# Auto-Management-System API Endpunkte

## Benutzerregistrierung

**POST** `/users/register`

Registriert einen neuen Benutzer im System.

- **Body**:
  - `email` (String) - Die E-Mail-Adresse des Benutzers.
  - `password` (String) - Das Passwort des Benutzers.
  - `superPassword` (String) - Das Super Passwort für Passwortwiederherstellungszwecke.

- **Antwort**:
  - **201** - Benutzer erfolgreich registriert.
  - **400** - Benutzer existiert bereits.
  - **500** - Bei der Registrierung ist ein Fehler aufgetreten.

## Benutzeranmeldung

**POST** `/users/login`

Meldet einen Benutzer an und gibt ein Token zurück.

- **Body**:
  - `email` (String) - Die E-Mail-Adresse des Benutzers.
  - `password` (String) - Das Passwort des Benutzers.

- **Antwort**:
  - **200** - Anmeldung erfolgreich.
  - **401** - Anmeldung fehlgeschlagen.
  - **500** - Bei der Anmeldung ist ein Fehler aufgetreten.

## Passwortzurücksetzung mit Super Passwort

**POST** `/users/reset-password`

Ermöglicht das Zurücksetzen des Benutzerpassworts unter Verwendung des Super Passworts.

- **Body**:
  - `email` (String) - Die E-Mail-Adresse des Benutzers.
  - `superPassword` (String) - Das Super Passwort des Benutzers.
  - `newPassword` (String) - Das neue Passwort des Benutzers.

- **Antwort**:
  - **200** - Passwort erfolgreich zurückgesetzt.
  - **401** - Passwortzurücksetzung fehlgeschlagen.
  - **500** - Fehler bei der Passwortzurücksetzung.

## Benutzerlöschung

**POST** `/users/delete-user`

Löscht einen Benutzer aus dem System.

- **Body**:
  - `email` (String) - Die E-Mail-Adresse des Benutzers.
  - `superPassword` (String) - Das Super Passwort des Benutzers zur Authentifizierung.

- **Antwort**:
  - **200** - Benutzer erfolgreich gelöscht.
  - **401** - Benutzerlöschung fehlgeschlagen.
  - **500** - Fehler bei der Benutzerlöschung.

## Benutzerdaten abrufen

**GET** `/user/:userId`

Ruft die Daten eines Benutzers ab.

- **Parameter**:
  - `userId` (String) - Die ID des Benutzers.

- **Antwort**:
  - **200** - Benutzerdaten erfolgreich abgerufen.
  - **404** - Benutzer nicht gefunden.
  - **500** - Fehler beim Abrufen der Benutzerdaten.

## Benutzerdaten aktualisieren

**PUT** `/users/update-user`

Aktualisiert die Daten eines Benutzers.

- **Body**:
  - `email` (String) - Die E-Mail-Adresse des Benutzers.
  - `superPassword` (String) - Das Super Passwort des Benutzers zur Authentifizierung.
  - `newPassword` (String) - Das neue Passwort des Benutzers.

- **Antwort**:
  - **200** - Benutzerdaten erfolgreich aktualisiert.
  - **401** - Benutzerdatenaktualisierung fehlgeschlagen.
  - **500** - Fehler bei der Benutzerdatenaktualisierung.

## Fehlerbehandlung

Alle Endpunkte geben im Fehlerfall ein JSON-Objekt zurück, das mindestens ein `message` Feld mit einer Beschreibung des Fehlers enthält.
