import React from 'react'
import './style.css'
function ValidationError(props) {
  return (
    <div className="alert alert-danger" role="alert">
  {props.children}
</div>
  )
}

export default ValidationError