// import
// main function
// calling of main function

const { network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")
const { network } = require("hardhat")
/* alternative below */
// const helperConfig = require("../helper-hardhat-config")
// const networkConfig = helperConfig.networkConfig

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
module.exports = async ({ getNamedAccounts, deployements }) => {
    const {deploy. log} = deployements
    const {deployer} = await getNamedAccounts
    const chainId = network.config.chainId

    //if chainId is X use address Y
    //if chainId is Z use addres A

    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    
    //if contracts doesn't exist, we deploy a minimal version of it for our local testing

    //what happens when we change chains?
    //when going localhost or hardhat network we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [], //put price feed address here
        log: true,
    } )

}