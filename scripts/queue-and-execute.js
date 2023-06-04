const { ethers, network } = require("hardhat")
const {
  PROPOSAL_DESCRIPTION,
  PROPOSAL_CONTENT_URI } =
  require("../app-config")

async function queueAndExecute() {
  const args = [PROPOSAL_CONTENT_URI]
  const functionToCall = "stampWithContentUri"
  const stamp = await ethers.getContract("Stamp")
  const encodedFunctionCall = stamp.interface.encodeFunctionData(functionToCall, args)
  const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))
  // could also use ethers.utils.id(PROPOSAL_DESCRIPTION)

  const governor = await ethers.getContract("GovernorContract")
  console.log("Queueing...")
  const queueTx = await governor.queue([stamp.address], [0], [encodedFunctionCall], descriptionHash)
  await queueTx.wait(1)

  console.log("Executing...")
  // this will fail on a testnet because you need to wait for the MIN_DELAY!
  const executeTx = await governor.execute(
    [stamp.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )
  await executeTx.wait()
  console.log("Queued and Executed!")
}

queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
