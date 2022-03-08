//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Product is Ownable{
    struct Item{
        uint manufacturedDate;
        uint productNumber;
        status status_type;
    }
    enum status
    {fake,
    unsold,
    sold
      }

    mapping(uint => Item) public productDetail;

    modifier productSold(uint _productNumber){
    require(productDetail[_productNumber].status_type==status.unsold,"Products has already been sold");
        _;
    }

    modifier productExit(uint _productNumber){
    require(productDetail[_productNumber].status_type!=status.fake,"Products doesn't exits");
        _;
    }

    function renounceOwnership() public override{
    }

    function getInfoOfProduct(uint _productNumber) public view productExit(_productNumber) returns(status) {
        return(productDetail[_productNumber].status_type);
    }

    function registerProduct(uint _manufactureDate, uint _productNumber) public onlyOwner{
        productDetail[_productNumber]=Item(_manufactureDate,_productNumber,status.unsold);
    }

    function buy(uint _productNumber) public productExit(_productNumber) productSold(_productNumber) {
        productDetail[_productNumber].status_type=status.sold;
    }
}