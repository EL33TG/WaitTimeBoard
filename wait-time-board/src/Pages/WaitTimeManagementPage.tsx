import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import List, { IRows } from '../Components/ClinicRows'
import { IColumns, IColumn, IColumnType } from '../Components/Row'
import { IRow } from '../Components/Row'
import Modal from "react-bootstrap/Modal";

import Sidebar from '../Components/Sidebar';
import Titlebar from '../Components/Titlebar';
import PageContentWindow from '../Components/PageContentWindow';
import NewClinicForm from '../Components/NewClinicForm'
import NewNursePhysicianForm, { IFacultyType } from '../Components/NewFacultyForm'
import Button from '../Components/Button';

import { IClinic, getClinics, addClinicGroup, updateClinic, deleteClinic, logClinic } from '../Queries/Clinic'
import { IPhysician, getPhysicians } from '../Queries/Physician'
import { INurse, getNurses } from '../Queries/Nurse'

const WaitTimeManagementWrapper = styled.div`
  width: 100%;
  padding: 40px 0;
`


export const WAIT_TIME_BOARD_COLUMNS:IColumns = [
  {
    header: "Physician",
    type: IColumnType.DROPDOWN
  },
  {
    header: "Nurse",
    type: IColumnType.DROPDOWN
  },
  {
    header: "Wait Time",
    type: IColumnType.STRING
  }
]
export type IDropdownMaps = Array<{columnIndex:number, dropdownMap:IColumn["dropdownMap"]}>

function WaitTimeManagement() {
  // holds clinic, nurse, and physician data
  const [appData, setAppData] = useState<{
    clinics:IClinic[],
    nurses:INurse[],
    physicians:IPhysician[]
  }>({ clinics:[], nurses:[], physicians:[] })

  // whether or not the modal is being shown
  const [showModal, setShowModal] = useState<boolean>(false)
  // wait time board rows; derived from clinics, physicians, and nurses
  const [WTBRows, setWTBRows] = useState<IRows>([])
  // wait time board dropdown keys; dynamically updated drop down options based on column and that column's values
  const [dropdownMaps, setdropdownMaps] = useState<IDropdownMaps>([])

  // initialize app data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queriedClinics = await getClinics()
        const queriedPhysicians = await getPhysicians()
        const queriedNurses = await getNurses()
        setAppData({ clinics: queriedClinics, nurses:queriedNurses, physicians: queriedPhysicians})
      } catch { console.error("error on page initialization. Please reload the page")}
      
    }
    fetchData()
  },[])

  // update Wait Time Board (WTB) and dropdownMaps based on nurses, physicians, and clinics
  useEffect(() => {
    console.log({...appData})
    const newWTBRows:IRows = appData.clinics.map(clinic => {
      const rowPhysician = appData.physicians.find(physician => physician._id === clinic.physician_id)._id
      const rowNurse = appData.nurses.find(nurse => nurse._id === clinic.nurse_id)._id
      const row:IRow = {
        id: clinic._id,
        items: [
          rowPhysician,
          rowNurse,
          clinic.waittime.toString(),
        ]
      }
      return row
    })
    setWTBRows(newWTBRows)

    const dropdownColumns = WAIT_TIME_BOARD_COLUMNS.filter(col => col.type === IColumnType.DROPDOWN)
    const physicianDropdownMap:IColumn["dropdownMap"] = appData.physicians.map(physician => ({
      id:physician._id,
      value: physician.name
    }))
    const nurseDropdownMap:IColumn["dropdownMap"] = appData.nurses.map(nurse => ({
      id:nurse._id,
      value: nurse.name
    }))
    const newdropdownMaps:IDropdownMaps = dropdownColumns.map((col,i) => ({
      columnIndex: i,
      dropdownMap: col.header === "Physician" ? physicianDropdownMap : nurseDropdownMap
    }))
    setdropdownMaps(newdropdownMaps)
  },[appData])

  // comparater function to handle sorting of data in list
  // const sorter = (item1:IListItemData, item2:IListItemData) => item2.waitTimeMinutes - item1.waitTimeMinutes;
  const sorter = (a,b) => {return 0} // dont sort

  // log clinic
  const addLog = async (clinic:IClinic) => {
    const timestamp = new Date();
    await logClinic(clinic._id,clinic.nurse_id,clinic.physician_id,timestamp.toDateString(), clinic.waittime)
  }

  const handleClinicRowUpdate = async (
    rowId:IRow["id"],
    physicianId:IClinic["physician_id"],
    nurseId:IClinic["nurse_id"],
    waitTime:IClinic["waittime"]
  ) => {
    try {
      const updatedClinic:IClinic = await updateClinic(rowId, physicianId, nurseId, waitTime)
      const newClinics:IClinic[] = appData.clinics.map(clinic => {
        if (clinic._id === rowId) {
          return {
            _id: updatedClinic._id,
            physician_id: updatedClinic.physician_id,
            nurse_id: updatedClinic.nurse_id,
            waittime: updatedClinic.waittime
          }
        } else { return clinic }
      })

      setAppData({...appData, clinics: newClinics})
      await addLog(updatedClinic)
    } catch {
      throw new Error("could not update clinic. Please try again...")
    }
  }
  const handleClinicRowDelete = async (rowId:IRow["id"]) => {
    try {
      await deleteClinic(rowId)
      const queriedClinics = await getClinics()
      const queriedPhysicians = await getPhysicians()
      const queriedNurses = await getNurses()
      setAppData({ clinics: queriedClinics, nurses:queriedNurses, physicians: queriedPhysicians})
    } catch { console.error("error on Clinic Deletion. Please reload the page")}
  }
  const handleNewClinicSubmitForm = async (
    physicianName:IPhysician["name"],
    nurseName:INurse["name"],
    waitTime:IClinic["waittime"]
  ) => {
    const newClinic:IClinic = await addClinicGroup(physicianName, nurseName, waitTime)
    const queriedPhysicians = await getPhysicians()
    const queriedNurses = await getNurses()
    setAppData(prev => {return {
      nurses: queriedNurses,
      physicians: queriedPhysicians,
      clinics: [newClinic, ...prev.clinics]
    }})
    setShowModal(false)
  }

  return appData && (
    <>
      <Sidebar activeIndex={2}/>
      <Titlebar title='Management Page' subtitle='Wait Time Board Management Page'/>
      <PageContentWindow>
        <WaitTimeManagementWrapper>
          {dropdownMaps.length !== 0 &&
          <List
            rows={WTBRows}
            updateRow={handleClinicRowUpdate}
            deleteRow={handleClinicRowDelete}
            sortFunction={sorter}
            columns={WAIT_TIME_BOARD_COLUMNS.map((col,i) => {
              const column:IColumn = { ...col }
              if (col.type === IColumnType.DROPDOWN) {
                column.dropdownMap = dropdownMaps.find(ddm => ddm.columnIndex === i).dropdownMap
              }
              return column
            })}
          />}
          <Button onClick={() => {
            setShowModal(true)
          }}>Add New</Button>

          {/* Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header>Add New Clinic</Modal.Header>
              <Modal.Body>
                <NewClinicForm onSubmitForm={handleNewClinicSubmitForm} />
              </Modal.Body>
          </Modal>
        </WaitTimeManagementWrapper>
      </PageContentWindow>
    </>
  )
}

export default WaitTimeManagement