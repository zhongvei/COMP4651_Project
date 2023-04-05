import React, { createContext, useContext } from 'react'
import { useAddress, useContract, useMetamask } from '@thirdweb-dev/react'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    // TODO : add the contract address
    const { contract } = useContract("");

    // Address of your metamask
    const address = useAddress();

    // Connect to metamask function
    const connect = useMetamask();

    // TODO: create buildings
    const createBuildings = async () => {
        console.log("Create Buildings....");
    }

    const getTransaction = async () => {
        const tx = await contract.events.getAllEvents();

        const parsedTx = tx.map((t) => ({
            buyer: t.data.owner,
            flat: t.data[3],
            price: t.data.price.toNumber(),
            timestamp: new Date(t.data.timestamp.toNumber()).toString()
        }))

        return parsedTx;
    }

    const getAllBuildings = async () => {
        const buildings = await contract.call('getAllBuildings');

        const parsedBuilding = buildings.map((building) => ({
            name: building.name,
            available: building.available.toNumber(),
            taken: building.taken.toNumber()
        }));

        return parsedBuilding;
    }

    const getBuildings = async (address) => {
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
            room: flat.room.toNumber()
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
                createBuildings,
                getAllBuildings,
                getBuildings,
                getFlats,
                getTransaction,
                buyFlat
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);