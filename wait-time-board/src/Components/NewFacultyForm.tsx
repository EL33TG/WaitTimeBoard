import React, {useState, useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IClinic } from '../Queries/Clinic';

export type IFacultyType = "Nurse" | "Physician"
type NewFacultyFormProps = {
  onSubmitForm: ( name:IClinic["physician_id"], facultyType: string ) => void
}
function NewFacultyForm({onSubmitForm}:NewFacultyFormProps) {

  // array of input refs to track changes for each field
  const nameRef = useRef<HTMLInputElement>();
  const [facultyType, setFacultyType] = useState<IFacultyType>("Nurse");


  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const name:string = nameRef.current.value
    onSubmitForm(name, facultyType)
  }

  const handleRadioChange = (e) => {
    e.persist()
    setFacultyType(e.target.value)
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name of Faculty</Form.Label>
        <Form.Control
          type='text'
          ref={nameRef}
          required={true}
          placeholder={"Brutus Buckeye"}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Faculty Type</Form.Label>
        <Form.Check
          value="Physician"
          type="radio"
          aria-label="Physician"
          label="Physician"
          onChange={handleRadioChange}
          checked={facultyType === "Physician"}
        />
        <Form.Check
          value="Nurse"
          type="radio"
          aria-label="Nurse"
          label="Nurse"
          onChange={handleRadioChange}
          checked={facultyType === "Nurse"}
        />
      </Form.Group>

      <Button style={{borderRadius:"25px", padding:"6px 20px"}} type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
  )
}

export default NewFacultyForm