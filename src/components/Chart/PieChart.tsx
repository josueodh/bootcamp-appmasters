import React from 'react';
import {
    PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip
} from 'recharts';

const data = [
    {
        "name": "Mortes",
        "value": 400
    },
    {
        "name": "Curados",
        "value": 300
    },
]
const colors = ['#939', '#43a047'];


function PieChartGraph({ ...props }) {
    return (
        <ResponsiveContainer width="99%" aspect={1.8}>
            <PieChart>
                <Pie
                    data={props.data}
                    cx="50%"
                    cy="60%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
export default PieChartGraph;