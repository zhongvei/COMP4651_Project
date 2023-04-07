import React, { createContext, useContext } from 'react'
import { useAddress, useContract, useMetamask } from '@thirdweb-dev/react'
import { ethers } from 'ethers';

const StateContext = createContext();

const regions = ["Causeway Bay", "Wan Chai", "Tsim Sha Tsui", "Sai Kung", "Central"]
const buildings = [
    ["The Hayworth", "Park Haven", "Vienna Mansion"],
    ["Suncrest Tower", "Starlight Garden", "Rialto Building"],
    ["The Masterpiece", "Harbour Pinnacle", "The Austin Block"],
    ["The Giverny", "Muk Min Shan", "Villa Royale"],
    ["Glenealy Building", "The Gage", "Kingearn Building"]
]
const flats = ["A", "B", "C"];

const numFlats = 3;

export const StateContextProvider = ({ children }) => {

    // TODO : add the contract address
    const { contract } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS);

    // Address of your metamask
    const address = useAddress();

    // Connect to metamask function
    const connect = useMetamask();

    // Auto generate blockchain
    const generate = async () => {
        for (let i = 0; i < regions.length; ++i) {
            for (let j = 0; j < buildings[i].length; ++j) {
                const region = regions[i];
                const building = buildings[i][j];

                await contract.call('createBuilding', building, region);
                for (let k = 0; k < numFlats; ++k) {
                    await contract.call('createFlat', building, flats[k], ethers.utils.parseUnits((Math.random() * 10 + 1).toString(), "ether"), 10, 10, 10);
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
            area: flat.area.toNumber(),
            room: flat.room.toNumber(),
            price: ethers.utils.formatEther(flat.price.toString())
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