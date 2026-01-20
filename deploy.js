const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.deployed();

  console.log("Voting Contract deployed to:", voting.address);
  console.log("Copy this address into app.js!");
  
  // Create a dummy proposal for testing
  await voting.createProposal("Proposal #1: Should we launch a token?");
  console.log("Seeded with Proposal #1");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
