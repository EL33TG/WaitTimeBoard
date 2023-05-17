import clinic from "../models/clinic.mjs";
import physician from "../models/physician.mjs";
import nurse from "../models/nurse.mjs";

/**
 * Get all Clinics
 * @param req
 * @param res
 * @returns void
 */
export function getClinics(req, res) {
  clinic.find().exec((err, clinics) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ clinics });
    console.log("Get clinics successfully");
  });
}

/**
 * Add a Clinic
 * @param req
 * @param res
 * @returns void
 */
export function addClinic(req, res) {
  console.log(req.body);

  if (
    !req.body.newClinic.nurse_id ||
    !req.body.newClinic.physician_id ||
    !req.body.newClinic.waittime
  ) {
    return res.json({
      status: "error",
      msg: "Parameters insufficient!",
    });
  }

  clinic.find(
    { physician_id: req.body.newClinic.physician_id },
    function (err, clinics) {
      if (!err && clinics.length !== 0) {
        res.json({
          status: "error",
          msg: "WaitingTime already exist!",
        });
      } else {
        const newClinic = new clinic(req.body.newClinic);

        newClinic.save((err, saved) => {
          if (err) {
            res.status(500).send(err);
          }

          res.json({
            status: "success",
            msg: "Clinic added successfully!",
            newClinic: saved,
          });
        });
      }
    }
  );
}

/**
 * Delete a Clinic
 * @param req
 * @param res
 * @returns void
 */
export function deleteClinic(req, res) {
  console.log(req.body)
  if (!req.body.clinic_id) {
    return res.json({
      status: "error",
      msg: "Parameters insufficient. Requires clinic_id",
    });
  }

  clinic.findOne({ _id: req.body.clinic_id }).exec((err, clinic_d) => {
    if (err) {
      return res.status(500).send(err);
    }
    
    clinic_d.remove(() => {
      return res.json({
        status: "success",
        msg: "Clinic deleted successfully!",
      });
    });
  })
}

/**
 * Update a Clinic
 * @param req
 * @param res
 * @returns void
 */
export function updateClinic(req, res) {

  if ( !req.body.clinic_id || (!req.body.nurse_id && !req.body.physician_id &&!req.body.waittime) ) {
    return res.json({
      status: "error",
      msg: "Parameters insufficient. Requires Clinic _id AND at least one updated value",
    });
  }
  clinic.findOne({ _id: req.body.clinic_id })
    .exec((err, targetClinic) => {
      if (err) { return res.status(500).send(err) }

      if (req.body.nurse_id) {targetClinic.nurse_id = req.body.nurse_id}
      if (req.body.physician_id) {targetClinic.physician_id = req.body.physician_id}
      if (req.body.waittime) {targetClinic.waittime = req.body.waittime}
      
      targetClinic.save((err, saved) => {
        if (err) { return res.status(500).send(err) }

        return res.json({
          status: "success",
          msg: "Clinic updated successfully!",
          updatedClinic: saved,
        });
      });
    });
}

/**
 * add a Clinic and create the subsequent Physicians and Nurses
 * @param req
 * @param res
 * @returns void
 */
 export function createGroupClinic(req, res) {
  console.log(req.body);

  if (
    !req.body.nurse_name ||
    !req.body.physician_name ||
    !req.body.waittime
  ) {
    return res.json({
      status: "error",
      msg: "Parameters insufficient",
    });
    return
  }

  const newPhysician = new physician({name:req.body.physician_name})
  const newNurse = new nurse({name:req.body.nurse_name})
  // create physician
  newPhysician.save((err,savedPhysician) => {
    if (err) {
      res.status(500).send(err)
    } else {
      // create nurse
      newNurse.save((err,savedNurse) => {
        if (err) {
          physician.deleteOne({ _id:physician.id }) // clean up on error
          res.status(500).send(err)
        } else {
          // create clinic
          const newClinic = new clinic({
            physician_id: newPhysician.id,
            nurse_id: newNurse.id,
            waittime: req.body.waittime
          })
          console.log("new clinic document:")
          console.log(newClinic)
          newClinic.save((err,saved) => {
            if (err) {
              physician.deleteOne({ _id:physician.id }) // clean up on error
              nurse.deleteOne({ _id:nurse.id}) // clean up on error
              res.status(500).send(err);
            } else {
              res.json({
                status: "success",
                msg: "Clinic added successfully!",
                newClinic: saved,
              });
            }
          })
        }
      })
    }
  })
 }