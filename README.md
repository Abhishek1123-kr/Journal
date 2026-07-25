# Midnight Journal DApp

> A private, zero-knowledge journaling application built on the Midnight Network, allowing users to securely record, verify, and manage personal journal entries on-chain without revealing private secret keys.

🌐 **Live Demo**: [https://journal-six-wheat.vercel.app](https://journal-six-wheat.vercel.app)

---

## Contract Address

| Network | Contract Address |
|---------|------------------|
| Preprod | `<YOUR_DEPLOYED_CONTRACT_ADDRESS>` |

```env
CONTRACT_ADDRESS=<YOUR_DEPLOYED_CONTRACT_ADDRESS>
```

> [!IMPORTANT]
> The smart contract deployment step was intentionally skipped in this repository per challenge rules. After deploying your contract using the command below, replace `<YOUR_DEPLOYED_CONTRACT_ADDRESS>` in this file and across the application configuration files.

---

## Features

- 🔒 **Zero-Knowledge Privacy**: Personal secret keys held strictly client-side via local witnesses.
- ✍️ **Private Journal Posting**: Create encrypted/disclosed entry posts with ZK-derived public key commitments.
- 🗑️ **Authorized Entry Removal**: Prove entry ownership in ZK without exposing private secret keys on-chain.
- ⚡ **Full-Stack Integration**: Complete TypeScript contract wrapper API (`@midnight-ntwrk/journal-api`), CLI interface (`@midnight-ntwrk/journal-cli`), and React web dashboard (`@midnight-ntwrk/journal-ui`).
- 🌐 **Lace Wallet Connector**: Direct browser wallet integration using Midnight DApp Connector API.

---

## What This Project Does

Midnight Journal is a privacy-first decentralized journaling application. When a user posts a journal entry to the Midnight Network, the underlying Compact smart contract (`journal.compact`) creates an on-chain ledger record containing the public state (`VACANT` or `OCCUPIED`), message content, an anti-replay sequence counter, and a ZK-derived owner public key.

When the author wishes to delete or update their entry, the contract executes a Zero-Knowledge circuit assertion (`takeDown`) verifying that the caller possesses the matching private secret key corresponding to `owner`, without ever revealing the secret key to the ledger, validators, or third parties.

---

## Privacy Model

### Public Information (On-Chain Ledger State)
- `state`: Current journal entry availability state (`VACANT` or `OCCUPIED`).
- `message`: Active entry text (disclosed on-chain when posted).
- `sequence`: Anti-replay entry counter incremented with each transaction.
- `owner`: 32-byte Zero-Knowledge derived public key commitment (`persistentHash([pad(32, "journal:pk:"), sequence, secretKey])`).

### Private Information (Client-Side Witness)
- `localSecretKey`: A 32-byte cryptographically secure random key stored only in the user's local private state provider.

### What Users Prove Without Revealing
- **Ownership Verification**: Users prove in ZK that they hold the private secret key matching the on-chain `owner` commitment without disclosing `localSecretKey`.
- **State Transition Validity**: Users prove that state transitions obey contract assertions (e.g. attempting removal only when occupied by the author).

---

## Tech Stack

- **Smart Contract Language**: Compact (`pragma language_version 0.23;`)
- **Zero-Knowledge Proofs**: Midnight Proof Server & ZKIR key material
- **Blockchain Framework**: Midnight Network (`@midnight-ntwrk/midnight-js-*`)
- **Frontend Framework**: React 19, TypeScript, Material-UI (MUI), Vite
- **Wallet Connector**: Midnight Lace Wallet DApp Connector API (`@midnight-ntwrk/dapp-connector-api`)
- **API & CLI**: Node.js v24+, TypeScript, RxJS, Pino logging

---

## Folder Structure

```
d:\workshop\demo/
├── contract/              # Compact smart contract source and ZK compilation target
│   ├── src/
│   │   ├── journal.compact # Compact smart contract file
│   │   ├── index.ts        # Contract exports & ZK asset mapping
│   │   ├── witnesses.ts    # ZK witness functions & private state types
│   │   └── managed/        # Generated ZK keys, ZKIR files, & TypeScript interfaces
│   └── package.json
├── api/                   # High-level TypeScript client API
│   ├── src/
│   │   ├── index.ts        # JournalAPI implementation (deploy, join, post, takeDown)
│   │   └── common-types.ts # Shared types & state interfaces
│   └── package.json
├── bboard-ui/             # React web UI frontend
│   ├── src/
│   │   ├── App.tsx         # Main application container
│   │   └── contexts/       # Browser manager & wallet provider contexts
│   ├── index.html
│   └── package.json
├── bboard-cli/            # Command-Line Interface tool
│   ├── src/
│   │   └── index.ts        # Interactive terminal prompts & contract runner
│   └── package.json
├── README.md              # Project documentation
└── package.json           # Workspace root configuration
```

---

## Prerequisites

- **Node.js**: v22.x or v24.x installed (`node -v`)
- **Docker**: Docker Desktop installed and running (`docker info`)
- **Compact Compiler**: Installed via `@midnight-ntwrk/compact-compiler` or pre-built binaries
- **Midnight Proof Server**: Pulled and running on port 6300 (`docker run -p 6300:6300 midnightnetwork/proof-server`)
- **Midnight Lace Wallet**: Installed as a browser extension (configured for Preprod network)

---

## Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd demo
   ```

2. Install root workspace dependencies:
   ```bash
   npm install
   ```

3. Install workspace package dependencies:
   ```bash
   cd api && npm install && cd ..
   cd contract && npm install && cd ..
   cd bboard-cli && npm install && cd ..
   cd bboard-ui && npm install && cd ..
   ```

---

## Compile

Compile the Compact smart contract (`journal.compact`):

```bash
npm run compact
```

This compiles `contract/src/journal.compact` into `./src/managed/journal` generating ZK circuit definitions, TypeScript types, and ZKIR key assets.

---

## Build

Build all workspace packages (contract, API, CLI, and Web UI):

```bash
npm run build
```

Alternatively, build individual packages:

```bash
npm run build --workspace=contract
npm run build --workspace=api
npm run build --workspace=bboard-cli
npm run build --workspace=bboard-ui
```

---

## Manual Deployment

As required by Level 1 challenge rules, contract deployment is intentionally skipped in this initial setup.

To deploy your compiled Compact contract to the Midnight Preprod network, execute:

```bash
NODE_OPTIONS="--max-old-space-size=12288" npm run deploy -- --network preprod
```

Wait for the deployment transaction to finish. The CLI / script will return your newly deployed **Contract Address**.

---

## After Deployment

After receiving your deployed contract address, complete the following manual backfill steps:

1. Copy your deployed contract address (e.g. `0x1234...5678`).
2. Open `README.md`, `bboard-ui/src/contexts/BrowserDeployedBoardManager.ts`, `api/src/index.ts`, and `.env` files.
3. Replace every occurrence of:
   ```
   <YOUR_DEPLOYED_CONTRACT_ADDRESS>
   ```
   with your actual deployed contract address.
4. Launch the frontend UI (`cd bboard-ui && npm run dev`) or CLI (`cd bboard-cli && npm run preprod-remote`) to interact with your live Midnight contract!

---

## Environment Variables

| Variable Name | Description | Default / Example Value |
|---------------|-------------|-------------------------|
| `CONTRACT_ADDRESS` | Deployed Midnight Compact contract address | `<YOUR_DEPLOYED_CONTRACT_ADDRESS>` |
| `VITE_NETWORK_ID` | Midnight network identifier | `preprod` |
| `PROOF_SERVER_URI` | Midnight Proof Server endpoint | `http://localhost:6300` |
| `INDEXER_URI` | Midnight Indexer GraphQL HTTP endpoint | `https://indexer.preprod.midnight.network/api/v1/graphql` |
| `INDEXER_WS_URI` | Midnight Indexer WebSocket endpoint | `wss://indexer.preprod.midnight.network/api/v1/graphql/ws` |

---

## Screenshots

*(Add screenshots of your running DApp here after deploying and launching the Web UI)*

![Midnight Journal Dashboard](https://via.placeholder.com/800x450?text=Midnight+Journal+Dashboard)

---

## Initial Idea

The initial idea submitted for the Rise In Level 1 Challenge: **journal** (A decentralized Zero-Knowledge personal journaling application built on Midnight Network).

---

## Troubleshooting

- **Proof Server Connection Failed**: Ensure Docker is running and proof server container is active on port 6300 (`docker run -p 6300:6300 midnightnetwork/proof-server`).
- **Wallet Not Detected**: Verify Midnight Lace Wallet extension is enabled in your browser and set to `Preprod` network.
- **Node Memory Limit**: If encountering out-of-memory errors during deployment, set `NODE_OPTIONS="--max-old-space-size=12288"`.
