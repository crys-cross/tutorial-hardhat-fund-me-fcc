/* compnonents */
// import
// main function
// calling of main function
 
import { getNamedAccounts, deployments, network } from "hardhat"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { verify } from "../utils/verify"
/* alternative syntax below */
// function deployfunc(hre) {
//     console.log("Hi!")
// }
// module.exports.default =deployfunc
/* longer versionn below */
// module.exports = async (hre) => {
//     const { getNamedAccounts, deployements } = hre }
/*same as below */
// hre.getNamedAccounts
// hre.deployements
/* shortest version below */
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    //if chainId is X use address Y
    //if chainId is Z use addres A

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"

    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    //if contracts doesn't exist, we deploy a minimal version of it for our local testing
    //what happens when we change chains?
    //when going localhost or hardhat network we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}

module.exports.tags = ["all", "fundme"]
