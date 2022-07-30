import fs from "fs"
import { ethers, network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"

const frontEndContractsFile = "../practice-nextjs-fund-me-fcc/constants/contractAddresses.json"
const frontEndAbiFile = "../practice-nextjs-fund-me-fcc/constants/abi.json"

const updateUI: DeployFunction = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating Front End")
        updateContractAddresses()
        updateAbi()
    }
}
const updateContractAddresses = async () => {
    const fundMe = await ethers.getContract("FundMe")
    const chainId = network.config.chainId!.toString()
    const currentAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (chainId in currentAddresses) {
        if (!currentAddresses[chainId].includes(fundMe.address)) {
            currentAddresses[chainId].push(fundMe.address)
        }
    } else {
        currentAddresses[chainId] = [fundMe.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(currentAddresses))
    console.log("Front end written!")
}
const updateAbi = async () => {
    const fundMe = await ethers.getContract("FundMe")
    fs.writeFileSync(
        frontEndAbiFile,
        fundMe.interface.format(ethers.utils.FormatTypes.json).toString()
    )
}

export default updateUI
updateUI.tags = ["all", "frontend"]
