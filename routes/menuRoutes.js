const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const Person = require("../models/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("menu saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
});

//Get all Menus
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("menus fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("Internal server Error");
  }
});

router.get("/:tasteType", async (req, res) => {
  const tasteType = req.params.tasteType;
  try {
    if (tasteType == "sour" || tasteType == "spicy" || tasteType == "sweet") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
});


module.exports = router;
