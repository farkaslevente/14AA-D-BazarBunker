import React from 'react'
import './FormInput.css'

export const FormInput = (props) => {
    const {label, errorMessage, onChange, id, ...inputProps} = props
  return (
    <div className='forminput'>
        <label>{label}</label>
        <input {...inputProps} onChange={onChange}/>
        <span>{errorMessage}</span>
    </div>
  )
}
