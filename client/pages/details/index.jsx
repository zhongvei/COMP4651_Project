import { Outfit } from 'next/font/google'
import { Dropdown, Table } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { useStateContext } from '../../context'
import { useRouter } from 'next/router'
import { Line } from 'react-chartjs-2';


const outfit_font = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit"
})



export default function Details() {
    const [buttonTitle, setButtonTitle] = useState("Price Tracking")
    const { getAllBuildings, getTransaction } = useStateContext();
    const [tableTitle, setTableTitle] = useState([]);
    const [content, setContent] = useState([]);

    const router = useRouter();


    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Price',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                backgroundColor: 'rgb(255, 255, 255, 1.2)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    const buttonItems = [
        { name: "Price Tracking"},
        { name: "Transactions"},
        { name: "Occupancy"},
    ];

    const handleTransactions = async () => {
        try {
          const events = await getTransaction();
          console.log("Transaction: ", events);
          let res = [];
          for (let obj of events) {
            res.push({key: obj.timestamp.split(' ').slice(1,5).join(' '), tx: `${obj.buyer.slice(0,5) + '...' + obj.buyer.slice(-3)} pays ${obj.price} ETH for ${obj.flat}`})
          }
          console.log("RES", res);
          setContent(res)
        } catch(error) {
          console.log(error)
        }
    }

    const handleOccupancy = async () => {
        try {
          const events = await getAllBuildings();
          console.log("Buildings: ", events);
          let res = [];
          for (let obj of events) {
            res.push({key: obj.name, available: obj.available, taken: obj.taken})
          }
          console.log("RES", res);
          setContent(res)
        } catch(error) {
          console.log(error)
        }
    }

    const changeContent = (c) => {
        if (c === "Transactions") {
            handleTransactions();
            setTableTitle([{
                key: "key",
                label: "Date",
              },
              {
                key: "tx",
                label: "Transaction",
              },]);
        } else if (c === "Occupancy") {
            handleOccupancy();
            setTableTitle([{
                key: "key",
                label: "Building",
              },
              {
                key: "available",
                label: "Available",
              },
              {
                key: "taken",
                label: "Taken",
              },]);
        }
        setButtonTitle(c)

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
                            <button class="w-24 bg-blue-500 hover:bg-blue-800 border border-transparent text-white font-bold py-2 px-4 rounded mr-8" onClick={(e) => router.push("/rent")}>
                                Rent
                            </button>
                            <button class="w-24 bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={(e) => router.push("/invest")}>
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
                            <div>
                            <Line data={data} options={options} />
                            </div>
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
                                items={content}
                              >
                                {(item) => (
                                <Table.Row key={item.key}>
                                    {(columnKey) => <Table.Cell css={{color:"white"}}>{item[columnKey]}</Table.Cell>}
                                </Table.Row>
                                )}
                            </Table.Body>
                            </Table>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}