//src/features/dashboard/components/RevenueCard.jsx 
import { Line } from "react-charts-2";

function RevenueCard() {
    const data = {

        labels:[
            "Jan",
            "Feb",
            "Mar",
            "Apr"
        ],

        datasets:[
            {
                label: "Revenue",

                data:[
                    5000,
                    8000,
                    12000,
                    15000,
                ],

                borderColor: 
                    "#2563eb"
            }
        ]
    };

    return (
        <div className="mt-6">
            <h2>Revenue Overview</h2>

            <Line data={data} />
        </div>
    );
}

export default RevenueCard;

