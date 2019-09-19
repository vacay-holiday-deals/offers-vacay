import React from 'react'
import PropTypes from 'prop-types'

function Tab(props) {
  const { activeTab, label } = props

  const onClick = () => {
    const { onClick } = props
    onClick(label)
  }

  const className =
    activeTab === label ? 'tab--list-item active' : 'tab--list-item'

  return (
    <li className={className} role='menuitem' onClick={onClick}>
      {label}
    </li>
  )
}

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
}
Tab.defaultProps = {
  onClick: () => {}
}

export default Tab
