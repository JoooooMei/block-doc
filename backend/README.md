## API Endpoints

### Journal

| Method | Endpoint                      | Description                                       |
| ------ | ----------------------------- | ------------------------------------------------- |
| GET    | `/api/v1/data`                | Health check                                      |
| GET    | `/api/v1/patients`            | Get all patients                                  |
| GET    | `/api/v1/patients/:patientId` | Search patient                                    |
| GET    | `/api/v1/journal/:patientId`  | Get patient journal entries                       |
| POST   | `/api/v1/patients`            | Add patient                                       |
| POST   | `/api/v1/add-record`          | Add journal entry (writes to DB + blockchain)     |
| GET    | `/api/v1/verify-record/:id`   | Verify a journal entry has not been tampered with |

### Admin

| Method | Endpoint                     | Description                      |
| ------ | ---------------------------- | -------------------------------- |
| POST   | `/api/v1/add-provider`       | Create provider account          |
| POST   | `/api/v1/authorize-provider` | Authorize provider on blockchain |
| POST   | `/api/v1/revoke-provider`    | Revoke provider on blockchain    |

---
