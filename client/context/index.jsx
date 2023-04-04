import React, { createContext, useContext } from 'react'
import { useAddress, useContract, useMetamask } from '@thirdweb-dev/react'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    // TODO : add the contract address
    const { contract } = useContract("0x98bED60A3Cd26F2311bAeac287E91A8a90B904A3");

    // Address of your metamask
    const address = useAddress();

    // Connect to metamask function
    const connect = useMetamask();

    // TODO: create buildings
    const createBuildings = async() => {
        console.log("Create Buildings....");
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
                getBuildings
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);