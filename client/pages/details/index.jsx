
import { Outfit } from 'next/font/google'
import { Dropdown, Table, useAsyncList } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { useStateContext } from '../../context'

const outfit_font = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit"
})

export default function Details() {
    const [buttonTitle, setButtonTitle] = useState("Price Tracking")
    const { getBuildings, getTransaction } = useStateContext();
    const buttonItems = [
        { name: "Price Tracking"},
        { name: "Transactions"},
        { name: "Occupancy"},
    ];
    const [transaction, setTransaction] = useState([
        {
        buyer: '',
        flat: '',
        price: '',
        timestamp: ''},
    ]);
      
    const transactionTableHead = [
        {
          key: "buyer",
          label: "Buyer",
        },
        {
          key: "flat",
          label: "Flat",
        },
        {
            key: "price",
            label: "Price",
          },
          {
            key: "timestamp",
            label: "Date",
          },
    ];

    const tableTitle = [
        {
          key: "timestamp",
          label: "Date",
        },
        {
          key: "tx",
          label: "Transaction",
        },
      ];
    
    const transactionItems = [
        {
            key: "1",
            date: "2021-09-01",
            transaction: "TX1",
        },
        {
            key: "2",
            date: "2021-09-01",
            transaction: "TX2",
        },
        {
            key: "3",
            date: "2021-09-01",
            transaction: "TX3",
        },
        {
            key: "4",
            date: "2021-09-01",
            transaction: "TX4",
        },
        {
            key: "5",
            date: "2021-09-01",
            transaction: "TX5",
        },
        {
            key: "6",
            date: "2021-09-01",
            transaction: "TX6",
        },
        {
            key: "7",
            date: "2021-09-01",
            transaction: "TX7",
        },
        {
            key: "8",
            date: "2021-09-01",
            transaction: "TX8",
        },
        {
            key: "9",
            date: "2021-09-01",
            transaction: "TX9",
        },
        {
            key: "10",
            date: "2021-09-01",
            transaction: "TX10",
        },
    ]
    const handleEvents = async () => {
        try {
          const events = await getTransaction();
          console.log("Transaction: ", events);
          let res = [];
          for (let obj of events) {
            res.push({timestamp: obj.timestamp.split(' ').slice(1,5).join(' '), tx: `${obj.buyer.slice(0,5) + '...' + obj.buyer.slice(-3)} pays ${obj.price} ETH for ${obj.flat}`})
          }
          console.log("RES", res);
          setTransaction(res)
        } catch(error) {
          console.log(error)
        }
    }

    const changeContent = (c) => {
        if (c === "Transactions") {
            handleEvents();
        }
        setButtonTitle(c)
    }
    console.log(transaction);
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
                    <div>
                    <Dropdown>
                        <Dropdown.Button color={"solid"} light css={{borderColor:"white", border:"solid", marginBottom:"20px"}}>
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
                        {buttonTitle === "Price Tracking" ? (
                            <div></div>
                        ) : (
                            <Table
                            aria-label="Example table with dynamic content"
                            color={"solid"}
                            css={{
                                height: "1rem",
                                minWidth: "100%",
                            }}
                            >
                            <Table.Header columns={tableTitle}>
                                {(column) => (
                                <Table.Column key={column.key}>{column.label}</Table.Column>
                                )}
                            </Table.Header>
                            <Table.Body 
                                items={transaction}
                              >
                                {(item) => (
                                <Table.Row key={item.timestamp}>
                                    {(columnKey) => <Table.Cell css={{color:"white"}}>{item[columnKey]}</Table.Cell>}
                                </Table.Row>
                                )}
                            </Table.Body>
                            </Table>
                        )}
                        
                    </div>
                    <button
                        style={{width: "100px",height: "100px"}}
                        type="submit"
                        title="buildings"
                        onClick={ handleEvents }
                    />
                </div>
            </div>
        </div>
    )
}