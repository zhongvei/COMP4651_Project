// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BuildingContract {
    string public name;
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

    struct Flat {
        string unit;
        uint256 area;
        uint256 room;
        bool vacant;
    }

    struct Building {
        address owner;
        string name;
        string homeAddress;
        uint256 duration;
        uint256 price;
        uint256 available;
        uint256 taken;
        uint256 numFlats;
        Flat[] flats;
    }

    constructor(string memory _name) {
        name = _name;
        numOfBuildings = 0;
    }

    function createBuilding(
        string memory _name,
        string memory _homeAddress,
        uint256 _duration,
        uint256 _price
    ) public {
        Building storage b = buildings[numOfBuildings++];

        b.owner = msg.sender;
        b.name = _name;
        b.homeAddress = _homeAddress;
        b.duration = _duration;
        b.price = _price;
        b.numFlats = 0;
        b.available = 0;
        b.taken = 0;

        addressToBuilding[_homeAddress][addressToCount[_homeAddress]++] = b;
        buildingsName[b.name] = b;
    }

    function createFlat(
        string memory _buildingName,
        string memory _unit,
        uint256 _area,
        uint256 _room
    ) public {
        Building storage b = buildingsName[_buildingName];

        Flat memory flat = Flat(_unit, _area, _room, true);

        b.flats.push(flat);

        b.available++;

        mappings[b.name][_unit] = b.numFlats++;
    }

    function buyFlat(string memory building, string memory flat) public {
        Building storage b = buildingsName[building];
        Flat storage f = b.flats[mappings[building][flat]];

        f.vacant = false;
        --b.available;
        ++b.taken;

        emit Buy(msg.sender, b.price, block.timestamp, flat);
    }

    function getBuildings(
        string memory _address
    ) public view returns (Building[] memory) {
        uint256 num = addressToCount[_address];
        Building[] memory buildings = new Building[](num);

        for(uint i = 0 ; i < num ; ++i) {
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
}
