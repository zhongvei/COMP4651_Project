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
    const createBuildings = async() => {
        console.log("Create Buildings....");
    }

    return (
        <StateContext.Provider
            value={{
                address,
                connect,
                createBuildings,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);