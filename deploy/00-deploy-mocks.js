const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployements }) => {
    const {deploy. log} = deployements
    const {deployer} = await getNamedAccounts
    const chainId = network.config.chainId
}