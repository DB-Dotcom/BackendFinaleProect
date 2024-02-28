# Backend-Dokumentation

Diese Dokumentation beschreibt die Nutzung der REST API, die im Rahmen des Backends entwickelt wurde. Das Backend basiert auf dem MERN-Stack (MongoDB, Express.js, React.js, Node.js) und Vue.js für die Frontend-Entwicklung. Es bietet eine Reihe von Endpunkten zur Verwaltung von Benutzer- und Fahrzeugdaten.

## Voraussetzungen 📋

- Node.js und npm müssen installiert sein.
- Eine MongoDB-Datenbank ist erforderlich.
- Eine `.env` Datei mit den notwendigen Umgebungsvariablen (z.B. Datenbank-URL, JWT-Secret).

## Installation  🛠️

1. Klonen Sie das Repository und navigieren Sie in das Projektverzeichnis.
2. Installieren Sie die Abhängigkeiten mit `npm install`.
3. Starten Sie den Server mit `npm start`. Der Server läuft standardmäßig auf Port 5000, es sei denn, ein anderer Port ist in der `.env` Datei festgelegt.

## Verwendung der API  📡

Die API bietet Endpunkte zur Verwaltung von Benutzer- und Fahrzeugdaten. Für einige Aktionen ist eine Authentifizierung erforderlich. Im Folgenden finden Sie eine Beschreibung der verfügbaren Endpunkte.

### Benutzer-Endpunkte  🧑

#### 📝 Benutzer registrieren 

-  `POST /api/users/register`
  - Erwartet JSON mit `email`, `password` und `superPassword`.

#### 📝 Benutzer anmelden

- `POST /api/users/login`
  - Erwartet JSON mit `email` und `password`. Gibt einen JWT zurück.

#### 📝 Passwort zurücksetzen  

- `POST /api/users/reset-password`
  - Erwartet JSON mit `email`, `superPassword` und `newPassword`.

#### 📝 Benutzer löschen 

- `DELETE /api/users/delete-user`
  - Erfordert Authentifizierung. Erwartet JSON mit `email` und `superPassword`.

#### 📝 Benutzerdaten abrufen

- `GET /api/users/:userId`
  - Erfordert Authentifizierung.

#### 📝 Benutzerdaten aktualisieren

- `PUT /api/users/update-user`
  - Erfordert Authentifizierung. Erwartet JSON mit `email`, `superPassword` und `newPassword`.

### Fahrzeug-Endpunkte  🚗

#### 📝 Fahrzeug registrieren 

- `POST /api/cars/`
  - Erfordert Authentifizierung. Erwartet JSON mit Fahrzeugdetails.

```json
{
  "userId": "12345",
  "carName": "Mein Auto",
  "carBrand": "Toyota",
  "carModel": "Corolla",
  "carType": "Limousine",
  "carYear": 2020,
  "carKilometerstand": 50000
}

```

#### 📝 Kilometerstand hinzufügen 

- `POST /api/cars/:carId/kilometerstand`
  - Erfordert Authentifizierung. Erwartet JSON mit `kilometerstand`.

#### 📝 TÜV-Eintrag hinzufügen 

- `POST /api/cars/:carId/tuev`
  - Erfordert Authentifizierung. Erwartet JSON mit `tuev`.

#### 📝 Ölwechsel-Eintrag hinzufügen 

- `POST /api/cars/:carId/oelwechsel`
  - Erfordert Authentifizierung. Erwartet JSON mit `oelwechsel`.

#### 📝 Service-Eintrag hinzufügen  

- `POST /api/cars/:carId/service`
  - Erfordert Authentifizierung. Erwartet JSON mit `service`.

#### 📝 Fahrzeugdetails abrufen  

- `GET /api/cars/:carId`
  - Erfordert Authentifizierung.

#### 📝 Alle Fahrzeuge eines Benutzers abrufen 

- `GET /api/cars/user/:userId`
  - Erfordert Authentifizierung.

