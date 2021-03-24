var express = require('express');
var router = express.Router();
//mongoDBs built-in function
const ObjectID = require('mongodb').ObjectID;

router.get('/appointments', (req, res, next) => {
  //callback reference to collection in DB
  //find all, to array, then json, catch error
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

//appointmen creation
router.post('/appointments', (req, res, next) => {
  const { appointmentDate, name, email } = req.body;
  //doing the "required"
  if (!appointmentDate || !name || !email) {
    return res.status(400).json({
      message: 'Appointment Date, Name and email are required',
    });
  }

  const payload = { appointmentDate, name, email };
  //insert into DB
  req.collection.insertOne(payload)
  //only returning MongoDBs ops part leaving out other information as for example connection details
    .then(result => res.json(result.ops[0]))
    .catch(error => res.send(error));
});

//endpoint that responds to delete
router.delete('/appointments/:id', (req, res, next) => {
  //extract path params
  const { id } = req.params;
  const _id = ObjectID(id);
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;
