import express from 'express';
import { addCar,
         addKilometerstand,
         addTuevEintrag, 
         addOelwechsel, 
         addService,
         getCarDetails,
         getAllCarsForUser
        } from '../controllers/carController.js';

const router = express.Router();

// Route zum Hinzufügen eines neuen Fahrzeugs
router.post('/', addCar);

// Route zum Hinzufügen eines Kilometerstand-Eintrags
router.post('/:carId/kilometerstand', addKilometerstand);

// Route zum Hinzufügen eines TÜV-Eintrags
router.post('/:carId/tuev', addTuevEintrag);

// Route zum Hinzufügen eines Ölwechsel-Eintrags
router.post('/:carId/oelwechsel', addOelwechsel);

// Route zum Hinzufügen eines Service-Eintrags
router.post('/:carId/service', addService);

// Route zum Abrufen der Details eines Fahrzeugs
router.get('/:carId', getCarDetails);

// Route zum Abrufen aller Fahrzeuge, die einem Benutzer gehören
router.get('/user/:userId', getAllCarsForUser);

export default router;

