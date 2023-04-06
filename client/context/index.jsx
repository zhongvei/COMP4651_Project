import React, { createContext, useContext } from 'react'
import { useAddress, useContract, useMetamask } from '@thirdweb-dev/react'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    // TODO : add the contract address
    const { contract } = useContract("0xA06855D76159DE3f7a321b17020e5aCB5EC4e228");

    // Address of your metamask
    const address = useAddress();

    // Connect to metamask function
    const connect = useMetamask();

    // Auto generate blockchain
    const generate = async () => {
        await contract.call('createBuilding', "building1", "address1");
        await contract.call('createBuilding', "building2", "address1");
        await contract.call('createBuilding', "building3", "address2");

        await contract.call('createFlat', "building1", "A", "10000000000000000000", 10, 10, 10);
        await contract.call('createFlat', "building1", "B", "5000000000000000000", 10, 10, 10);
        await contract.call('createFlat', "building2", "C", "10000000000000000000", 10, 10, 10);
        await contract.call('createFlat', "building2", "D", "5000000000000000000", 10, 10, 10);
        await contract.call('createFlat', "building3", "E", "10000000000000000000", 10, 10, 10);
        await contract.call('createFlat', "building3", "F", "5000000000000000000", 10, 10, 10);

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
                getAllBuildings,
                getBuildings,
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