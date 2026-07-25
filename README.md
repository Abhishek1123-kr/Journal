# Midnight Private Voting & Journal DApp (Level 3 Challenge)

![CI/CD Pipeline](https://github.com/Abhishek1123-kr/Journal/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Network: Preprod](https://img.shields.io/badge/Midnight-Preprod%20Testnet-7F00FF)

> A production-grade, privacy-first decentralized application built on the Midnight Network. Implements a **Private Voting & Anonymous Journaling System** with Zero-Knowledge proof assertions, selective disclosure, automated CI/CD testing, and modern Framer Motion UI/UX.

🌐 **Live Demo**: [https://journal-six-wheat.vercel.app](https://journal-six-wheat.vercel.app)
📁 **GitHub Repository**: [https://github.com/Abhishek1123-kr/Journal](https://github.com/Abhishek1123-kr/Journal)

---

## Approved Level 3 Proposal

**Selected Idea**: **Private Voting System & Anonymous Journaling** (Option from Midnight Provided List)

### Core Mechanics
- **Anonymous Ballots & Entries**: Users create encrypted/disclosed entries or votes.
- **On-Chain Public State**: The smart contract records the entry state (`VACANT` / `OCCUPIED`), message, incrementing anti-replay sequence counter, and one-way public key commitment (`owner = publicKey(secretKey, sequence)`).
- **Authorized ZK Deletion / TakeDown**: Authors verify entry ownership via Zero-Knowledge circuit assertion (`takeDown`) proving key possession without exposing their private secret key to validators or public observers.

---

## Automated Test Results (9 Passing Vitest Tests)

| Test Suite File | Layer | Test Cases | Status |
|-----------------|-------|------------|--------|
| `bboard.test.ts` | Compact Contract Simulator | State Initialization (`VACANT`, sequence = 1) | ✅ PASS |
| `bboard.test.ts` | Compact Contract Simulator | Deterministic Ledger Generation | ✅ PASS |
| `bboard.test.ts` | Compact Contract Simulator | Message Posting & ZK Public Key Derivation | ✅ PASS |
| `bboard.test.ts` | Compact Contract Simulator | Authorized TakeDown & Anti-Replay Counter Increment | ✅ PASS |
| `bboard.test.ts` | Compact Contract Simulator | Consecutive Post & TakeDown Lifecycle | ✅ PASS |
| `bboard.test.ts` | Compact Contract Simulator | Multi-User Post Transition | ✅ PASS |
| `bboard.test.ts` | Compact Contract Simulator | Anti-Double Post Assertion Failure (`toThrow`) | ✅ PASS |
| `bboard.test.ts` | Compact Contract Simulator | Multi-User Double Post Guard (`toThrow`) | ✅ PASS |
| `bboard.test.ts` | Compact Contract Simulator | Unauthorized TakeDown Guard (`toThrow`) | ✅ PASS |

```bash
# Run test suite across workspace
npm run test
```

---

## Privacy Model & Selective Disclosure

### 1. What is Public (On-Chain Ledger State)
- `state`: Current entry status (`VACANT` or `OCCUPIED`).
- `message`: Active entry/proposal text (disclosed on-chain when posted).
- `sequence`: Anti-replay counter incremented with each transaction.
- `owner`: 32-byte Zero-Knowledge derived public key commitment (`persistentHash([pad(32, "journal:pk:"), sequence, secretKey])`).

### 2. What Remains Private (Local Client Witness)
- `localSecretKey`: A 32-byte cryptographically secure random key stored only in the user's local private state provider.
- **Witness Memory**: Pre-image parameters passed to the local Compact prover.

### 3. What Observers Can & Cannot Learn

| What Observers CAN Learn | What Observers CANNOT Learn |
|--------------------------|-----------------------------|
| Active entry state (`VACANT` / `OCCUPIED`) | User's 32-byte private secret key (`localSecretKey`) |
| Total number of transaction sequence updates | Link between on-chain public key and user's wallet address |
| Publicly posted entry text | Un-posted draft messages or local witness memory |
| ZK hash commitment owner value | Identity of voter/author beyond ZK circuit proof verification |

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
