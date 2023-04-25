// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BuildingContract is ERC721 {
    Flat public EMPTY_FLAT;
    // string public name;
    mapping(address => uint256) numFlatOwned;
    mapping(address => mapping(uint256 => Flat)) flatsOwnedByAddress; 
    mapping(address => mapping(string => uint256)) mappingByIndex;

    mapping(string => mapping(string => Flat)) mappingAddressToFlat; 

    mapping(string => uint256) temp;
    mapping(uint256 => Building) buildings;
    mapping(string => Building) buildingsName;
    mapping(string => mapping(string => uint256)) mappings;
    mapping(string => mapping(uint256 => Building)) addressToBuilding;
    mapping(string => uint256) addressToCount;
    uint256 public numOfBuildings;

    event Buy(
        address indexed owner,
        uint256 price,
        uint256 timestamp,
        string flat
    );

    struct FlatInfo {
        string propertyType;
        uint256 buildingAge;
        uint256 baths;
        uint256 parking;
        bool furnished;
        bool pets;
    }

    struct Flat {
        address owner;
        string unit;
        uint256 price;
        uint256 duration;
        uint256 area;
        uint256 room;
        bool vacant;
        FlatInfo info;
    }

    struct Building {
        address owner;
        string name;
        string homeAddress;
        uint256 duration;
        uint256 available;
        uint256 taken;
        uint256 numFlats;
        Flat[] flats;
    }

    constructor() ERC721("MyNFT","nft") {
        numOfBuildings = 0;
    }

    modifier notContract(address _sender) {
        uint256 size;
        assembly {
            size := extcodesize(_sender)
        }

        require(size == 0, "Cannot send from a smart contract.");
        _;
    }

    modifier validETH() {
        require(msg.value > 0, "Amount must be greater than 0");
        _;
    }

    function createBuilding(
        string memory _name,
        string memory _homeAddress
    ) public {
        Building storage b = buildings[numOfBuildings];

        b.owner = msg.sender;
        b.name = _name;
        b.homeAddress = _homeAddress;
        b.numFlats = 0;
        b.available = 0;
        b.taken = 0;

        temp[_name] = numOfBuildings++;
        addressToBuilding[_homeAddress][addressToCount[_homeAddress]++] = b;
        buildingsName[b.name] = b;
    }

    function createFlat(
        string memory _buildingName,
        string memory _unit,
        uint256 _price,
        uint256 _duartion,
        uint256 _area,
        uint256 _room,
        FlatInfo memory _info
    ) public {
        uint256 index = temp[_buildingName];

        Building storage b = buildingsName[_buildingName];
        Building storage b1 = buildings[index];

        Flat memory flat = Flat(
            msg.sender,
            _unit,
            _price,
            _duartion,
            _area,
            _room,
            true,
            _info
        );
        
        b1.flats.push(flat);
        b.flats.push(flat);

        b.available++;
        b1.available++;

        mappingAddressToFlat[_buildingName][_unit] = flat;

        mappings[b.name][_unit] = b.numFlats++;
        flatsOwnedByAddress[msg.sender][numFlatOwned[msg.sender]] = flat;
        mappingByIndex[msg.sender][flat.unit] = numFlatOwned[msg.sender]++;
    }

    function buyFlat(
        string memory building,
        string memory flat
    ) public payable notContract(msg.sender) validETH returns (bool) {
        uint256 index = temp[building];

        Building storage b = buildingsName[building];
        Building storage b1 = buildings[index];
        Flat storage f = b.flats[mappings[building][flat]];

        require(msg.sender.balance >= f.price, "Insufficient ETH balance.");
        require(
            msg.value == f.price,
            "Amount of ETH send does not match the amount specified."
        );

        (bool success, ) = payable(f.owner).call{value: msg.value}("");

        if (!success) return success;

        f.vacant = false;
        --b.available;
        ++b.taken;
        --b1.available;
        ++b1.taken;

        emit Buy(msg.sender, f.price / 1 ether, block.timestamp, flat);

        mappingAddressToFlat[building][flat].unit = "";
        mappingAddressToFlat[building][flat] = f;

        uint256 i = mappingByIndex[f.owner][f.unit];
        flatsOwnedByAddress[f.owner][i].unit = "";
        _safeMint(msg.sender,numFlatOwned[msg.sender]);
        flatsOwnedByAddress[msg.sender][numFlatOwned[msg.sender]++] = f;
        return success;
    }

    function getBuildings(
        string memory _address
    ) public view returns (Building[] memory) {
        uint256 num = addressToCount[_address];
        Building[] memory buildings = new Building[](num);

        for (uint i = 0; i < num; ++i) {
            buildings[i] = addressToBuilding[_address][i];
        }

        return buildings;
    }

    function getAllBuildings() public view returns (Building[] memory) {
        Building[] memory allBuildings = new Building[](numOfBuildings);

        for (uint i = 0; i < numOfBuildings; ++i) {
            allBuildings[i] = buildings[i];
        }

        return allBuildings;
    }

    function getFlats(
        string memory _buildingName
    ) public view returns (Flat[] memory) {
        return buildingsName[_buildingName].flats;
    }

    function getNumOfNFTs(address _address) public view returns (uint256) {
        return balanceOf(_address);
    }

    function readNFT(string memory _building, string memory _flat) public view returns (Flat memory) {
        Flat memory flat = mappingAddressToFlat[_building][_flat];
        require(flat.owner == msg.sender, "not Onwer");
        return flat;
    }

    
}
