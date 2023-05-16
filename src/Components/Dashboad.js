import React, {useEffect, useState} from 'react'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Overview from './Overview';
import History from './History';
import axios from 'axios';

const  Dashboad = () => {

    const [value, setValue] = useState(0);

    const [overviewData, sertOverviewData] = useState([])

    const [periodTime, setPeriodTime] = useState('minute');

    
    useEffect(() => {
        getUrlForMitunes(1)
    }, [])




    const handleChangetimeframe = (event, newValue) => {
      setPeriodTime(newValue);
        const url = ''
        switch (newValue) {
            case 'minute':
                getUrlForMitunes(1)
                break;
            case 'five-minute':
                getUrlForMitunes(5)
                break;
            case 'hour':
                getUrlForOneHour()
                break;
            case 'week':
                getUrlForOneWeek()
                break;
            default:
                break;
        }
      };
    
    const getData = (URL) =>{
        
        axios.get(URL)
        .then(function (response) {
            // handle success
            console.log(response);
            sertOverviewData(response.data)
            // setDataForCandlesChart(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    
    const getUrlForMitunes = (minute) =>{
        
        const current = new Date();
        const today = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        const URL = `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${minute}&Precision=Minutes&StartTime=${today}&EndTime=${today}%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
        // console.log('URL', URL)
        getData(URL)
    }

    const getUrlForOneHour = () =>{

        const current = new Date();
        const today = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        const dayBefore = new Date(new Date().getTime() - (24 * 60 * 60 * 1000))
        const yesterday = `${dayBefore.getMonth()+1}/${dayBefore.getDate()}/${dayBefore.getFullYear()}`;
        const URL = `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=1&Precision=Hour&StartTime=${yesterday}&EndTime=${today}%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
        // console.log('URL', URL)
        getData(URL)
    }
    
    const getUrlForOneWeek = () =>{
        const current = new Date();
        const today = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        let startDate = new Date();
        startDate.setDate(startDate.getDate()-30);        
        const before30Day = `${startDate.getMonth()+1}/${startDate.getDate()}/${startDate.getFullYear()}`;
        const URL = `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=168&Precision=Hour&StartTime=${before30Day}&EndTime=${today}%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
        // console.log('URL', URL)
        getData(URL)
    }
    


    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
      };
  return (
    <div className='dashboad'>
        <Tabs value={value} onChange={handleChange} style={{maxWidth: '1245px',margin: '0px auto', color: '#457295'}}>
            <Tab label="Overview" />
            <Tab label="History" />
      </Tabs>


      <Tabs  value={periodTime} onChange={handleChangetimeframe} style={{maxWidth: '1245px',margin: '0px auto'}}>
            <Tab label="1 Minute" value={'minute'}  />
            <Tab label="5 Minute" value={'five-minute'}/>
            <Tab label="1 Hour" value={'hour'} />
            <Tab label="1 Week" value={'week'} />
      </Tabs>

        <div>

        {value == 0 ?
            <Overview overviewData= {overviewData} />
         :  <History data ={overviewData} />
         }
        </div>
    </div>
  )
}

export default Dashboad