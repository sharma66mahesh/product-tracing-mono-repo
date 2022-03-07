//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Product is Ownable{
    struct Item{
        uint manufacturedDate;
        uint productNumber;
        bool isSold;
    }
    event Sold(uint productNumber, bool sold);
    mapping(uint => Item) public productDetail;

    modifier productExit(uint _productNumber){
    require(productDetail[_productNumber].productNumber==_productNumber && productDetail[_productNumber].isSold==false,"Products doesn't exits");
        _;
    }

    function renounceOwnership() public override{
    }

    function getInfoOfProduct(uint _productNumber) public view productExit(_productNumber) returns(bool) {
        return(productDetail[_productNumber].isSold);
    }

    function registerProduct(uint _manufactureDate, uint _productNumber) public onlyOwner{
        productDetail[_productNumber]=Item(_manufactureDate,_productNumber,false);
    }

    function buy(uint _productNumber) public productExit(_productNumber) {
        productDetail[_productNumber].isSold=true;
    }
}