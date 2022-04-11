import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


const IncomeCharts = ({ stats }) => {



    const state = {
        labels: stats && stats.map(stat => stat?.income?.year),
        datasets: [
            {
                label: 'Checking Income',
                fill: false,
                lineTension: 0.2,
                backgroundColor: '#FF8C00',
                borderColor: '#FF8C00',
                borderWidth: 4,
                hoverBorderColor: '#83D3CC',
                hoverBorderWidth: 2,
                data: stats && stats.map(stat => stat?.income?.amount)
            }
        ]
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                text: 'Income Stats Over Last 5 Years',
                display: true,
            },
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            x:
            {
                ticks: {
                    fontColor: 'rgba(17,17,17,.7)',
                },
                display: true,
                grid: {
                    display: false,
                    borderDash: 2,
                    borderDashOffset: 1,
                    color: 'rgba(33, 37, 41, 0.3)',
                    zeroLineColor: 'rgba(100, 110, 20, 0)',
                    zeroLineBorderDash: 2,
                    zeroLineBorderDashOffset: 2,
                },
            },

            y:
            {
                ticks: {
                    fontColor: 'rgba(17,17,17,.7)',
                },
                display: true,
                grid: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    drawBorder: true,
                    color: 'rgba(17, 17, 17, 0.15)',
                    zeroLineColor: 'rgba(33, 37, 41, 0)',
                    zeroLineBorderDash: 2,
                    zeroLineBorderDashOffset: 2,
                },
            },

        },
    };
    return (
        <div>
            <Line
                data={state}
                options={options}
            />
        </div>
    );
}

export default IncomeCharts
