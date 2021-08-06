pragma solidity >=0.7.0 <0.9.0;

contract Tracing{
    address owner;
    mapping (uint=>address) product_to_address;
    address buyeraddress;
    // Product struct datatype for storing info about Product
    struct Product{
        //address buyeraddress;
        bool exchange;
        uint product_no;
        uint data_of_manufacture;
    }
    
    // keeping info about seller
    struct Seller{
        address selleraddress;
        uint currentproduntno;
        Product product;
    }
    
    // so that only manufacturer can only register the product
    constructor(){
        owner=msg.sender;
    }
    
    modifier isOwner{
        require(owner==msg.sender);
        _;
    }
    
    // to check whether the product of given info is found in blockchain or not
    modifier isProduct(Product memory _product) {
        
        _;
    }
    
    // to register the product being manufacturer only 
    function registerProduct(Product memory _product) public isOwner{
        
        
    }
    
    // for transfer a product to buyer requesting it to transfer
    function exchange(address _buyeraddress, address _selleraddress, Product memory _product) public isProduct(_product) returns(bool){
        
    }
    
    
    
}
