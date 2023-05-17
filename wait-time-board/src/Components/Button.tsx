import { AnyAaaaRecord } from 'dns'
import React from 'react'
import styled from 'styled-components'
type IButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  width?:string
}

function Button({onClick,children, width }:IButtonProps) {
  return (
    <button 
      style={{borderRadius:"25px", padding:"6px 20px", marginRight: "10px", width: width || "auto"}}
      type="button"
      className={"btn btn-primary"}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button