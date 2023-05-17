// Will separate into individual files by model later

import axios from 'axios'

export async function addPatient(patient:any) {
  try {
    const res = await axios.post('/patients/add', patient);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

export async function getPatients() {
  try {
    const res = await axios.get('/patients');
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

export async function updatePatient(newPatient:any) {
  try {
    const res = await axios.post('/patients/update', newPatient);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

export async function deletePatient(PatientId:string) {
  try {
    const res = await axios.post('/patients/del', PatientId);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}