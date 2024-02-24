import express from 'express';
import {
  registerUser,
  loginUser,
  resetPassword,
  deleteUser,
  getUserData,
  updateUserData
} from '../controllers/userController.js';

const router = express.Router();

// Registrierung eines neuen Benutzers
router.post('/register', registerUser);

// Anmeldung eines Benutzers
router.post('/login', loginUser);

// Passwort mit Super Passwort zurücksetzen
/* router.post('/reset-password', resetPassword); */

// Benutzer löschen
router.delete('/delete-user', deleteUser);

// Benutzerdaten abrufen
router.get('/:userId', getUserData);

// Benutzerdaten aktualisieren
router.put('/update-user', updateUserData);


export default router;

// Path: src/controllers/UserController.js