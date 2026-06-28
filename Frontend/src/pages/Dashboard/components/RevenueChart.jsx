//src/pages/Dashboard/components/RevenueChart.jsx 
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import "./Layout.css";

const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 16500 },
    { month: "May", revenue: 21000 },
    { month: "jun", revenue: 24500 },
    { month: "Jul", revenue: 26000 },
    { month: "Aug", revenue: 23500 },
    { month: "Sep", revenue: 27000 },
    { month: "Oct", revenue: 30000 },
    { month: "Nov", revenue: 32000 },
    { month: "Dec", revenue: 36000 },
];

const RevenueChart = () => {
    return (
        <div className="revenue-chart">
            <div className="chart-header">
                <div>
                    <h2>Revenue Overview</h2>
                    <p>Monthly hotel revenue</p>
                </div>

                <div className="revenue-total">
                    <span>Total Revenue</span>
                    <h3></h3>
                </div>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={330}>
                    <AreaChart data={revenue}>
                        <defs>
                            <linearGradient id="revenueChart" x1="0" y1="0" x2="0" y="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="eeeeee" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip 
                            formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                        />

                        <Area 
                            type="monotype"
                            dataKey="revenue"
                            stroke="#2563eb"
                            strokewidth={3}
                            fill="url(#revenueGradiant)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Revenuechart;

