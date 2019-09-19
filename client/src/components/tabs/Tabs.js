import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Event } from '../tracking/googleTracking'
import { TrackEvent } from '../tracking/facebookTracking'
import Tab from './Tab'

function Tabs(props) {
  const { children } = props

  const [activeTab, setActiveTab] = useState(children[0].props.label)

  const onClickTabItem = tab => {
    Event('Clicked on tab', 'clicked on tab', 'TAB_CLICKED')
    TrackEvent('CLICKED TAB', 'TAB CLICKED')
    setActiveTab(tab)
  }

  return (
    <div className='tabs'>
      <div className='tab--container'>
        <ol className='tab--list'>
          {children.map(child => {
            const { label } = child.props
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            )
          })}
        </ol>
      </div>

      {children.map(child => {
        if (child.props.label !== activeTab) return undefined
        return (
          <div className='tab--content' key={child.props.label}>
            {child.props.children}
          </div>
        )
      })}
    </div>
  )
}

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired
}
export default Tabs
