const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  it("Should create proposals and accept votes", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    await voting.deployed();

    // Create Proposal
    await voting.createProposal("Prop 1");
    let props = await voting.getAllProposals();
    expect(props.length).to.equal(1);
    expect(props[0].voteCount).to.equal(0);

    // Vote
    await voting.vote(0);
    props = await voting.getAllProposals();
    expect(props[0].voteCount).to.equal(1);

    // Prevent Double Vote
    await expect(voting.vote(0)).to.be.revertedWith("Already voted on this");
  });
});
