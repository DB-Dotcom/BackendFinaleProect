# Autoverwaltungs-App Backend-Dokumentation

## Einrichtung

Stellen Sie sicher, dass Node.js und npm auf Ihrem System installiert sind.
Installieren Sie die notwendigen NPM-Pakete durch Ausführung von `npm install
express mongoose bcrypt jsonwebtoken dotenv cors` im Wurzelverzeichnis Ihres Projekts. 

Erstellen Sie eine `.env`-Datei im Wurzelverzeichnis und definieren Sie die Umgebungsvariablen

`MONGODB_URI` (Ihre MongoDB-Verbindungszeichenfolge) und `JWT_SECRET` (ein Geheimnis für die Signierung von JWTs).

# Auto-Management-System API Endpunkte

## Auth-Controller

Der Auth-Controller ist verantwortlich für die Authentifizierung von Benutzern und die Generierung von GWToken, die für die Sicherheit und den Zugriffskontrolle innerhalb der API verwendet werden.


### Registrierung

- **Endpunkt**: `POST /api/auth/register`
- **Zweck**: Erstellt ein neues Benutzerkonto und generiert ein GWToken.
- **Anfrage**:
  - **Body**: `{ "email": "newUser@example.com", "password": "newUserPassword", "superPassword": "userSuperPassword" }`
- **Antwort**:
  - **Erfolg**: `201 Created` mit GWToken im Body: `{ "token": "<GWToken>", "message": "Benutzer erfolgreich registriert." }`
  - **Fehler**: `400 Bad Request` bei bereits existierendem Benutzer.

#### Passwort zurücksetzen

- `POST /api/users/reset-password`
- Erfordert Authentifizierung (Bearer Token)
- Body: `{ "newPassword": "neuesPasswort123", "superPassword": "superPasswort123" }`
- Antwort: `{ "message": "Passwort erfolgreich zurückgesetzt." }`



### Login

- **Endpunkt**: `POST /api/auth/login`
- **Zweck**: Authentifiziert den Benutzer und generiert ein GWToken.
- **Anfrage**:
  - **Body**: `{ "email": "user@example.com", "password": "userPassword" }`
- **Antwort**:
  - **Erfolg**: `200 OK` mit GWToken im Body: `{ "token": "<GWToken>" }`
  - **Fehler**: `401 Unauthorized` bei falschen Anmeldedaten.

## Benutzer löschen

Ermöglicht es authentifizierten Benutzern, ihr Konto zu löschen.

- **Endpunkt**: `DELETE /api/users/:userId`
- **Authentifizierung**: Erforderlich (GWToken im `Authorization`-Header).
- **Anfrage**:
  - **Body**: `{ "superPassword": "userSuperPassword" }`
- **Antwort**:
  - **Erfolg**: `200 OK` mit der Nachricht: `{ "message": "Benutzerkonto erfolgreich gelöscht." }`
  - **Fehler**: `403 Forbidden` bei falschem `superPassword`.


## Benutzerdaten anzeigen

Ermöglicht es authentifizierten Benutzern, ihre persönlichen Daten einzusehen.

- **Endpunkt**: `GET /api/users/:userId`
- **Authentifizierung**: Erforderlich (GWToken im `Authorization`-Header).
- **Antwort**:
  - **Erfolg**: `200 OK` mit Benutzerdaten im Body.
  - **Fehler**: `404 Not Found` wenn der Benutzer nicht existiert.

## Benutzerdaten Aktualisierung

Ermöglicht es authentifizierten Benutzern, ihre persönlichen Daten zu aktualisieren.

- **Endpunkt**: `PUT /api/users/:userId`
- **Authentifizierung**: Erforderlich (GWToken im `Authorization`-Header).
- **Anfrage**:
  - **Body**: `{ "email": "(optional)", "password": "(optional)", "superPassword": "requiredForPasswordChange" }`
- **Antwort**:
  - **Erfolg**: `200 OK` mit der Nachricht: `{ "message": "Benutzerdaten erfolgreich aktualisiert." }`
  - **Fehler**: `403 Forbidden` bei falschem `superPassword`.


## Sicherheitsmaßnahmen

- Alle sensiblen Anfragen erfordern eine Authentifizierung mittels GWToken.
- Das `superPassword` wird für kritische Aktionen wie das Aktualisieren von Passwörtern benötigt.