## Fehlerbehandlung ❌

Die API sendet spezifische Fehlermeldungen und Statuscodes zurück, wenn Probleme auftreten. Zum Beispiel:

- `400 Bad Request`: Fehlende oder ungültige Anforderungsdaten.
- `401 Unauthorized`: Fehlende oder ungültige Authentifizierung.
- `404 Not Found`: Ressource nicht gefunden.
- `500 Internal Server Error`: Allgemeiner Serverfehler.

## Sicherheit 🛡️

Die API verwendet JWTs (JSON Web Tokens) für die Authentifizierung. Es ist wichtig, dass der JWT geheim gehalten und sicher übertragen wird. Zusätzlich wird empfohlen, HTTPS zu verwenden, um die Datenübertragung zu verschlüsseln.


## 🔒 Erfordert Authentifizierung  

Einige Endpunkte der API erfordern eine erfolgreiche Authentifizierung, bevor sie aufgerufen werden können. Dies bedeutet, dass für den Zugriff auf diese Endpunkte ein gültiger JWT (JSON Web Token) erforderlich ist, der im `Authorization`-Header der Anfrage übermittelt werden muss. Die Authentifizierung stellt sicher, dass nur registrierte und autorisierte Benutzer bestimmte Aktionen durchführen können.

### Wie funktioniert die Authentifizierung? 

1. **Benutzer anmelden**: Zuerst muss sich ein Benutzer über den `POST /api/users/login` Endpunkt anmelden. Bei erfolgreicher Anmeldung wird ein JWT zurückgegeben.
   
2. **Token verwenden**: Der erhaltene JWT muss bei folgenden Anfragen im `Authorization`-Header mitgeführt werden. Der Header sollte wie folgt aussehen: `Authorization: Bearer <Token>`.

### 🔐 Endpunkte, die Authentifizierung erfordern

Die folgenden Endpunkte erfordern, dass der `Authorization`-Header mit einem gültigen JWT vorhanden ist:

- **Benutzer löschen**: `DELETE /api/users/delete-user`
- **Benutzerdaten abrufen**: `GET /api/users/:userId`
- **Benutzerdaten aktualisieren**: `PUT /api/users/update-user`
- **Fahrzeug registrieren**: `POST /api/cars/`
- **Kilometerstand hinzufügen**: `POST /api/cars/:carId/kilometerstand`
- **TÜV-Eintrag hinzufügen**: `POST /api/cars/:carId/tuev`
- **Ölwechsel-Eintrag hinzufügen**: `POST /api/cars/:carId/oelwechsel`
- **Service-Eintrag hinzufügen**: `POST /api/cars/:carId/service`
- **Fahrzeugdetails abrufen**: `GET /api/cars/:carId`
- **Alle Fahrzeuge eines Benutzers abrufen**: `GET /api/cars/user/:userId`

### ❌ Fehlermeldungen bei Authentifizierung

- **Fehlender Token**: Falls kein Token im `Authorization`-Header angegeben ist, wird die Anfrage mit dem Statuscode `401 Unauthorized` und einer entsprechenden Fehlermeldung abgelehnt.
- **Ungültiger Token**: Wenn der übermittelte Token ungültig oder abgelaufen ist, wird die Anfrage mit dem Statuscode `403 Forbidden` und einer Fehlermeldung zurückgewiesen.

### 🛡️ Sicherheitshinweise

- **Sicherer Umgang mit Token**: Es ist wichtig, den JWT sicher zu speichern und zu übertragen, um Missbrauch zu verhindern.
- **HTTPS verwenden**: Für die Kommunikation mit der API sollte stets HTTPS verwendet werden, um die Übertragung des Tokens zu verschlüsseln.

Diese Authentifizierungsmethode sorgt für eine sichere und kontrollierte Nutzung der API, indem sie den Zugriff auf sensible Endpunkte auf autorisierte Benutzer beschränkt.
