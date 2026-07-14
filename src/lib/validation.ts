/**
 * Input validation & sanitization utilities for production safety.
 * Prevents XSS, injection, and abuse via form/API inputs.
 */

/**
 * Strip HTML tags and trim whitespace. Prevents basic XSS in stored data.
 */
export function sanitizeText(input: unknown, maxLen = 2000): string {
  if (typeof input !== "string") return "";
  let s = input.trim();
  // Remove HTML tags
  s = s.replace(/<[^>]*>/g, "");
  // Remove null bytes and control chars (except newlines/tabs)
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  // Limit length
  if (s.length > maxLen) s = s.slice(0, maxLen);
  return s;
}

/**
 * Validate and sanitize an email address. Returns cleaned email or null.
 */
export function validateEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const email = input.trim().toLowerCase();
  // RFC 5322 simplified pattern
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  if (!emailRegex.test(email)) return null;
  if (email.length > 254) return null;
  return email;
}

/**
 * Validate and sanitize a phone number. Returns cleaned digits or null.
 * Accepts +, spaces, dashes, parentheses; requires 7-15 digits.
 */
export function validatePhone(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const phone = input.trim();
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  // Allow + prefix, spaces, dashes, parentheses
  if (!/^[+]?[\d\s\-()]+$/ .test(phone)) return null;
  return phone;
}

/**
 * Validate a URL is from an allowed domain (for redirects/links).
 */
export function validateUrl(input: unknown, allowedDomains: string[] = []): string | null {
  if (typeof input !== "string") return null;
  try {
    const url = new URL(input);
    if (allowedDomains.length > 0 && !allowedDomains.includes(url.hostname)) {
      return null;
    }
    if (!["http:", "https:"].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Detect potential spam content (basic heuristics).
 * Returns true if the input looks like spam.
 */
export function isSpam(input: unknown): boolean {
  if (typeof input !== "string") return false;
  const lower = input.toLowerCase();
  // Common spam patterns
  const spamPatterns = [
    /viagra|cialis|casino|gambling|lottery|prize.*winner/i,
    /\b(buy|cheap)\s+(medication|pills|drugs)\b/i,
    /https?:\/\/\S+\s+https?:\/\/\S+\s+https?:\/\//i, // 3+ URLs
  ];
  return spamPatterns.some((p) => p.test(lower));
}

/**
 * Validate that a string is a known enum/option value.
 */
export function validateEnum<T extends string>(
  input: unknown,
  allowed: readonly T[]
): T | null {
  if (typeof input !== "string") return null;
  return (allowed as readonly string[]).includes(input) ? (input as T) : null;
}
