import React, { useEffect, useState } from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2';

var data = {
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
          {
            label:'Population',
            data:[
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }

const Chart = () => {
    const [chartData, setChartData] = useState(data);
    const [defaultProps, setDefaultProps] = useState(
        {
            displayTitle:true,
            displayLegend: true,
            legendPosition:'right',
            location:'City'
          }
    )

    return (
        <div className="chart">
        <Bar
          data={chartData}
          options={{
            title:{
              display:defaultProps.displayTitle,
              text:'Largest Cities In '+defaultProps.location,
              fontSize:25
            },
            legend:{
              display:defaultProps.displayLegend,
              position:defaultProps.legendPosition
            }
          }}
        />

        <Line
          data={chartData}
          options={{
            title:{
              display:defaultProps.displayTitle,
              text:'Largest Cities In '+defaultProps.location,
              fontSize:25
            },
            legend:{
              display:defaultProps.displayLegend,
              position:defaultProps.legendPosition
            }
          }}
        />

        <Pie
          data={chartData}
          options={{
            title:{
              display:defaultProps.displayTitle,
              text:'Largest Cities In '+defaultProps.location,
              fontSize:25
            },
            legend:{
              display:defaultProps.displayLegend,
              position:defaultProps.legendPosition
            }
          }}
        />
      </div>
    )
}

export default Chart;