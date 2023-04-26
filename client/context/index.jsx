import React, { createContext, useContext } from 'react'
import { useAddress, useContract, useMetamask } from '@thirdweb-dev/react'
import { ethers } from 'ethers';

const StateContext = createContext();

const REGIONS = ["Causeway Bay", "Wan Chai", "Tsim Sha Tsui", "Sai Kung", "Central"]
const BUILDINGS = [
    ["The Hayworth", "Park Haven", "Vienna Mansion"],
    ["Suncrest Tower", "Starlight Garden", "Rialto Building"],
    ["The Masterpiece", "Harbour Pinnacle", "The Austin Block"],
    ["The Giverny", "Muk Min Shan", "Villa Royale"],
    ["Glenealy Building", "The Gage", "Kingearn Building"]
]
const FLATS = ["A", "B", "C"];

const numFlats = 3;

const PROPERTY_TYPE = ['Studio', 'Condo', 'Loft',];

const generateFlatInfo = () => {
    const flatInfo = [
        PROPERTY_TYPE[Math.floor(Math.random() * PROPERTY_TYPE.length)], //random property type
        Math.floor(Math.random() * 10 + 1), //random number of building Age
        Math.floor(Math.random() * 1 + 1), //random number of toilet
        Math.floor(Math.random() * 1), //random number of parking
        Math.floor(Math.random() * 1), //bool for furnished condition
        Math.floor(Math.random() * 1), //bool for pets
    ]
    return flatInfo;
}


export const StateContextProvider = ({ children }) => {

    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS);

    // Address of your metamask
    const address = useAddress();

    // Connect to metamask function
    const connect = useMetamask();

    // Auto generate blockchain
    const generate = async () => {
        for (let i = 0; i < 2; ++i) {
            for (let j = 0; j < BUILDINGS[i].length; ++j) {
                const region = REGIONS[i];
                const building = BUILDINGS[i][j];

                await contract.call('createBuilding', building, region);
                for (let k = 0; k < numFlats; ++k) {
                    await contract.call('createFlat', 
                        building, //building name   
                        FLATS[k], //flat name
                        ethers.utils.parseUnits((Math.random() * 10 + 1).toString(), "ether"), //flat price 
                        10, //rent duration
                        Math.floor(Math.random() * 200 + 300), //flat area
                        Math.floor(Math.random() * 4 + 1), //num of rooms
                        generateFlatInfo(),
                        );
                }
            }
        }
    }

    const getTransaction = async () => {
        const tx = await contract.events.getAllEvents();

        const parsedTx = tx.map((t) => ({
            buyer: t.data.owner,
            flat: t.data[3],
            price: t.data.price.toNumber(),
            timestamp: new Date(t.data.timestamp.toNumber()).toString(),
        }))

        return parsedTx;
    }

    const getAllBuildings = async () => {
        const buildings = await contract.call('getAllBuildings');

        const parsedBuilding = buildings.map((building) => ({
            name: building.name,
            address: building.homeAddress,
            available: building.available.toNumber(),
            taken: building.taken.toNumber()
        }));

        return parsedBuilding;
    }

    const getFlatByAddress = async (address) => {
        const buildings = await contract.call('getBuildings', address);

        var allBuildings = [];

        for (let i = 0; i < buildings.length; ++i) {
            const building = await getFlats(buildings[i].name);
            allBuildings.push(building);
        }

        return allBuildings.flat();
    }

    const getFlats = async (building) => {
        const flats = await contract.call('getFlats', building);

        const parsedFlats = flats.map((flat) => ({
            building: building,
            unit: flat.unit,
            price: ethers.utils.formatEther(flat.price.toString()),
            duration: flat.duration.toNumber(),
            area: flat.area.toNumber(),
            room: flat.room.toNumber(),
            flatInfo: {
                propertyType: flat.info[0],
                buildingAge: flat.info[1].toNumber(),
                baths: flat.info[2].toNumber(),
                parking: flat.info[3].toNumber(),
                furnished: flat.info[4],
                pets: flat.info[5],
            }
        }));

        return parsedFlats;
    }

    const buyFlat = async (building, flat, token) => {
        await contract.call('buyFlat', building, flat, { value: token });
    }

    return (
        <StateContext.Provider
            value={{
                address,
                isLoading,
                connect,
                getAllBuildings,
                getFlatByAddress,
                getFlats,
                getTransaction,
                buyFlat,
                generate
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);