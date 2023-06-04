const { ethers } = require("hardhat");

const proposalsFile = "proposals.json"

const PROPOSAL_DESCRIPTION = "Proposal #1 Let Company XYZ sponsor our beers and we will broadcast the event details with its logo attached."

// can be ipns
const PROPOSAL_CONTENT_URI = 'https://ipfs.io/ipfs/QmPaPRAoY9ypAFFtnBhFVzTiBVgp1ZSgkg7xt2FE9Pyciy';


const networkConfig = {
    3141: {
        name: "Hyperspace",
    },
    314159: {
        name: "Calibrationnet",
    },
    314: {
        name: "FilecoinMainnet",
    },
}



module.exports = {
    networkConfig,
    proposalsFile,
    PROPOSAL_DESCRIPTION,
    PROPOSAL_CONTENT_URI
}
