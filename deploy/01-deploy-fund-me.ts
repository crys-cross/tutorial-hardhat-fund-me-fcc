/* compnonents */
// import
// main function
// calling of main function
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"
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
const deployFundMe: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const {getNamedAccounts, deployments, network} = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    //if chainId is X use address Y
    //if chainId is Z use addres A

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"

    let ethUsdPriceFeedAddress: string
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[network.name].ethUsdPriceFeed!
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
        waitConfirmations: networkConfig[network.name].blockConfirmations || 0,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}
export default deployFundMe
deployFundMe.tags = ["all", "fundme"]
