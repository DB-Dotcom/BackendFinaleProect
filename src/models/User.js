import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein']
  },
  password: {
    type: String,
    required: true
  },
  superPassword: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Vor dem Speichern das Passwort und Super Passwort hashen
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  if (this.isModified('superPassword') || this.isNew) {
    this.superPassword = await bcrypt.hash(this.superPassword, 12);
  }
  next();
});

// Methoden für das User-Schema hinzufügen
userSchema.methods = {
  matchPassword: function(password) {
    return bcrypt.compare(password, this.password);
  },
  matchSuperPassword: function(superPassword) {
    return bcrypt.compare(superPassword, this.superPassword);
  }
};

const User = mongoose.model('User', userSchema);

export default User;

// Path: backend/src/models/User.js