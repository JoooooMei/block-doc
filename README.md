# BlockDoc

A medical journal system that writes records to both MongoDB and a blockchain simultaneously, with a subgraph for indexing on-chain events.

Each journal entry is hashed (HMAC-SHA256) and written to the blockchain. The hash is cryptographically bound to the MongoDB document.

The backend recomputes the hash from the raw data in MongoDB and checks it against the indexed subgraph. If hashes match, everything is fine! If not, data entries have been tampered with.

## Architecture

| Layer                  | Technology                       |
| ---------------------- | -------------------------------- |
| Smart Contracts        | Solidity 0.8.28, OpenZeppelin    |
| Blockchain Dev         | Hardhat 3                        |
| Indexing               | The Graph (local graph-node)     |
| Backend                | Express.js, Node.js (ES modules) |
| Database               | MongoDB + Mongoose               |
| Blockchain Interaction | ethers.js v6                     |
| Frontend               | React 19, Vite                   |

---

## Prerequisites

- Node.js
- Docker + Docker Compose
- MongoDB running locally

---

## Setup

### 1. Install dependencies

```bash
cd blockchain && npm install
cd ../backend && npm install
cd ../client && npm install
cd ../subgraph && npm install
```

### 2. Create config files

These are gitignored and must be created manually.

**`backend/config/config.env`:**

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/BlockDoc
CONTRACT_ADDRESS=          # fill in after deploying the contract (step 5)
HASH_PATIENT_SECRET=       # pick a long secret string
HASH_VERSION=v1
RPC_URL=http://127.0.0.1:8545
SUBGRAPH_URL=http://localhost:8000/subgraphs/name/blockdoc
PRIVATE_KEY=           # private key of the wallet that deploys the contract and signs transactions
                       # for local dev, use any of the accounts printed by "npx hardhat node"
```

### 3. Start Docker infrastructure

From the project root:

```bash
docker compose up
```

Starts graph-node, IPFS, and Postgres.

### 4. Start Hardhat node

```bash
cd blockchain && npx hardhat node
```

### 5. Deploy contract

```bash
cd blockchain
npx hardhat ignition deploy ignition/modules/BlockDoc.ts --network localhost
```

Copy the contract address from the output and update two files:

- `backend/config/config.env` => `CONTRACT_ADDRESS`
- `subgraph/subgraph.yaml` => `source.address`

### 6. Start backend

```bash
cd backend && npm run dev
```

### 7. Deploy subgraph

```bash
cd subgraph
npm run create-local
npm run deploy-local
```

Subgraph will be available at:

- GraphQL playground: `http://localhost:8000/subgraphs/name/blockdoc/graphql`
- Query endpoint: `http://localhost:8000/subgraphs/name/blockdoc`

### 8. Start frontend

```bash
cd client && npm run dev
```

---

## API Endpoints

see backend/README.md
