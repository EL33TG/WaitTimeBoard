// Will separate into individual files by model later

import axios from 'axios'

export type IPhysician = {
  _id:string,
  name: string
}

export async function getPhysicians():Promise<IPhysician[]> {
  try {
    const res = await axios.get(`${process.env.REACT_APP_WEBSERVER_URI}/physicians`);
    const physicians:IPhysician[] = res.data.physicians
    return physicians
  } catch (e) {
    console.error(e);
    return []
  }
}

export async function addPhysician(physicianName:string):Promise<IPhysician> {
  try {
    const res = await axios.post(`${process.env.REACT_APP_WEBSERVER_URI}/physicians/add`, {
      physician_name: physicianName
    });
    const physician:IPhysician = res.data.newPhysician
    return physician
  } catch (e) {
    console.error(e);
  }
}

export async function deletePhysician(physicianId:string):Promise<void> {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_WEBSERVER_URI}/physicians/del`, {
      data: {"physician_id": physicianId}
    });
  } catch (e) {
    console.error(e);
  }
}