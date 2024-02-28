import car from '../models/Car.js ';


export const createCar = async (req, res) => {
    try { const { userId, carName, carBrand, carModel, carType, carYear, carKilometerstand, carTuev, carOelwechsel, carService } = req.body;
        const existingCar = await car
            .findOne({ carName });
        if (existingCar) {
            return res.status(400).json({ message: 'Fahrzeug existiert bereits.' });
        }
        const newCar = await car.create({
            userId,
            carName,
            carBrand,
            carModel,
            carType,
            carYear,
            carKilometerstand,
            carTuev,
            carOelwechsel,
            carService,
        });
        res.status(201).json({ message: 'Fahrzeug erfolgreich registriert.', carId: newCar._id });
    }
    catch (error) {
        res.status(500).json({ message: 'Bei der Registrierung ist ein Fehler aufgetreten.' });
    }
}
export const addKilometerstand = async (req, res) => {
    try {
        const { carId, kilometerstand } = req.body;
        const car = await car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Fahrzeug nicht gefunden.' });
        }
        car.carKilometerstand.push({ kilometerstand });
        await car.save();
        res.status(201).json({ message: 'Kilometerstand erfolgreich hinzugefügt.' });
    } catch (error) {
        res.status(500).json({ message: 'Bei der Hinzufügung des Kilometerstands ist ein Fehler aufgetreten.' });
    }
};

export const addTuevEintrag = async (req, res) => {
    try {
        const { carId, tuev } = req.body;
        const car = await car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Fahrzeug nicht gefunden.' });
        }
        car.carTuev.push({ tuev });
        await car.save();
        res.status(201).json({ message: 'TÜV-Eintrag erfolgreich hinzugefügt.' });
    } catch (error) {
        res.status(500).json({ message: 'Bei der Hinzufügung des TÜV-Eintrags ist ein Fehler aufgetreten.' });
    }
};

export const addOelwechsel = async (req, res) => {
    try {
        const { carId, oelwechsel } = req.body;
        const car = await car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Fahrzeug nicht gefunden.' });
        }
        car.carOelwechsel.push({ oelwechsel });
        await car.save();
        res.status(201).json({ message: 'Ölwechsel-Eintrag erfolgreich hinzugefügt.' });
    } catch (error) {
        res.status(500).json({ message: 'Bei der Hinzufügung des Ölwechsel-Eintrags ist ein Fehler aufgetreten.' });
    }
};


export const addService = async (req, res) => {
    try {
        const { carId, service } = req.body;
        const car = await car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Fahrzeug nicht gefunden.' });
        }
        car.carService.push({ service });
        await car.save();
        res.status(201).json({ message: 'Service-Eintrag erfolgreich hinzugefügt.' });
    } catch (error) {
        res.status(500).json({ message: 'Bei der Hinzufügung des Service-Eintrags ist ein Fehler aufgetreten.' });
    }
};

export const getCarDetails = async (req, res) => {
    try {
        const car = await car.findById(req.params.carId);
        if (!car) {
            return res.status(404).json({ message: 'Fahrzeug nicht gefunden.' });
        }
        res.json({ car });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Fahrzeugdetails.' });
    }
};


export const getAllCarsForUser = async (req, res) => {
    try {
        const cars = await car.find({ userId: req.params.userId });
        res.json({ cars });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Fahrzeuge.' });
    }
};

export default router;



