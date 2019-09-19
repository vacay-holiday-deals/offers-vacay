import React, { useEffect, useState } from 'react'

function Search({ offers }) {
  const [filtered, setFiltered] = useState([])
  const [currentList, setCurrentList] = useState([])
  const [value, setValue] = useState('')
  console.log(offers)

  const getTitle = () => {
    offers.map(offer => {
      const { title } = offer
      return title
    })

    const title = getTitle()
    console.log(title)
  }
  useEffect(() => {}, [])
  return (
    <div className='search mt-4 mb-2'>
      <input
        type='text'
        placeholder='start typing ...'
        className='search--input'
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
      />
    </div>
  )
}

export default Search
