import React from "react";
import { Table } from '@nextui-org/react';

const Rent = () => {
    const locations = [
        "Hong Kong",
        "Kowloon",
        "New Territories",
        "Outlying Islands",
        "All",
    ];

    const [location, setLocation] = React.useState("Hong Kong");

    const data = [
        {
            id: 1,
            building: "Chinese Mansion",
            unit: "3B",
            area: "50 sq ft",
            room: "1",
        },
        {
            id: 1,
            building: "Chinese Mansion",
            unit: "3B",
            area: "50 sq ft",
            room: "1",
        },
        {
            id: 1,
            building: "Chinese Mansion",
            unit: "3B",
            area: "50 sq ft",
            room: "1",
        },
        {
            id: 1,
            building: "Chinese Mansion",
            unit: "3B",
            area: "50 sq ft",
            room: "1",
        },
        {
            id: 1,
            building: "Chinese Mansion",
            unit: "3B",
            area: "50 sq ft",
            room: "1",
        },
        {
            id: 1,
            building: "Chinese Mansion",
            unit: "3B",
            area: "50 sq ft",
            room: "1",
        },
        {
            id: 1,
            building: "Chinese Mansion",
            unit: "3B",
            area: "50 sq ft",
            room: "1",
        },
        {
            id: 1,
            building: "Chinese Mansion",
            unit: "3B",
            area: "50 sq ft",
            room: "1",
        },

    ]

    return (
        <div className="w-full flex lg:flex-row">
            <div className="w-[50%] h-[88vh] bg-[#0F0F0F] flex items-center">
                <div className="px-24">
                    <div className="border-b-2 mb-10 pb-8">
                        <p className="font-bold text-white text-2xl my-2">Description</p>
                        <p>
                            Looking for affordable housing in Hong Kong can be a daunting task,
                            but with the HKPulse Fund, you can finally find the home you've been looking for.
                        </p>
                        <br />
                        <p>
                            The fund invests in affordable housing developments throughout the city,
                            ensuring that HK residents have access to safe, comfortable, and affordable housing part.
                        </p>
                    </div>
                    <div>
                        <div>
                            <p className="font-bold text-white text-2xl">Rent Price</p>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center justify-center">
                                <p className="font-bold text-3xl">
                                    $12,000
                                </p>
                                <p className="text-3xl">
                                    / month
                                </p>
                            </div>
                            <button className="bg-blue-700 w-24 p-2">
                                Rent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[50%] h-[88vh] bg-[#161616] flex items-center">
                <div className="px-24">
                    <div className="w-64 my-6">
                        <select className="w-full h-10 px-3 placeholder-gray-600 border border-white focus:shadow-outline rounded-lg focus:outline-none focus:ring-2 ring-offset-current ring-offset-2" 
                        onChange={(location)=>{
                            setLocation(location.target.value)
                        }}
                        defaultValue={location}>
                            {locations.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative h-[50vh] w-[35vw] overflow-y-auto ">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-scroll">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Building</th>
                                    <th scope="col" className="px-6 py-3">Unit</th>
                                    <th scope="col" className="px-6 py-3">Area</th>
                                    <th scope="col" className="px-6 py-3">Room #</th>
                                </tr>
                            </thead>
                            <tbody className="overflow-y-scroll">
                                {data.map((item) => (
                                    <tr className="bg-[#0F0F0F] border-b dark:bg-gray-800 dark:border-gray-700 text-white">
                                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">{item.building}</td>
                                        <td className="px-6 py-4">{item.unit}</td>
                                        <td className="px-6 py-4">{item.area}</td>
                                        <td className="px-6 py-4">{item.room}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rent;
