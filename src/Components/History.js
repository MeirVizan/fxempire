import React, { useEffect, useState } from 'react'
import './History.css'

const titleNameArr = ['Date', 'High', 'Low', 'Open', 'Close', 'Change']
const History = ({data}) => {

  const [arr, setArr] = useState([])


  useEffect(() => {

    sortData()
    
  }, [data])

  const sortData = () =>{

    data.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.Date) - new Date(a.Date);
    });

    setArr(data)

  }
  
  return (
    <div className='history'>

          <div className='table-title-container'>
            {
                titleNameArr.map(title => {
                    return <div className='table-title-column'  style={{fontWeight: 'bold', color: 'black'}}>{title}</div>
                })
            }
            
            
        </div>


            {
              arr.map(val => {
                return (
                  <div className='table-title-container'>
                        <div className='table-title-column' >{val.Date.slice(0,-3)}</div>
                        <div className='table-title-column' >{val.High}</div>
                        <div className='table-title-column' >{val.Low}</div>
                        <div className='table-title-column' >{val.Open}</div>
                        <div className='table-title-column' >{val.Close}</div>
                        <div className='table-title-column' style={{color: ( val.Open - val.Close ) / ( (val.Open + val.Close)/2 ) > 0 ? 'green' : 'red'}} >{( val.Open - val.Close ) / ( (val.Open + val.Close)/2 ) > 0 ?  (100 * Math.abs( ( val.Open - val.Close ) / ( (val.Open + val.Close)/2 ) )).toFixed(2) +'%'
                        : "-"+ (100 * Math.abs( ( val.Open - val.Close ) / ( (val.Open + val.Close)/2 ) )).toFixed(3) +'%' }</div>
                  </div>
                    )
                })
            }
            
            


        
        
    </div>
  )
}

export default History