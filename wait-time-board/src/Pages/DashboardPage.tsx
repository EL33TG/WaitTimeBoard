import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageContentWindow from '../Components/PageContentWindow';
import Sidebar from '../Components/Sidebar';
import Titlebar from '../Components/Titlebar';
import { IClinic, getClinics } from '../Queries/Clinic';
import { IPhysician, getPhysicians } from '../Queries/Physician';
import { INurse, getNurses } from '../Queries/Nurse';

const ContainerMain = styled.div`
	width: 100%;
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
  flex-direction:column;
	justify-content: center;
`;

const GridContainer = styled.div<{ gTemplate: string }>`
	display: grid;
	grid-template: ${(props) => props.gTemplate};
	grid-gap: 10px;
	background-color: #ebeeef;
	padding: 10px;
`;

const CardWrapper = styled.div<{color:string}>`
  background-color: ${(props) => props.color};
  border-top: 6px solid red;
  border-radius: 4px;
  text-align: center;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & > div {
    font-size: 20px;
  }
  & > h2 {
    font-size: 50px;
  }
`

type ICardProps = {
  title: string,
  value: string,
  color: string,
}
function Card({title,value, color}:ICardProps) {
  return (
    <CardWrapper color={color}>
      <h2>{value}</h2>
      <div>{title}</div>
    </CardWrapper>
  )
}

function DashboardPage() {
  // holds clinic, nurse, and physician data
  const [appData, setAppData] = useState<{
    clinics:IClinic[],
    nurses:INurse[],
    physicians:IPhysician[]
  }>({ clinics:[], nurses:[], physicians:[] })

  const fetchData = async () => {
    try {
      const queriedClinics = await getClinics()
      const queriedPhysicians = await getPhysicians()
      const queriedNurses = await getNurses()
      setAppData({ clinics: queriedClinics, nurses:queriedNurses, physicians: queriedPhysicians})
    } catch { console.error("error on page initialization. Please reload the page") }
  }

  // fetch data
  useEffect(() => {
    fetchData()
  },[])

	return (
    <>
      <Sidebar activeIndex={0}/>
      <Titlebar title='Dashboard Page' subtitle='The James Medical Center Patient Wait Time Board'/>
      <PageContentWindow>
        <ContainerMain>
          <h3>Current Status</h3>
          <hr/>
          <GridContainer gTemplate={'200px / auto auto auto auto'}>
            <Card
              color='rgba(255, 255, 255, 0.8)'
              title="Highest Wait Time"
              value={Math.max(...appData.clinics.map(o => o.waittime)).toString()}/>
            <Card
              color='rgba(255, 255, 255, 0.8)'
              title="Total Clinics"
              value={appData.clinics.length.toString()}/>
            <Card
              color='rgba(255, 255, 255, 0.8)'
              title="Active Physicians"
              value={
                appData.physicians.filter(phys=> appData.clinics.some(clinic => clinic.physician_id === phys._id)).length.toString()
                + " of " +
                appData.physicians.length.toString()
                }/>
            <Card
              color='rgba(255, 255, 255, 0.8)'
              title="Active Nurses"
              value={
                appData.nurses.filter(nurse=> appData.clinics.some(clinic => clinic.nurse_id === nurse._id)).length.toString()
                + " of " +
                appData.nurses.length.toString()
                }/>
          </GridContainer>
          <br/>
          <h3>Summary</h3>
          <hr/>
          <GridContainer gTemplate={'200px / auto auto auto'}>
            <Card color='#ffffffcc' title="Average Wait Time (Hour)" value="12 minutes"/>
            <Card color='#ffffffcc' title="Average Wait Time (Day)" value="17 minutes"/>
            <Card color='#ffffffcc' title="Average Wait Time (Week)" value="41 minutes"/>
          </GridContainer>
        </ContainerMain>
      </PageContentWindow>
    </>
	);
}

export default DashboardPage
