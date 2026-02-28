import { useState } from 'react';
import { journalService } from '../src/container/container';

export function useCreateJournalEntry() {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (record) => {
    try {
      setLoading(true);
      setError(null);

      const result = await journalService.createRecord(record);
      setEntry(result.data);

      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    entry,
    loading,
    error,
  };
}
