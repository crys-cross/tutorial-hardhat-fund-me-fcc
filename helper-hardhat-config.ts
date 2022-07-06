export interface networkConfigItem {
    ethUsdPriceFeed?: string
    blockConfirmations?: number
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one is ETH/USD contract on Kovan
    kovan: {
        ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
        blockConfirmations: 6,
      },
    rinkeby: {
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
        blockConfirmations: 6
    },
    polygon: {
        ethUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
        blockConfirmations: 6
    },
}

export const developmentChains = ["hardhat", "localhost"]
export const DECIMALS = 8
export const INITIAL_ANSWER = 200000000000