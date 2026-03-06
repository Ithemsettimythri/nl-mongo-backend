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

    // amount between X and Y
    const betweenMatch = query.match(/amount\s*between\s*(\d+)\s*and\s*(\d+)/);
    if (betweenMatch) {
      filter.amount = {
        $gte: Number(betweenMatch[1]),
        $lte: Number(betweenMatch[2])
      };
    }

    // amount > number
    else if (query.match(/amount\s*>\s*(\d+)/)) {
      const num = query.match(/amount\s*>\s*(\d+)/)[1];
      filter.amount = { $gt: Number(num) };
    }

    // amount < number
    else if (query.match(/amount\s*<\s*(\d+)/)) {
      const num = query.match(/amount\s*<\s*(\d+)/)[1];
      filter.amount = { $lt: Number(num) };
    }

    // name contains word
    else if (query.match(/name\s*contains\s*(\w+)/)) {
      const word = query.match(/name\s*contains\s*(\w+)/)[1];
      filter.name = { $regex: word, $options: "i" };
    }

    console.log("User query:", query);
    console.log("Mongo filter:", filter);

    const users = await User.find(filter);

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ADD USER
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
    res.status(500).json({ error: error.message });
  }
});

export default router;