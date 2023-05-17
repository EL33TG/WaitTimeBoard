import axios from 'axios'

export type IClinic = {
  _id:string,
  nurse_id: string,
  physician_id: string,
  waittime: number
}


export async function getClinics():Promise<IClinic[]> {
  try {
    const res = await (await axios.get(`${process.env.REACT_APP_WEBSERVER_URI}/clinics`));
    const clinics:IClinic[] = res.data.clinics
    console.log(res);
    return clinics
  } catch (e) {
    console.error(e);
    return []
  }
}

export async function addClinicGroup(physicianName: string, nurseName: string, waitTime: number):Promise<IClinic> {
  try {
    const res = await axios.post(`${process.env.REACT_APP_WEBSERVER_URI}/clinics/add-group`, {
      nurse_name: nurseName,
      physician_name: physicianName,
      waittime: waitTime
    });
    const clinic:IClinic = res.data.newClinic
    return clinic
  } catch (e) {
    console.error(e);
  }
}

export async function updateClinic(clinicId:string, physicanId: IClinic["physician_id"], nurseId:IClinic["nurse_id"], waitTime:IClinic["waittime"]) {
  try {
    const res = await axios.put(`${process.env.REACT_APP_WEBSERVER_URI}/clinics/update`, {
      clinic_id: clinicId,
      physician_id: physicanId,
      nurse_id: nurseId,
      waittime: waitTime
    });
    const updatedClinic:IClinic = res.data.updatedClinic
    return updatedClinic
  } catch (e) {
    console.error(e);
  }
}

export async function deleteClinic(clinicId:string):Promise<void> {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_WEBSERVER_URI}/clinics/del`, {
      data: {"clinic_id":clinicId}
    });
  } catch (e) {
    console.error(e);
  }
}

export async function logClinic(clinicId:string,nurseId:string,physicianId:string,timestamp:string,waittime:number):Promise<void> {
  try {
    const res = await axios.post(`${process.env.REACT_APP_WEBSERVER_URI}/logs/add`, {
      "newWaitingTime": {
        "clinic_id":clinicId,
        "nurse_id":nurseId,
        "physician_id":physicianId,
        "timestamp":timestamp,
        "waittime":waittime
      }
    });
  } catch (e) {
    console.error(e);
  }
}
export async function getLog():Promise<any> {
  try {
    const res = await axios.get(`${process.env.REACT_APP_WEBSERVER_URI}/logs`);
    return res.data
  } catch (e) {
    console.error(e);
  }
}