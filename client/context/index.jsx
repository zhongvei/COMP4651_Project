import React, { createContext, useContext } from 'react'
import { useAddress, useContract, useMetamask } from '@thirdweb-dev/react'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    // TODO : add the contract address
    const { contract } = useContract("0x2D10A3DCB8215e26d864d63E1A342F7E18209869");

    // Address of your metamask
    const address = useAddress();

    // Connect to metamask function
    const connect = useMetamask();

    // TODO: create buildings
    const createBuildings = async() => {
        console.log("Create Buildings....");
    }

    const getTransaction = async() => {
        const tx = await contract.events.getAllEvents();

        const parsedTx = tx.map((t) => ({
            buyer: t.data.owner,
            flat: t.data[3],
            price: t.data.price.toNumber(),
            timestamp: new Date(t.data.timestamp.toNumber())
        }))

        return parsedTx;
    }

    const getBuildings = async() => {
        const buildings = await contract.call('getBuildings');

        const parsedBuilding = buildings.map((building) => ({
            name: building.name,
            available: building.available.toNumber(),
            taken: building.taken.toNumber()
        }));

        return parsedBuilding;
    }

    return (
        <StateContext.Provider
            value={{
                address,
                connect,
                createBuildings,
                getBuildings,
                getTransaction
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);