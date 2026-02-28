import { BLOCK_DOC_API } from '../config/config';
import { ApiClient } from '../core/ApiClient';
import { JournalRepository } from '../repository/JournalRepository';
import { JournalService } from '../services/journalServices';

const apiClient = new ApiClient(BLOCK_DOC_API);
const journalRepository = new JournalRepository(apiClient);
const journalService = new JournalService(journalRepository);

export { journalService };
