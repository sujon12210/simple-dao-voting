// PASTE DEPLOYED ADDRESS HERE
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";

const ABI = [
    "function createProposal(string description) external",
    "function vote(uint256 proposalId) external",
    "function getAllProposals() external view returns (tuple(uint256 id, string description, uint256 voteCount, address creator)[])",
    "function hasVoted(uint256, address) external view returns (bool)"
];

let provider, signer, contract;

const connectBtn = document.getElementById("connectBtn");
const createBtn = document.getElementById("createBtn");
const container = document.getElementById("proposalContainer");

async function init() {
    if(!window.ethereum) return alert("Please install MetaMask");
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const addr = await signer.getAddress();
    connectBtn.innerText = "Connected: " + addr.substring(0,4) + "..." + addr.substring(38);
    createBtn.disabled = false;
    
    loadProposals();
}

async function loadProposals() {
    container.innerHTML = "Loading...";
    try {
        const proposals = await contract.getAllProposals();
        const voterAddress = await signer.getAddress();
        
        container.innerHTML = "";
        
        // Reverse loop to show newest first
        for(let i = proposals.length - 1; i >= 0; i--) {
            const p = proposals[i];
            const voted = await contract.hasVoted(p.id, voterAddress);
            
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="card-header">
                    <span class="id">#${p.id}</span>
                    <span class="votes">Votes: ${p.voteCount}</span>
                </div>
                <p class="desc">${p.description}</p>
                <button onclick="castVote(${p.id})" ${voted ? 'disabled' : ''} class="${voted ? 'done' : ''}">
                    ${voted ? 'Voted' : 'Vote Yes'}
                </button>
            `;
            container.appendChild(card);
        }
    } catch(e) {
        container.innerHTML = "Error loading data.";
        console.error(e);
    }
}

window.castVote = async (id) => {
    try {
        const tx = await contract.vote(id);
        createBtn.innerText = "Voting...";
        await tx.wait();
        createBtn.innerText = "Submit";
        loadProposals();
    } catch(e) {
        alert("Error: " + e.message);
    }
};

createBtn.onclick = async () => {
    const desc = document.getElementById("descInput").value;
    if(!desc) return;
    try {
        const tx = await contract.createProposal(desc);
        createBtn.innerText = "Mining...";
        await tx.wait();
        document.getElementById("descInput").value = "";
        createBtn.innerText = "Submit";
        loadProposals();
    } catch(e) { console.error(e); }
};

connectBtn.onclick = init;
