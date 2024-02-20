import express from 'express'  
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/config/db.js'
/* import routes from './src/routes/indexRoute.js' */


dotenv.config()

connectDB() // Verbindung zur Datenbank herstellen

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(`
    <h1>Willkommen zur Auto-Management-System API</h1>
    <p>Diese API bietet Schnittstellen für die Verwaltung von Benutzerkonten, Fahrzeugen und Buchungen im Rahmen eines Auto-Management-Systems.</p>
    <p>Verwenden Sie die API-Endpunkte, um Benutzer zu registrieren, anzumelden, Passwörter zurückzusetzen, und um Informationen über verfügbare Fahrzeuge und Buchungen abzurufen.</p>
     
    <h2>API-Endpunkte</h2>

    <h3>Benutzer</h3>
    <ul>
      <li>POST /api/users/register - Registrieren Sie einen neuen Benutzer</li>
      <li>POST /api/users/login - Melden Sie sich an</li>
      <li>POST /api/users/reset-password - Setzen Sie das Passwort zurück</li>
      <li>GET /api/users - Alle Benutzer anzeigen</li>
      <li>PUT /api/users/email - E-Mail-Adresse eines Benutzers ändern</li>
    </ul>

    <h3>Fahrzeuge</h3>
  `); // Antwort an den Client mit HTML-Inhalten
});



use('/api', routes)  // Verwenden Sie die routes, wenn der Pfad /api ist

const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

export default app // Export für den Test

// Path: backend/src/config/db.js