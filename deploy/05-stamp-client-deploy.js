require("hardhat-deploy")
require("hardhat-deploy-ethers")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy, get } = deployments;
    const timeLock = await get("TimeLock")

    const stamp = await deploy("Stamp", {
        from: wallet.address,
        args: [],
        log: true,
    });

    //Transfer Ownership to TimeLock.sol
    //Comment this out after deploying the first time
    console.log("Transferring Stamp Owner to TimeLock.sol")
    const stampContract = await ethers.getContractAt("Stamp", stamp.address)
    const transferOwnerTx = await stampContract.transferOwnership(timeLock.address);
    await transferOwnerTx.wait();
    console.log("Ownership transferred");
}