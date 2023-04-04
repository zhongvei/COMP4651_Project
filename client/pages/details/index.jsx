
import { Outfit } from 'next/font/google'
import { Dropdown } from "@nextui-org/react"
import Image from 'next/image'
import { useState, useEffect } from "react"

const outfit_font = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit"
})

export default function Details() {
    const [buttonTitle, setButtonTitle] = useState("Price Tracking")
    const [content, setContent] = useState("Price Tracking")
    const buttonItems = [
        { name: "Price Tracking"},
        { name: "Transactions"},
        { name: "Occupancy"},
      ];

    const changeContent = (c) => {
        setButtonTitle(c)
        setContent(c)
    }
    return (
        <div>
            <div className={`w-full`} style={{backgroundColor:"white"}}>
                <h1 className={`border-solid border-t-2 font-bold text-[40px] pt-8 px-20 pb-0 ${outfit_font.className}`} style={{color: "#2402F5"}}>HKPulse Fund</h1>
                <p className={`px-20 pt-0 pb-4`} style={{color: "#6B6B6B"}}> 100.0 HKD </p>
            </div>
            <div className={`grid grid-cols-12 text-[14px] ${outfit_font.className}`}>
                <div className={`col-span-5 p-20`}>
                    <div className={`border-solid border-b pb-8`}>
                        <p className={`text-[24px] mb-3 font-semibold`}>Description</p>
                        <p className={`mb-3`}> The <strong>HKPulse Fund</strong> is a <strong>REIT</strong> dedicated to investing in housing projects that makes property more affordable and accessible for people in Hong Kong.</p>
                        <p className={`mb-3`}> The fund aims to address the <strong>housing affordability crisis</strong> in Hong Kong by investing in projects that increase the supply of affordable housing, and improve the overall quality of living for residents.</p>
                    </div>
                    <div className={`pt-9`}>
                        <p className={`text-[24px] mb-3 font-semibold`}>Key Figures</p>
                        <p className={`mb-1`}><strong># of Investors:</strong> 10,835</p>
                        <p className={`mb-1`}><strong>Monthly Dividend (per share):</strong> $55.38</p>
                        <div className={`py-8`}>
                            <button class="w-24 bg-blue-500 hover:bg-blue-800 border border-transparent text-white font-bold py-2 px-4 rounded mr-8">
                                Rent
                            </button>
                            <button class="w-24 bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Invest
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`col-span-7 p-20`}>
                    <div className={`my-b-4`}>
                    <Dropdown>
                        <Dropdown.Button color={"solid"} light>
                        {buttonTitle}
                        </Dropdown.Button>
                        <Dropdown.Menu
                        color={"light"}
                        variant="shadow"
                        aria-label="Actions"
                        items={buttonItems}
                        onAction={(name) => changeContent(name)}
                        >
                            {(item) => ( <Dropdown.Item key={item.name}>{item.name}</Dropdown.Item> )}
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <div>
                        <p className={`font-semibold`}>{content}</p>
                        {/* <Table
                        aria-label="Example static collection table"
                        css={{
                            height: "auto",
                            minWidth: "100%",
                        }}
                        selectionMode="single"
                        >
                        <Table.Header>
                            <Table.Column>NAME</Table.Column>
                            <Table.Column>ROLE</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row key="1">
                            <Table.Cell>Tony Reichert</Table.Cell>
                            <Table.Cell>CEO</Table.Cell>
                            <Table.Cell>Active</Table.Cell>
                            </Table.Row>
                            <Table.Row key="2">
                            <Table.Cell>Zoey Lang</Table.Cell>
                            <Table.Cell>Technical Lead</Table.Cell>
                            <Table.Cell>Paused</Table.Cell>
                            </Table.Row>
                            <Table.Row key="3">
                            <Table.Cell>Jane Fisher</Table.Cell>
                            <Table.Cell>Senior Developer</Table.Cell>
                            <Table.Cell>Active</Table.Cell>
                            </Table.Row>
                            <Table.Row key="4">
                            <Table.Cell>William Howard</Table.Cell>
                            <Table.Cell>Community Manager</Table.Cell>
                            <Table.Cell>Vacation</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                        </Table> */}
                    </div>
                </div>
            </div>
        </div>
    )
}