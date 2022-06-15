// SPDX-License-Identifier: MIT
/* STYLE GUIDE COMMENTS BELOW */
//1. Pragma
pragma solidity ^0.8.8;
//2. Imports
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";
//3. Error Code(use contract namebefore error name)
error FundMe__NotOwner();
error FundMe__SendMoreETH();

//4. Interfaces, Libraries, Contracts here

//5. Natspec below
/**
 *  @title a contract for crowd funding
 *  @author crys
 *  @notice This contract is to demo a sample funding contract
 *  @dev This implements price feeds as our library
 **/
contract FundMe {
    //6. Type declarations
    using PriceConverter for uint256;

    //7. State variables
    mapping(address => uint256) private addressToAmountFunded;
    address[] private sfunders;
    // Could we make this constant?  /* hint: no! We should make it immutable! */
    address private immutable i_owner;
    uint256 public constant MINIMUM_USD = 50 * 10**18;
    AggregatorV3Interface private priceFeed;
    //8. Modifiers
    modifier onlyOwner() {
        // require(msg.sender == i_owner);
        if (msg.sender != i_owner) revert FundMe__NotOwner();
        _;
    }

    // Funtions Order
    // constructor
    // recieve
    // fallback
    // external
    // public
    // internal
    // private
    // view/pure

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    //deleted receive and fallback since not necessary
    // receive() external payable {
    //     fund();
    // }

    // fallback() external payable {
    //     fund();
    // }

    function fund() public payable {
        /* Use new error below */
        // require(
        //     msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
        //     "You need to spend more ETH!"
        // );
        if (msg.value.getConversionRate(priceFeed) < MINIMUM_USD)
            revert FundMe__SendMoreETH();
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        addressToAmountFunded[msg.sender] += msg.value;
        sfunders.push(msg.sender);
    }

    // function getVersion() public view returns (uint256){
    //     AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    //     return priceFeed.version();
    // }

    function withdraw() public payable onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < sfunders.length;
            funderIndex++
        ) {
            address funder = sfunders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        sfunders = new address[](0);
        // // transfer
        // payable(msg.sender).transfer(address(this).balance);
        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        // call
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    function cheaperWithdraw() public payable onlyOwner {
        /*ERROR lenght */
        // address[] memory funders = sfunders;
        // // mappings can't be in memory
        // for (
        //     uint256 funderIndex = 0;
        //     funderIndex < funders.lenght;
        //     funderIndex++
        // ) {
        //     address funder = funders[funderIndex];
        //     addressToAmountFunded[funder] = 0;
        // }
        address[] memory funders = sfunders;
        // mappings can't be in memory, sorry!
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        sfunders = new address[](0);
        // payable(msg.sender).transfer(address(this).balance)
        /*ERROR not callable */
        // (bool success, ) = i_owner.call{value: address(this).balance("")};
        // require(success);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return sfunders[index];
    }

    function getaddressToAmountFunded(address funder)
        public
        view
        returns (uint256)
    {
        return addressToAmountFunded[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return priceFeed;
    }

    // Explainer from: https://solidity-by-example.org/fallback/
    // Ether is sent to contract
    //      is msg.data empty?
    //          /   \
    //         yes  no
    //         /     \
    //    receive()?  fallback()
    //     /   \
    //   yes   no
    //  /        \
    //receive()  fallback()
}

// Concepts we didn't cover yet (will cover in later sections)
// 1. Enum
// 2. Events
// 3. Try / Catch
// 4. Function Selector
// 5. abi.encode / decode
// 6. Hash with keccak256
// 7. Yul / Assembly

//test github push error
