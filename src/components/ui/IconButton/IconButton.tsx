import React from 'react'
import type { IconType } from 'react-icons'
type Props = {
    Icon: IconType,
    color: string,
    onClick: () => any
}
const IconButton = ({Icon, color, onClick}: Props) => {
  return (
    <button style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}} onClick={(e) => {e.preventDefault(); onClick();}}>
      <Icon style={{fontSize: '25px', border: `2px solid ${color}`, borderRadius: '1000px', padding: '3px'}}/>
    </button>
  )
}

export default IconButton
