import React from 'react'
import './stackHeader.css'

const StackHeader = ({stockInfo}) => {
  return (

     
    <div className='stock-header'>
      


      <div className='stock-title'>

        <div >
          <h1 >Apple Inc</h1>
          <p>{stockInfo && stockInfo.lastUpdate}</p>
        </div>
        <div >
          <h1>{stockInfo && stockInfo.last}</h1>
          <div style={{display: 'flex'}}>
            <p style={{color: stockInfo && stockInfo.change > 0 ? 'green' : 'red'}} >{stockInfo && `${stockInfo.change}`}</p>
            <span>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;</span>
            <p style={{color: stockInfo && stockInfo.percentChange > 0 ? 'green' : 'red'}}>{stockInfo && `( ${stockInfo.percentChange } % )`}</p>
          </div>
        </div>
  

        

      </div>



      
      
    </div>
    


  )
}

export default StackHeader