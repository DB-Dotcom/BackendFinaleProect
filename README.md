# Autoverwaltungs-App Backend-Dokumentation

## Einrichtung

Stellen Sie sicher, dass Node.js und npm auf Ihrem System installiert sind.
Installieren Sie die notwendigen NPM-Pakete durch Ausführung von `npm install
express mongoose bcrypt jsonwebtoken dotenv cors` im Wurzelverzeichnis Ihres Projekts. 

Erstellen Sie eine `.env`-Datei im Wurzelverzeichnis und definieren Sie die Umgebungsvariablen

`MONGODB_URI` (Ihre MongoDB-Verbindungszeichenfolge) und `JWT_SECRET` (ein Geheimnis für die Signierung von JWTs).

# Auto-Management-System API Endpunkte

## API-Endpunkte

### Authentifizierung

| Endpunkt         | Methode | Beschreibung                | Anfragekörper                                                                 | Erfolgantwort                 | Fehlerantwort               |
|------------------|---------|-----------------------------|-------------------------------------------------------------------------------|-------------------------------|-----------------------------|
| `/api/users/register` | POST    | Registriert einen neuen Benutzer. | `{ "email": "<email>", "password": "<password>", "superPassword": "<superPassword>" }` | `201` Benutzer erstellt.      | `400` Benutzer existiert bereits. |
| `/api/users/login`    | POST    | Meldet einen Benutzer an.    | `{ "email": "<email>", "password": "<password>" }`                            | `200` Anmeldung erfolgreich. | `401` Anmeldung fehlgeschlagen.   |

### Benutzer

| Endpunkt                | Methode | Beschreibung                      | Authentifizierung | Anfragekörper                                 | Erfolgantwort            | Fehlerantwort          |
|-------------------------|---------|-----------------------------------|-------------------|-----------------------------------------------|--------------------------|------------------------|
| `/api/users/:userId`    | GET     | Ruft Benutzerdaten ab.            | Erforderlich      | N/A                                           | `200` Benutzerdaten.     | `404` Benutzer nicht gefunden. |
| `/api/users/:userId`    | PUT     | Aktualisiert Benutzerdaten.       | Erforderlich      | `{ "email": "(optional)", "password": "(optional)", "superPassword": "<superPassword>" }` | `200` Aktualisiert.      | `403` Nicht autorisiert. |
| `/api/users/:userId`    | DELETE  | Löscht ein Benutzerkonto.         | Erforderlich      | `{ "superPassword": "<superPassword>" }`      | `200` Konto gelöscht.    | `403` Nicht autorisiert. |

### Fahrzeuge

| Endpunkt                        | Methode | Beschreibung                          | Authentifizierung | Anfragekörper                                                      | Erfolgantwort               | Fehlerantwort             |
|---------------------------------|---------|---------------------------------------|-------------------|--------------------------------------------------------------------|-----------------------------|---------------------------|
| `/api/cars`                     | POST    | Fügt ein Fahrzeug hinzu.              | Erforderlich      | `{ "make": "<make>", "model": "<model>", "year": <year>, "vin": "<vin>" }` | `201` Fahrzeug hinzugefügt. | `400` Ungültige Anfrage. |
| `/api/cars/:carId/service`      | POST    | Fügt ein Serviceintervall zu einem Fahrzeug hinzu. | Erforderlich      | `{ "date": "<date>", "servicesPerformed": ["<service>", ...] }`    | `201` Service hinzugefügt.  | `404` Fahrzeug nicht gefunden. |

## Fehlermeldungen und Statuscodes

Die API verwendet standardisierte HTTP-Statuscodes, um den Erfolg oder Fehlschlag einer Anfrage zu kommunizieren. Zusätzlich zu den Statuscodes gibt die API spezifische Fehlermeldungen zurück, die weitere Details über das Problem liefern.

- `200 OK` - Die Anfrage war erfolgreich.
- `201 Created` - Ein neues Element wurde erfolgreich erstellt.
- `400 Bad Request` - Die Anfrage war ungültig.
- `401 Unauthorized` - Es fehlen oder sind ungültige Authentifizierungsdetails angegeben.
- `403 Forbidden` - Der Server verweigert die Aktion.
- `404 Not Found` - Die angeforderte Ressource wurde nicht gefunden.
- `500 Internal Server Error` - Ein generischer Fehler ist auf dem Server aufgetreten.
