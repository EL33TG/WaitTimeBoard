import React, {useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IClinic } from '../Queries/Clinic';
import { IPhysician } from '../Queries/Physician'
import { INurse } from '../Queries/Nurse'

type NewRowFormProps = {
  onSubmitForm: (
    physicianName:IPhysician["name"],
    nurseName:INurse["name"],
    waitTime:IClinic["waittime"]
  ) => void
}
function NewRowForm({onSubmitForm}:NewRowFormProps) {

  // array of input refs to track changes for each field
  const physicianRef = useRef<HTMLInputElement>();
  const nurseRef = useRef<HTMLInputElement>();
  const waittimeRef = useRef<HTMLInputElement>();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const physicianName:IPhysician["name"] = physicianRef.current.value
    const nurseName:INurse["name"] = nurseRef.current.value
    const waitTime:IClinic["waittime"] =  parseInt(waittimeRef.current.value)
    onSubmitForm(physicianName, nurseName, waitTime)
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Physician</Form.Label>
        <Form.Control
          required={true}
          ref={physicianRef}
          type='text'
          placeholder='Dr. Brutus'
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nurse</Form.Label>
        <Form.Control
          required={true}
          ref={nurseRef}
          type='text'
          placeholder='Buckeye'
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Wait Time (Minutes)</Form.Label>
        <Form.Control
          required={true}
          ref={waittimeRef}
          type='number'
          placeholder='42'
        />
      </Form.Group>

      <Button style={{borderRadius:"25px", padding:"6px 20px"}} type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
  )
}

export default NewRowForm