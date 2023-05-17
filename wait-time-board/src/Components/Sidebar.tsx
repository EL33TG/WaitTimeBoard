import React from 'react'
import styled from 'styled-components'
import {useMsal} from '@azure/msal-react'
import Button from './Button'

const SideBar = styled.div`
  height: 100%;
  width: 280px;
  position: fixed;
  z-index: 1;
  top: 0;
  background-color: #fff;
  overflow-x: hidden;
  padding-top: 10px;
  padding-left: 10px;
  & a {
    padding: 15px 8px 6px 16px;
    text-decoration: none;
    font-size: 20px;
    color: #666666;
    display: block;
  }
  & a:hover {
    color: #ff2400;
  }
`


const LogoutButtonWrapper = styled.div`
  width: 100%;
  position: absolute;
  left:0;
  bottom: 20px;
  display:flex;
  align-items:center;
  justify-content: center;
`
const LogoutButton = styled(Button)`
  width: 100%;
`

const sidebarLabels:Array<{href:string,className:string,title:string,newTab?:boolean}> = [
  {href:'/',                className:'fa fa-fw fa-home',     title:'Home'},
  {href:'wait-time-board',  className:'fa fa-fw fa-tv',       title:'Wait Time Board', newTab:true},
  {href:'management',       className:'fa fa-fw fa-tv',       title:'Manage Wait Time Board'},
  {href:'faculty',          className:'fa fa-fw fa-user',     title:'Manage Faculty'},
]

function Sidebar({activeIndex}:{activeIndex:number}) {
  const { instance } = useMsal()

  const handleLogout = () => {
    instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/" // redirects the top level app after logout
    });
  }
  return (
    <SideBar>
      <img src="/logo.jpg" height="90"/>
      <br/>
      <br/>
      {sidebarLabels.map((x,i) => (
        <a key={i} href={x.href} target={x.newTab ? "_blank" : "_self"} rel={x.newTab ? "noopener noreferrer" : ""}>
          <i className={x.className}/>
          {activeIndex===i ? <strong>{x.title}</strong> : x.title}
        </a>
      ))}
      <LogoutButtonWrapper>
        <Button width="80%" onClick={() => handleLogout()}>Logout</Button>
      </LogoutButtonWrapper>
    </SideBar>
  )
}

export default Sidebar