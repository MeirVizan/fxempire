import React ,{useEffect, useState} from 'react'
import axios from 'axios';
import { Tab, Tabs } from '@mui/material';
import Chart from "react-apexcharts";
import './Dashboad.css'

  

const Overview = ({overviewData}) => {

    const [overviewDataFiltered, sertOverviewDataFiltered] = useState([])

    
    useEffect(() => {
        setDataForCandlesChart(overviewData)
    }, [overviewData])


    const setDataForCandlesChart = (data) =>{

        let arr = []

        for (let i = 0; i < data.length; i++) {
            
            arr.push({x:new Date(data[i].Date) ,y: [data[i].Open, data[i].High, data[i].Low, data[i].Close]})
        }
        // console.log('arr', arr)
        sertOverviewDataFiltered(arr)

    }
    
  return (

    <div className='overview'>
       
        <Chart
                options={
                    {
                        chart: {
                          type: 'candlestick',
                          height: 350
                        },
                       
                        xaxis: {
                          type: 'datetime'
                        },
                        yaxis: {
                          tooltip: {
                            enabled: true
                          }
                        }
                      }
                    }
                series={[
                    {
                      name: "series-1",
                      data: overviewDataFiltered
                      
                    }
                  ]}
                type='candlestick'
                width="1200"
                height= "300"
              />    
    </div>

  )
}

export default Overview