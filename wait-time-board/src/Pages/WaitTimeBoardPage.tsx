import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import List from '../Components/ClinicRows'
import { IPhysician, getPhysicians } from '../Queries/Physician';
import { IClinic, getClinics } from '../Queries/Clinic';
import { INurse, getNurses } from '../Queries/Nurse';
import { IRows } from '../Components/ClinicRows';
import { IRow, IColumn, IColumnType } from '../Components/Row'


const PageWrapper = styled.div`
  display: flex;
  width: 100%;
`

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 10px;
  width: 100%;
  background-color:red;
`

const TimestampWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 12px;
`

const ToolWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 20px;
  & a {
    padding:4px;
    &:hover {
      cursor: pointer;
    }
  }
`

const TitleWrapper = styled.div`
  width: 33%;
  background-color: white;
  padding: 20vh 0;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  & > h1 {
    font-size: 3rem;
    margin-bottom: 60px;
  }
`
const WaitTimeBoardWrapper = styled.div`
  background-color: #d4dadb;
  height:100vh;
  width: 67%;
  padding: 180px 24px;
  & > table {
    width: 100%;
    & th {
      font-size: 2rem;
      border-bottom: 6px solid #ebeeef;
    }
    & td {
      font-size: 1.8rem;
      border: 6px solid #ebeeef;
    }
  }
`

function WaitTimeManagement() {
  // current wait time board data
  const [appData, setAppData] = useState<{clinics:IClinic[], nurses:INurse[], physicians:IPhysician[]}>({
    clinics:[],
    nurses:[],
    physicians:[]
  })
  
  // wait time board rows; derived from clinics, physicians, and nurses
  const [WTBRows, setWTBRows] = useState<IRows>([])

  const [isFullscreen, setIsFullScreen] = useState<boolean>(false)


  // last time updated
  const [lastUpdated, setLastUpdated] = useState<string>((new Date).toString())

  // refresh app data from webserver
  const fetchData = async () => {
    try {
      const queriedClinics = await getClinics()
      const queriedPhysicians = await getPhysicians()
      const queriedNurses = await getNurses()
      setAppData({
        clinics: queriedClinics,
        nurses: queriedNurses,
        physicians: queriedPhysicians
      })

      // update timestamp
      setLastUpdated((new Date).toString())
    } catch { console.error("error on page initialization. Please reload the page")}
  }
  // initialize app data from server, set interval to auto update
  useEffect(() => {
    fetchData()

    let interval = setInterval(fetchData, 45000);
    return () => {
      clearInterval(interval);
    };
  },[])

  setInterval(fetchData,300000)

  // update Wait Time Board (WTB) based on nurses, physicians, and clinics
  useEffect(() => {
    const newWTBRows:IRows = appData.clinics.map(clinic => {
      const row:IRow = {
        id: clinic._id,
        items: [
          appData.physicians.find(physician => physician._id === clinic.physician_id).name,
          appData.nurses.find(nurse => nurse._id === clinic.nurse_id).name,
          clinic.waittime.toString(),
        ]
      }
      return row
    })
    setWTBRows(newWTBRows.sort(sorter))
  },[appData])

  // comparater function to handle sorting of data in list
  // alphabetical ascending by Physician
  const sorter = (row1:IRow,row2:IRow) => {return row1.items[0].localeCompare(row2.items[0])}


  function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true)
    } else {
      console.log("Unable to open window in full screen. Press F11 to open manually.")
    }
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false)
    } else {
      console.log("Unable to close window in full screen. Press ESC to close manually.")
    }
  }
    
  return (
    <>
      <PageWrapper>
        <TitleWrapper>
          <h1>Patient Wait Time Board</h1>
          <img src="/logo.jpg" height="140"/>
        </TitleWrapper>
        <WaitTimeBoardWrapper>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Physician Name</th>
                <th>Nurse Name</th>
                <th>Wait Time (Minutes)</th>
              </tr>
            </thead>
            <tbody>
              {WTBRows.map(row => (
                <tr>
                  <td>{row.items[0]}</td>
                  <td>{row.items[1]}</td>
                  <td>{row.items[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </WaitTimeBoardWrapper>
      </PageWrapper>
      <TimestampWrapper><strong>Last Updated:</strong><div>{lastUpdated}</div></TimestampWrapper>
      <ToolWrapper>
        {(isFullscreen) ? (
          <a onClick={() => closeFullscreen()}><span style={{fontSize: "40px"}} className="material-icons-outlined">fullscreen_exit</span></a>
        ) : (
          <a onClick={() => openFullscreen()}><span style={{fontSize: "40px"}} className="material-icons-outlined">fullscreen</span></a>
        )}
      </ToolWrapper>
      <TopBar/>
    </>
  )
}

export default WaitTimeManagement