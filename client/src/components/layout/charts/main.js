import React, { useEffect, useState } from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2';

var data = {
        // dates in ascending order on the x-axis







        labels: ['16/04/1994', '19/07/2000', '03/05/2005', '07/09/2017','06/11/2020'],
        datasets:[
          {
            label:'Population',

          // y-axis totals
            data:[10,20,30,40,50],
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