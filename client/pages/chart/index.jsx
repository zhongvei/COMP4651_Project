import { useEffect } from "react"
import { Chart } from "chart.js/auto";
function Example() {
    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [{
                    data: [70, 90, 44, 60, 83, 90, 100],
                    label: "Accepted",
                    borderColor: "rgb(60,186,159)",
                    backgroundColor: "rgb(60,186,159,0.1)",
                },
                ]
            },
        });

    }, [])


    return (
        <>
            {/* Filled line chart */}
            <h1 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize ">Filled line Chart</h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
    )
}

export default Example;