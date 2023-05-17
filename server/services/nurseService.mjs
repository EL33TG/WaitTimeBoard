import nurse from "../models/nurse.mjs";

/**
 * Get all nurses
 * @param req
 * @param res
 * @returns void
 */
export function getNurses(req, res) {
  nurse.find().exec((err, nurses) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ nurses });
    console.log("Get nurses successfully");
  });
}

/**
 * Add a nurse
 * @param req
 * @param res
 * @returns void
 */
export function addNurse(req, res) {
  if (!req.body.nurse_name) {
    res.json({
      status: "error",
      msg: "nurse_name is required",
    });
  }

  nurse.find({ name: req.body.nurse_name }, function (err, nurses) {
    if (err) {
      return res.status(500).send(err)
    } else if (nurses.length !== 0) {
      res.json({
        status: "error",
        msg: "Nurse already exist!",
      });
    } else {
      const newNurse = new nurse({name: req.body.nurse_name});

      newNurse.save((err, saved) => {
        if (err) {
          return res.status(500).send(err);
        }

        return res.json({
          status: "success",
          msg: "Nurse added successfully!",
          newNurse: saved,
        });
      });
    }
  });
}

/**
 * Delete a nurse
 * @param req
 * @param res
 * @returns void
 */
export function deleteNurse(req, res) {
  if (!req.body.nurse_id) {
    return res.json({
      status: "error",
      msg: "nurse_id is required",
    });
  }
  nurse.findOne({ _id: req.body.nurse_id }).exec((err, nurse_d) => {
    if (err) {
      return res.status(500).send(err);
    }

    nurse_d.remove(() => {
      return res.json({
        status: "success",
        msg: "Nurse deleted successfully!",
      });
    });
  });
}
