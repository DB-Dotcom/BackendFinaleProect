import bcrypt from 'bcryptjs';

/**
 * Hashes a password using bcryptjs.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Erzeugt ein Salt mit 10 Runden
  const hashedPassword = await bcrypt.hash(password, salt); // Hashed das Passwort mit dem Salt
  return hashedPassword;
};

export default hashPassword;
