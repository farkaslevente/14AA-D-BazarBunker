import React, { useState } from 'react'
import './FormInput.css'

export const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props

    const handleFocus = (e) => {
        setFocused(true);
    }
  return (
    <div className='forminput'>
        <label>{label}</label>
        <input {...inputProps} onChange={onChange} onBlur={handleFocus} onFocus={() => inputProps.name==="passwordagain" && setFocused(true)} focused={focused.toString()}/>
        <span>{errorMessage}</span>
    </div>
  )
}