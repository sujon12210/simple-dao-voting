// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        address creator;
    }

    // Array of all proposals
    Proposal[] public proposals;

    // Mapping: proposalId => (voterAddress => hasVoted)
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 id, string description, address creator);
    event Voted(uint256 proposalId, address voter);

    function createProposal(string memory _description) external {
        proposals.push(Proposal({
            id: proposals.length,
            description: _description,
            voteCount: 0,
            creator: msg.sender
        }));
        emit ProposalCreated(proposals.length - 1, _description, msg.sender);
    }

    function vote(uint256 _proposalId) external {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        require(!hasVoted[_proposalId][msg.sender], "Already voted on this");

        hasVoted[_proposalId][msg.sender] = true;
        proposals[_proposalId].voteCount++;

        emit Voted(_proposalId, msg.sender);
    }

    function getProposalsCount() external view returns (uint256) {
        return proposals.length;
    }
    
    // Helper to get all proposals in one call (for UI simplicity)
    function getAllProposals() external view returns (Proposal[] memory) {
        return proposals;
    }
}
