import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { developmentChains, DECIMALS, INITIAL_ANSWER } from "../helper-hardhat-config"

// const DECIMALS = "8"
// const INITIAL_PRICE = "200000000000" // 2000
const deployMocks: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre
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
export default deployMocks
deployMocks.tags = ["all", "mocks"]
