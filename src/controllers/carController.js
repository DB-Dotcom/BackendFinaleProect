import Car from '../models/Car.js'

export const createCar = async (req, res) => {
  try {
    const {
      userId,
      kennzeichen,
      marke,
      modell,
      baujahr,
      kraftstoff,
      schadstoffklasse,
      leistungKW,
      leistungPS,
      kilometerstand,
      nächsteTüvUntersuchung
    } = req.body

    const newCar = new Car({
      userId,
      kennzeichen,
      marke,
      modell,
      baujahr,
      kraftstoff,
      schadstoffklasse,
      leistungKW,
      leistungPS,
      kilometerstand,
      nächsteTüvUntersuchung
    })

    await newCar.save()
    res
      .status(201)
      .json({ message: 'Fahrzeug erfolgreich erstellt.', carId: newCar._id })
  } catch (error) {
    console.error('Fehler beim Erstellen des Fahrzeugs:', error)
    res
      .status(500)
      .json({
        message: 'Fehler beim Erstellen des Fahrzeugs.',
        error: error.message
      })
  }
}

export const addKilometerstand = async (req, res) => {
  try {
    const { carId, kilometerstand } = req.body
    const car = await Car.findById(carId)
    if (!car) {
      return res.status(404).json({ message: 'Fahrzeug nicht gefunden.' })
    }
    car.kilometerstandHistory.push({ datum: new Date(), kilometerstand })
    await car.save()
    res.status(201).json({ message: 'Kilometerstand erfolgreich hinzugefügt.' })
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Kilometerstands:', error)
    res
      .status(500)
      .json({
        message: 'Fehler beim Hinzufügen des Kilometerstands.',
        error: error.message
      })
  }
}

export const addTuevEintrag = async (req, res) => {
  try {
    const { carId, tuev } = req.body
    const car = await Car.findById(carId)
    if (!car) {
      return res.status(404).json({ message: 'Fahrzeug nicht gefunden.' })
    }
    car.tuevHistory.push(tuev)
    await car.save()
    res.status(201).json({ message: 'TÜV-Eintrag erfolgreich hinzugefügt.' })
  } catch (error) {
    console.error('Fehler beim Hinzufügen des TÜV-Eintrags:', error)
    res
      .status(500)
      .json({
        message: 'Fehler beim Hinzufügen des TÜV-Eintrags.',
        error: error.message
      })
  }
}

export const addOelwechsel = async (req, res) => {
  try {
    const { carId, oelwechsel } = req.body
    const car = await Car.findById(carId)
    if (!car) {
      return res.status(404).json({ message: 'Fahrzeug nicht gefunden.' })
    }
    car.oelwechselHistory.push(oelwechsel)
    await car.save()
    res
      .status(201)
      .json({ message: 'Ölwechsel-Eintrag erfolgreich hinzugefügt.' })
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Ölwechsel-Eintrags:', error)
    res
      .status(500)
      .json({
        message: 'Fehler beim Hinzufügen des Ölwechsel-Eintrags.',
        error: error.message
      })
  }
}

export const getCarDetails = async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId)
    if (!car) {
      return res.status(404).json({ message: 'Fahrzeug nicht gefunden.' })
    }
    res.json(car)
  } catch (error) {
    console.error('Fehler beim Abrufen der Fahrzeugdetails:', error)
    res
      .status(500)
      .json({
        message: 'Fehler beim Abrufen der Fahrzeugdetails.',
        error: error.message
      })
  }
}

export const getAllCarsForUser = async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.params.userId })
    res.json({ cars })
  } catch (error) {
    console.error('Fehler beim Abrufen der Fahrzeuge für Benutzer:', error)
    res
      .status(500)
      .json({
        message: 'Fehler beim Abrufen der Fahrzeuge.',
        error: error.message
      })
  }
}

// Path: src/models/Car.js
