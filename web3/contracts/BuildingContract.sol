// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BuildingContract {
    string public name;
    mapping(uint256 => Building) buildings;
    mapping(string => Building) buildingsName;
    uint256 public numOfBuildings;

    struct Flat {
        string name;
    }

    struct Building {
        address owner;
        string name;
        string homeAddress;
        uint256 duration;
        uint256 price;
        uint256 avalible;
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
        Building storage b = buildings[numOfBuildings];

        b.owner = msg.sender;
        b.name = _name;
        b.homeAddress = _homeAddress;
        b.duration = _duration;
        b.price = _price;
        b.numFlats = 0;
        b.avalible = 0;
        b.taken = 0;

        buildingsName[b.name] = b;
        numOfBuildings++;
    }

    function createFlat(
        string memory _buildingName,
        string memory _flatName
    ) public {
        Building storage b = buildingsName[_buildingName];

        Flat memory flat = Flat(_flatName);

        b.flats.push(flat);

        b.numFlats++;
        b.avalible++;
    }

    function getBuildings() public view returns (Building[] memory) {
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
