import patient from "../models/patient.mjs";

/**
 * Get all patients
 * @param req
 * @param res
 * @returns void
 */
export function getPatients(req, res) {
  patient.find().exec((err, patients) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ patients });
    console.log("Get patients successfully");
  });
}

/**
 * Add a patient
 * @param req
 * @param res
 * @returns void
 */
export function addPatient(req, res) {
  console.log(req.body);

  if (!req.body.newPatient.nurse_id || !req.body.newPatient.name) {
    res.json({
      status: "error",
      msg: "patient_id and name is both required!",
    });
  }

  patient.find({ name: req.body.newPatient.name }, function (err, nurses) {
    if (!err && nurses.length !== 0) {
      res.json({
        status: "error",
        msg: "Patient already exist!",
      });
    } else {
      const newPatient = new patient(req.body.newPatient);

      newPatient.save((err, saved) => {
        if (err) {
          res.status(500).send(err);
        }

        res.json({
          status: "success",
          msg: "Patient added successfully!",
          newPatient: saved,
        });
      });
    }
  });
}

/**
 * Delete a patient
 * @param req
 * @param res
 * @returns void
 */
export function deletePatient(req, res) {
  nurse.findOne({ patient_id: req.body.patient_id }).exec((err, patient_d) => {
    if (err) {
      res.status(500).send(err);
    }

    patient_d.remove(() => {
      res.json({
        status: "success",
        msg: "Patient deleted successfully!",
      });
    });
  });
}
