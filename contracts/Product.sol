//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Product is Ownable{
    enum status
    {fake,
    unsold,
    sold
      }

    mapping(bytes32 => status ) public productDetail;


    modifier productSold(uint _productNumber){
    require(productDetail[hash(_productNumber)]==status.unsold,"Products has already been sold");
        _;
    }

    modifier productExit(uint _productNumber){
    require(productDetail[hash(_productNumber)]!=status.fake,"Products doesn't exits");
        _;
    }

   function hash(uint _string) public pure returns(bytes32) {
          return keccak256(abi.encodePacked(_string));}

    function renounceOwnership() public override{
    }

    function getInfoOfProduct(uint _productNumber) public view returns(status) {
        return(productDetail[hash(_productNumber)]);
    }

     function registerProduct(uint _productNumber) public onlyOwner{
        productDetail[hash(_productNumber)]=status.unsold;
    }

    function buy(uint _productNumber) public productExit(_productNumber) productSold(_productNumber) {
        productDetail[hash(_productNumber)]=status.sold;
    }

}