import React from 'react'
import styled from 'styled-components'

const TitleBarWrapper = styled.div<{noSidebar:boolean, clearBackground:boolean}>`
  z-index: 1000;
  min-height: 100px;
  position: fixed;
  ${ props => !props.clearBackground ? "background-color: #ebeeef;" : ""}
  width: 100%;
  left: ${props => props.noSidebar ? "0px" : "280px"};
  top: 0px;
  padding-left: 70px;
  padding-top: 60px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  & > h2 {
    line-height: 0.88rem;
  }
  & > p {
    color: #555;
    font-size: 20px;
  }
`
export default (props:{title:string,subtitle?:string,noSidebar?:boolean, clearBackground?:boolean}) => {
  return (
  <TitleBarWrapper noSidebar={!!props.noSidebar} clearBackground={!!props.clearBackground}>
    <h2>{props.title}</h2>
    {props.subtitle && (<p>{props.subtitle}</p>)}
  </TitleBarWrapper>
  )
}