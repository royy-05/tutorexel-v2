/**
 * Shared server-side form validation utilities.
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates email format and maximum length (100).
 */
export function isValidEmail(email: unknown): email is string {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length === 0 || trimmed.length > 100) return false;
  return EMAIL_REGEX.test(trimmed);
}

/**
 * Validates phone with 7 to 20 digits or allowed symbols (+, -, (, ), spaces, dots).
 * Requires at least 6 numeric digits overall.
 */
export function isValidPhone(phone: unknown): phone is string {
  if (typeof phone !== "string") return false;
  const trimmed = phone.trim();
  if (trimmed.length < 7 || trimmed.length > 20) return false;
  const digitCount = (trimmed.match(/\d/g) || []).length;
  if (digitCount < 6) return false;
  return /^[0-9+\-().\s]+$/.test(trimmed);
}

/**
 * Checks that a string does not exceed the specified maximum length.
 * Null and undefined values are considered valid (optional fields).
 */
export function isValidLength(val: unknown, max: number): boolean {
  if (val === null || val === undefined) return true;
  if (typeof val !== "string") return false;
  return val.length <= max;
}

/**
 * Checks if a hidden honeypot field was filled by a bot.
 */
export function isHoneypotTriggered(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}
