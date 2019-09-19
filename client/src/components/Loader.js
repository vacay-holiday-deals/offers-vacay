import React from 'react'
import Loader from 'react-loader-spinner'

function Load() {
  return (
    <div className='load'>
      <div className='load--loader'>
        <Loader type='Circles' color='#0068b3' height={100} width={100} />
      </div>
    </div>
  )
}

export default Load
