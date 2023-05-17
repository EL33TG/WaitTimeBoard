import waitingTime from "../models/waitingTime.mjs";

/**
 * Get all waitingTime
 * @param req
 * @param res
 * @returns void
 */
export function getWaitingTime(req, res) {
  waitingTime.find().exec((err, waitingTimes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ waitingTimes });
    console.log("Get waitingTimes successfully!");
  });
}

/**
 * Add a waitingTime
 * @param req
 * @param res
 * @returns void
 */
export function addWaitingTime(req, res) {
  console.log(req.body);

  if (
    !req.body.newWaitingTime.clinic_id ||
    !req.body.newWaitingTime.nurse_id ||
    !req.body.newWaitingTime.physician_id ||
    !req.body.newWaitingTime.timestamp ||
    !req.body.newWaitingTime.waittime
  ) {
    res.json({
      status: "error",
      msg: "Parameters insufficient!",
    });
  }

  const newWaitingTime = new waitingTime(req.body.newWaitingTime);

  newWaitingTime.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({
      status: "success",
      msg: "WaitingTime added successfully!",
      newWaitingTime: saved,
    });
  });
}
