import express from "express";
import User from "../models/User.js";

const router = express.Router();

// SEARCH USERS
router.post("/", async (req, res) => {
  try {

    const { text } = req.body;

    if (!text) {
      return res.json([]);
    }

    const query = text.toLowerCase().trim();
    let filter = {};

    console.log("Query received:", query);

    // ===== AMOUNT BETWEEN =====
    const between = query.match(/between\s*(\d+)\s*and\s*(\d+)/);

    if (between) {
      const min = Number(between[1]);
      const max = Number(between[2]);

      filter = {
        amount: { $gte: min, $lte: max }
      };
    }

    // ===== AMOUNT GREATER =====
    else if (query.includes(">")) {

      const num = query.match(/\d+/);

      if (num) {
        filter = {
          amount: { $gt: Number(num[0]) }
        };
      }

    }

    // ===== AMOUNT LESS =====
    else if (query.includes("<")) {

      const num = query.match(/\d+/);

      if (num) {
        filter = {
          amount: { $lt: Number(num[0]) }
        };
      }

    }

    // ===== NAME CONTAINS =====
    else if (query.includes("name")) {

      const nameMatch = query.match(/contains\s*(\w+)/);

      if (nameMatch) {
        filter = {
          name: { $regex: nameMatch[1], $options: "i" }
        };
      }

    }

    console.log("Mongo Filter:", filter);

    const users = await User.find(filter);

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
});


// ===== ADD USER =====
router.post("/add", async (req, res) => {

  try {

    const { name, email, amount } = req.body;

    const user = new User({
      name,
      email,
      amount,
      registeredAt: new Date()
    });

    await user.save();

    res.json({
      message: "User added successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

export default router;