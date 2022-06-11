///* compnonents */
//// import
//// main function
//// calling of main function
//// const { network } = require("hardhat")
//// const {networkConfig, developmentChains} = require("../helper-hardhat-config")

///* alternative below */
//// const helperConfig = require("../helper-hardhat-config")
//// const networkConfig = helperConfig.networkConfig

///* alternative syntax below */
//// function deployfunc(hre) {
////     console.log("Hi!")
//// }

//// module.exports.default =deployfunc

///* longer versionn below */
//// module.exports = async (hre) => {
////     const { getNamedAccounts, deployements } = hre }
///*same as below */
//// hre.getNamedAccounts
//// hre.deployements
///* shortest version below */

// module.exports = async ({getNamedAccounts, deployments}) => {
//     const {deploy, log} = deployments
//     const {deployer} = await getNamedAccounts
//     const chainId = network.config.chainId

////if chainId is X use address Y
////if chainId is Z use addres A

//// const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"

//     let ethUsdPriceFeedAddress
//     if (developmentChains.includes(network.name)) {
//         const ethUsdAggregator = await deployments.get("MockV3Aggregator")
//         ethUsdPriceFeedAddress = ethUsdAggregator.address
//     } else {
//         ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
//     }

////if contracts doesn't exist, we deploy a minimal version of it for our local testing

////what happens when we change chains?
////when going localhost or hardhat network we want to use a mock

///*error code starts here*/
//     const fundMe = await deploy("FundMe", {
//         from: deployer,
//         args: [ethUsdPriceFeedAddress],
//         log: true,
//         // we need to wait if on a live network so we can verify properly
//         waitConfirmations: network.config.blockConfirmations || 1,
//     })
//     log(`FundMe deployed at ${fundMe.address}`)
// }
// module.exports.tags = ["all", "fundme"]
//

const { getNamedAccounts, deployments, network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
// const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    // if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     await verify(fundMe.address, [ethUsdPriceFeedAddress])
    // }
}

module.exports.tags = ["all", "fundme"]
