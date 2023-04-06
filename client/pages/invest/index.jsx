import React from "react";
import { Outfit } from 'next/font/google'

const outfit_font = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit"
})

const invest = () => {
    const [modal, setModal] = React.useState(true);
    return (
        <div className={`w-full flex lg:flex-row ${outfit_font.className}`}>
            {modal && (
                <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="w-[55%] h-[500px] bg-white flex items-center justify-center  ">
                        <div className="px-16">
                            <div className="flex flex-col text-[#0F0F0F]">
                                <p className="font-bold text-3xl my-2">
                                    Lets Invest
                                </p>
                                <p className="text-2xl mb-2">
                                    Come and invest in our HKPulse Fund through the platforms below:
                                </p>
                                <button className={`border-solid border-2 border-gray-400 p-5 my-2 text-left`}>
                                    <p>Interactive Broker</p>
                                </button>
                                <button className={`border-solid border-2 border-gray-400 p-5 my-2 text-left`}>
                                    <p>WeBull Securities</p>
                                </button>
                                <button className={`border-solid border-2 border-gray-400 p-5 my-2 text-left`}>
                                    <p>SoFi Hong Kong</p>
                                </button>
                            </div>
                            <div>
                                <div className="flex flex-row justify-between items-center">
                                    <a className="text-purple-600" href="/comingsoon">
                                        Find More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default invest;