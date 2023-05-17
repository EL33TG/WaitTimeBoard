// Will separate into individual files by model later

import axios from 'axios'

export async function addWaitTime(WaitTime:any) {
  try {
    const res = await axios.post('/waitingTimes/add', WaitTime);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

export async function getWaitTimes() {
  try {
    const res = await axios.get('/waitingTimes');
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

export async function updateWaitTime(newWaitTime:any) {
  try {
    const res = await axios.post('/waitingTimes/update', newWaitTime);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

export async function deleteWaitTime(WaitTimeId:string) {
  try {
    const res = await axios.post('/waitingTimes/del', WaitTimeId);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}