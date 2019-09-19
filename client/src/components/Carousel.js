import React from 'react'
import ImageView from './ImageView'
import PropTypes from 'prop-types'

function Slider({ images }) {
  return (
    <div className='carousel--container'>
      <ImageView images={images} />
    </div>
  )
}

Slider.propTypes = {
  images: PropTypes.array
}

Slider.defaultProps = {
  images: []
}

export default Slider
