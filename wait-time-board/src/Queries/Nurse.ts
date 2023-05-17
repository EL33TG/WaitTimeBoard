// Will separate into individual files by model later

import axios from 'axios'

export type INurse = {
  _id:string,
  name: string
}

export async function getNurses():Promise<INurse[]> {
  try {
    const res = await axios.get(`${process.env.REACT_APP_WEBSERVER_URI}/nurses`);
    const nurses:INurse[] = res.data.nurses
    return nurses
  } catch (e) {
    console.error(e);
    return []
  }
}

export async function addNurse(nurseName: string):Promise<INurse> {
  try {
    const res = await axios.post(`${process.env.REACT_APP_WEBSERVER_URI}/nurses/add`, {
      nurse_name: nurseName
    });
    const newNurse:INurse = res.data.newNurse
    return newNurse
  } catch (e) {
    console.error(e);
  }
}

export async function deleteNurse(nurseId:string):Promise<void> {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_WEBSERVER_URI}/nurses/del`, {
      data: {"nurse_id": nurseId}
    });
  } catch (e) {
    console.error(e);
  }
}