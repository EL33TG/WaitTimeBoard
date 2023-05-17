import physician from "../models/physician.mjs";

/**
 * Get all physicians
 * @param req
 * @param res
 * @returns void
 */
export function getPhysicians(req, res) {
  physician.find().exec((err, physicians) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ physicians });
    console.log("Get physicians successfully");
  });
}

/**
 * Add a physician
 * @param req
 * @param res
 * @returns void
 */
export function addPhysician(req, res) {

  if (!req.body.physician_name) {
    return res.json({
      status: "error",
      msg: "physician_name is required",
    });
  }

  physician.find( {name: req.body.physician_name},
    function (err, physicians) {
      if (err) {
        return res.status(500).send(err)
      } else if (physicians.length !== 0) {
        return res.json({
          status: "error",
          msg: "Physician already exists!",
        });
      } else {
        const newPhysician = new physician({name: req.body.physician_name});

        newPhysician.save((err, saved) => {
          if (err) {
            return res.status(500).send(err);
          }

          return res.json({
            status: "success",
            msg: "Physician added successfully!",
            newPhysician: saved,
          });
        });
      }
    }
  );
}

/**
 * Delete a physician
 * @param req
 * @param res
 * @returns void
 */
export function deletePhysician(req, res) {
  physician
    .findOne({ _id: req.body.physician_id })
    .exec((err, physician_d) => {
      if (err) {
        res.status(500).send(err);
      }

      physician_d.remove(() => {
        res.json({
          status: "success",
          msg: "Physician deleted successfully!",
        });
      });
    });
}
