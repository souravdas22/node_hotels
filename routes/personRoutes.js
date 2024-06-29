const express = require('express');
const router = express.Router();
const Person = require("../models/person");
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    //Create a new Person document using the Mongoose model
    const newPerson = new Person(data); // here data is passed in params to give data to the person

    //saving newperson in database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
});

//Get method to get the person data
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched Sucessfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
});

//Get person with type
router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef'|| workType == 'manager'||workType=='waiter') {
            const response = await Person.find({ work: workType });
            console.log("response fetched")
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid work type" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server Error");
    }
})

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
      const updatedPersonData = req.body;
      const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
          new: true, //Return the updated document
          runValidators:true  // Run Mongoose validation of models
      });
      if (!response) {
          return res.status(404).json({ error: 'Person not found' });// if id is not valid
      }
      console.log('data updated')
      res.status(200).json(response);
      
  } catch (err) {
      console.log(err);
      res.status(500).json("Internal server Error");
  }
});

//delete person
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId)
        if (!response) {
            res.status(404).json('Person not found');
        }
        console.log('data deleted');
        res.status(200).json({ message: "Person deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal server Error");
    }
})


module.exports = router;