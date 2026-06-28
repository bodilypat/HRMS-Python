//src/pages/Dashboard/components/OccupancyChart.jsx 
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "reCharts";

import "./Layout.css";

const data = [
    { name: "Occupied", value: 75, color: "#2563eb"},
    { name: "Available", value: 35, color: "#22c55e"},
    { name: "Maintenance", value: 10, color: "#f59e0b"},
];

const OccupancyChart = () => {
    return (
        <div className="occupancy-chart">
            <div className="chart-header">
                <h2>Room Occupancy</h2>
                <span>This Month</span>
            </div>

            <div className="chart-body">
                <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                        <Pie 
                            data={data}
                            innerRadius={70}
                            outerRadius={110}
                            dataKey="value"
                            paddingAngle={4}
                        >
                            {data.map((item, index) => (
                                <Cell 
                                    key={index}
                                    fill={item.color}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend
                            verticalAlign="botton"
                            height={36}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-summary">
                {data.map((item) => (
                    <div 
                        className="summary-items"
                        key={item.name}
                    >
                        <span 
                            className="color-dot"
                            style={{ background: item.color }}
                        />

                        <div>
                            <strong>{item.value}</strong>
                            <p>{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OccupancyChart;

