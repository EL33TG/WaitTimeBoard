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

import { IClinic, getClinics } from '../Queries/Clinic'
import { IPhysician, getPhysicians, addPhysician, deletePhysician } from '../Queries/Physician'
import { INurse, getNurses, addNurse, deleteNurse } from '../Queries/Nurse'

const FacultyManagementWrapper = styled.div`
  width: 100%;
  padding: 40px 0;
`

const FACULTY_COLUMNS:IColumns = [
 { header: "Faculty Name", type: IColumnType.STRING},
 { header: "Role", type: IColumnType.STRING},
]

function FacultyManagement() {
  // holds clinic, nurse, and physician data
  const [faculty, setFaculty] = useState<{nurses:INurse[], physicians:IPhysician[]}>({nurses:[], physicians:[] })
  // whether or not the modal is being shown
  const [showModal, setShowModal] = useState<boolean>(false)
  // Faculty board rows; combination of physicians, and nurses
  const [FBRows, setFBRows] = useState<IRows>([])

  // initialize app data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queriedPhysicians = await getPhysicians()
        const queriedNurses = await getNurses()
        setFaculty({ nurses:queriedNurses, physicians: queriedPhysicians})
      } catch { console.error("error on page initialization. Please reload the page")}
    }
    fetchData()
  },[])

  // update Wait Time Board (WTB) and dropdownMaps based on nurses, physicians, and clinics
  useEffect(() => {
    const newFBRows_Physicians:IRows = faculty.physicians.map(physician => {
      const row:IRow = { id: physician._id, items: [ physician.name, "Physician" ] }
      return row
    })
    const newFBRows_Nurses:IRows = faculty.nurses.map(nurse => {
      const row:IRow = { id: nurse._id, items: [ nurse.name, "Nurse" ] }
      return row
    })
    const newFBRows:IRows = newFBRows_Physicians.concat(newFBRows_Nurses)
    setFBRows(newFBRows)

  },[faculty])

  // comparater function to handle sorting of data in list
  // const sorter = (item1:IRow, item2:IListItemData) => item2.waitTimeMinutes - item1.waitTimeMinutes;
  const sorter = (row1:IRow,row2:IRow) => {return row1.items[0].localeCompare(row2.items[0])} // alphabetical ascending

  const handleFacultyRowDelete = async (rowId:IRow["id"]) => {
    const row:IRow = FBRows.find(row => row.id === rowId)
    const clinics:IClinic[] = await getClinics()
    if (row.items[1] === "Physician") {
      if (clinics.some(clinic => clinic.physician_id === row.id)) {
        alert(`Cannot delete Physician. Please remove ${row.items[0]} from their clinic before deleting them.`)
      } else { await deletePhysician(row.id) }
    } else {
      if (clinics.some(clinic => clinic.nurse_id === row.id)) {
        alert(`Cannot delete Nurse. Please remove ${row.items[0]} from their clinic before deleting them.`)
      } else { await deleteNurse(row.id) }
    }

    // update Faculty Board Rows
    try {
      const queriedPhysicians = await getPhysicians()
      const queriedNurses = await getNurses()
      setFaculty({ nurses:queriedNurses, physicians: queriedPhysicians})
    } catch { console.error("error removing faculty. Please reload the page")}
  }

  const handleNewFacultySubmitForm = async (name:string, facultyType:IFacultyType) => {
    if (facultyType === "Physician") {
      const newPhysician = await addPhysician(name)
      setFaculty(prev => {return {
        ...prev,
        physicians: [...prev.physicians, newPhysician]
      }})
    } else {
      const newNurse = await addNurse(name)
      setFaculty(prev => {return {
        ...prev,
        nurses: [...prev.physicians, newNurse]
      }})
    }
    setShowModal(false)
  }
    
  return faculty && (
    <>
      <Sidebar activeIndex={3}/>
      <Titlebar title='Management Page' subtitle='Faculty Management Page'/>
      <PageContentWindow>
        <FacultyManagementWrapper>
          {FBRows.length !== 0 &&
          <List
            isEditable={false}
            rows={FBRows}
            updateRow={()=>{}}
            deleteRow={handleFacultyRowDelete}
            sortFunction={sorter}
            columns={FACULTY_COLUMNS}
          />}
          <Button onClick={() => {
            setShowModal(true)
          }}>Add New</Button>

          {/* Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header>Add New Faculty</Modal.Header>
            <Modal.Body>
              <NewNursePhysicianForm onSubmitForm={handleNewFacultySubmitForm} />
            </Modal.Body>
          </Modal>
        </FacultyManagementWrapper>
      </PageContentWindow>
    </>
  )
}

export default FacultyManagement