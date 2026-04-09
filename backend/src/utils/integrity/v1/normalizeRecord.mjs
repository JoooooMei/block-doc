// Normalize values to avoid hash inconsistencies.

export const normalize = (value) => {
  if (value === undefined) return undefined;

  if (value === null) return null;

  // Normalize dates
  if (value instanceof Date) {
    return value.toISOString();
  }

  // Normalize strings
  if (typeof value === 'string') {
    return value.normalize('NFC');
  }

  // Normalize numbers
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new Error('Invalid number');
    }
    return Number(value);
  }

  if (Array.isArray(value)) {
    return value.map(normalize);
  }

  if (typeof value === 'object') {
    const result = {};
    for (const key of Object.keys(value)) {
      const normalized = normalize(value[key]);
      if (normalized !== undefined) {
        result[key] = normalized;
      }
    }
    return result;
  }

  return value;
};
