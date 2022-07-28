import {getNamedAccounts, ethers } from "hardhat"

const fund = async () => {
    const { deployer } = await getNamedAccounts()
    console.log(deployer)
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log(`Got contract FundMe at ${fundMe.address}`)
    console.log("Funding Contract...")
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.05"),
    })
    await transactionResponse.wait(1)
    console.log("Funded!")
}

fund()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
