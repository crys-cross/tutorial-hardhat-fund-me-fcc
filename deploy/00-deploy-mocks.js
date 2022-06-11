const { network } = require("hardhat")
const {developmentChains, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config")

// const DECIMALS = "8"
// const INITIAL_PRICE = "200000000000" // 2000
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // const chainId = network.config.chainId
    // If we are on a local develohelppment network, we need to deploy mocks!
    // if (chainId == 31337) {
    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks Deployed!")
        log("------------------------------------------------")
    }
}

/*TypeError: Cannot read properties of undefined (reading 'length') */
// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const {deploy, log} = deployments
//     const {deployer} = await getNamedAccounts

//     if (developmentChains.includes(network.name)) {
//         log("Local network detected! Deploying mocks...")
//         await deploy("MockV3Aggregator", {
//             contract: "MockV3Aggregator",
//             from: deployer,
//             log: true,
//             args: [DECIMALS, INITIAL_ANSWER], 
//         })
//         log("Mocks deployed!")
//         log("-------------------------------------------")
//     }
// }

module.exports.tags = [ "all", "mocks"]