import React, { useEffect } from "react";
import { useStateContext } from "../../context";
import { chooseBestFlat } from "../../utils/picker";
import { PROPERTY_TYPE, REGIONS } from "../../utils/constants";
import { toast } from "react-toastify";

const Rent = () => {

    const { isLoading, getAllBuildings, getFlatByAddress } = useStateContext();
    const [isDataLoading, setIsDataLoading] = React.useState(true);
    const [location, setLocation] = React.useState("All");
    const [modal, setModal] = React.useState(true);
    const [buildingAddress, setBuildingAddress] = React.useState("");
    const [flats, setFlats] = React.useState([]);
    const [selectedFlat, setSelectedFlat] = React.useState(null);
    const [questionare, setQuestionare] = React.useState(false);
    const [preferences, setPreferences] = React.useState({
        "incomeRange": null,
        "rentalPrice": null,
        "propertyType": null,
        "location": null,
        "room": null,
        "flatSize": null,
        "furnished": null,
        "duration": null,
        "buildingAge": null,
        "bathrooms": null,
        "parking": null,
        "pets": null,
    });

    const PREFERENCE_ATTRIBUTES = {
        incomeRange: {
            "label": "Income Range",
            "placeholder": "HKD",
            "prompt": "What is your monthly income?",
            "type": "number"
        },
        rentalPrice: {
            "label": "Rental Price",
            "placeholder": "HKD",
            "prompt": "What is your monthly rental budget?",
            "type": "number"
        },
        propertyType: {
            "label": "Property Type",
            "placeholder": "Studio",
            "prompt": "What type of property are you looking for?",
            "type": "enum",
            "options": PROPERTY_TYPE
        },
        location: {
            "label": "Location",
            "placeholder": "Causeway Bay",
            "prompt": "Where do you want to live?",
            "type": "enum",
            "options": REGIONS
        },
        room: {
            "label": "Room",
            "placeholder": "1",
            "prompt": "How many rooms do you need?",
            "type": "number"
        },
        flatSize: {
            "label": "Flat Size",
            "placeholder": "400",
            "prompt": "What is the minimum flat size you need?",
            "type": "number"
        },
        furnished: {
            "label": "Furnished",
            "placeholder": "true",
            "prompt": "Do you need a furnished flat?",
            "type": "boolean",
            "options": ["Yes", "No"]
        },
        duration: {
            "label": "Duration",
            "placeholder": "12",
            "prompt": "How long do you want to rent the flat for, enter the nubmer of month(s)?",
            "type": "number",
        },
        buildingAge: {
            "label": "Building Age",
            "placeholder": "10",
            "prompt": "What is the maximum age of the building you want to live in?",
            "type": "number"
        },
        bathrooms: {
            "label": "Bathrooms",
            "placeholder": "1",
            "prompt": "How many bathrooms do you need?",
            "type": "number"
        },
        parking: {
            "label": "Parking",
            "placeholder": "false",
            "prompt": "Do you need a parking space?",
            "type": "boolean",
            "options": ["Yes", "No"]
        },
        pets: {
            "label": "Pets",
            "placeholder": "false",
            "prompt": "Do you have pets?",
            "type": "boolean",
            "options": ["Yes", "No"]
        },
    }

    useEffect(() => {
        if (!isLoading) {
            getBuildings()
                .then((buildingAddress) => {
                    for (let i = 0; i < buildingAddress.length; ++i) {
                        getFlats(buildingAddress[i]);
                    }
                }).catch((err) => {
                    console.log(err);
                })
                .finally(() => { setIsDataLoading(false) });
        }
    }, [isLoading]);

    useEffect(() => {
        setFlats([]);
    }, []);

    const getBuildings = async () => {
        const buildings = await getAllBuildings();
        var buildingAddress = [];
        buildings.map((building) => {
            if (!buildingAddress.includes(building.address)) {
                buildingAddress.push(building.address);
            }
        });
        buildingAddress.unshift("All");
        setBuildingAddress(buildingAddress);
        setLocation(buildingAddress[0]);
        return buildingAddress;
    };

    const getFlats = async (buildingAddress) => {
        const flats = await getFlatByAddress(buildingAddress);
        flats.map((flat) => {
            flat.address = buildingAddress;
            setFlats((prev) => [...prev, flat])
        });
    };

    const rentModal = () => {
        if (questionare) {
            return (
                <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="w-[55%] h-[650px] bg-white flex items-center justify-center">
                        <div className="px-16">
                            <div>
                                <button className="float-right bg-black" onClick={() => {
                                    setModal(false);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-col text-[#0F0F0F] border-b-2 mb-6 pb-4 flex-none overflow-y-auto my-2 overflow-auto">
                                <p className="font-bold text-3xl my-2">
                                    Fill in your personal information to proceed!
                                </p>
                                <p className="font-bold text-xl mb-2">
                                    1. Name (English)
                                </p>
                                <input type="text" className="bg-white border border-black rounded px-2 py-1 mb-2 mx-2" placeholder="Name (English)" />
                                <p className="font-bold text-xl mb-2">
                                    2. Email Address
                                </p>
                                <input type="text" className="bg-white border border-black rounded px-2 py-1 mb-2 mx-2" placeholder="Email Address" />
                                <p className="font-bold text-xl mb-2">
                                    3. Age
                                </p>
                                <input type="text" className="bg-white border border-black rounded px-2 py-1 mx-2" placeholder="Age" />
                                <p className="font-bold text-xl mb-2">
                                    4. Contact
                                </p>
                                <input type="text" className="bg-white border border-black rounded px-2 py-1 mx-2" placeholder="Contact" />
                                <p className="font-bold text-xl mb-2">
                                    5. Nationality
                                </p>
                                <input type="text" className="bg-white border border-black rounded px-2 py-1 mx-2" placeholder="Nationality" />
                                <p className="font-bold text-xl mb-2">
                                    6. HKID
                                </p>
                                <input type="text" className="bg-white border border-black rounded px-2 py-1 mx-2" placeholder="HKID" />
                            </div>
                            <div>
                                <div className="flex flex-row justify-between items-center">
                                    <button className="bg-blue-700 w-24 p-2" onClick={() => {
                                        setModal(false);
                                    }}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="w-[55%] h-[600px] py-10 bg-white flex justify-center overflow-y-auto">
                        <div className="px-16">
                            <div>
                                <button className="float-right bg-black" onClick={() => {
                                    setModal(false);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-col text-[#0F0F0F] border-b-2 mb-6 pb-4">
                                <p className="font-bold text-3xl my-2">
                                    Fill in a 3-min survey to optimise your search!
                                </p>
                                {
                                    Object.keys(PREFERENCE_ATTRIBUTES).map((attribute, index) => {
                                        return (
                                            <div className="flex flex-col" key={index}>
                                                <p className="font-bold text-xl mb-2">
                                                    {index + 1}. {PREFERENCE_ATTRIBUTES[attribute].prompt}
                                                </p>
                                                {
                                                    PREFERENCE_ATTRIBUTES[attribute].type === "number" ?
                                                        <input type="number" name={attribute.name} className="bg-white border border-black rounded px-2 py-1 mb-2"
                                                            placeholder={`${PREFERENCE_ATTRIBUTES[attribute].placeholder}`}
                                                            //update on change
                                                            onChange={(e) => {
                                                                setPreferences((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        [attribute]: parseFloat(e.target.value)
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                        :
                                                        <select className="bg-white border border-black rounded px-2 py-1 mb-2"
                                                            onChange={(e) => {
                                                                setPreferences((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        [attribute]: e.target.value.toString() === "Yes" ? true : false
                                                                    }
                                                                })
                                                            }}
                                                        >
                                                            <option disabled selected value> -- Select an Option -- </option>
                                                            {
                                                                PREFERENCE_ATTRIBUTES[attribute].options.map((option, index) => {
                                                                    return (
                                                                        <option value={option} key={index}>
                                                                            {option}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                }

                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <div className="flex flex-row justify-between items-center pb-10">
                                    <button className="bg-blue-700 w-24 p-2" onClick={() => {
                                        setModal(false);
                                        console.log(chooseBestFlat(flats, preferences, setSelectedFlat, setFlats));
                                        toast.success("Your search has been optimised!", {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                        });
                                    }}>
                                        Search!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    if (isLoading || isDataLoading) {
        return (
            <div className="w-full h-[88vh] flex items-center justify-center">
                <div className="w-24 h-24 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="w-full flex lg:flex-row">
            {modal &&
                rentModal()
            }
            <>
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
                                <div className="flex flex-col justify-center my-2 mr-4">
                                    <p className="font-bold text-3xl">
                                        {
                                            !selectedFlat ?
                                                "Select a flat to view the price!"
                                                :
                                                selectedFlat?.price
                                        }
                                    </p>
                                    {
                                        selectedFlat &&
                                        <p className="text-3xl">
                                            ETH / month
                                        </p>
                                    }
                                </div>
                                <button className="bg-blue-700 w-24 p-2" onClick={() => {
                                    setModal(true);
                                }}>
                                    Rent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[50%] h-[88vh] bg-[#161616] flex items-center">
                    <div className="px-24">
                        <div className="my-6 flex flex-row justify-between">
                            <select className="w-48 h-10 px-3 placeholder-gray-600 border border-white focus:shadow-outline rounded-lg focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                                onChange={(location) => {
                                    setLocation(location.target.value)
                                }}
                                defaultValue={location}>
                                {buildingAddress && buildingAddress.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                            <div>
                                <button className="bg-[#3f6ad8] w-48 p-2 rounded"
                                    onClick={() => {
                                        setQuestionare(false);
                                        setModal(true);
                                    }}
                                >
                                    Search by preferences
                                </button>
                            </div>
                        </div>
                        <div className="relative h-[50vh] w-[35vw] overflow-y-auto">
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
                                    {flats.map((item, index) => {
                                        return (item.vacant && (location == item.address || location == "All") &&
                                            <tr key={index} className={
                                                item == selectedFlat ? "bg-[#2402F5] border-b text-white hover:cursor-pointer" :
                                                    "bg-[#0F0F0F] border-b text-white hover:cursor-pointer"
                                            } onClick={() => { setSelectedFlat(item); }}>
                                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">{item.building}</td>
                                                <td className="px-6 py-4">{item.unit}</td>
                                                <td className="px-6 py-4">{item.area}</td>
                                                <td className="px-6 py-4">{item.room}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>

        </div>
    );
};

export default Rent;
