# Simple DAO Voting

A decentralized ballot box. This repository implements a flat-file voting dApp where every vote is recorded on the Ethereum blockchain, making the results tamper-proof and verifiable by anyone.

## 🗳️ Features
- **Proposal Creation**: Any user can submit a topic for voting.
- **One-Person-One-Vote**: Smart contract prevents double voting per proposal.
- **Real-Time Tally**: Vote counts are read directly from the chain.
- **Anonymity**: Votes are linked to addresses, not names.

## ⚙️ How it Works
1. **Deploy** the `Voting.sol` contract.
2. **User A** creates a proposal (e.g., "Should we buy Bitcoin?").
3. **User B** connects their wallet and clicks "Vote".
4. **The Blockchain** increments the counter and marks User B as "Voted".

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
