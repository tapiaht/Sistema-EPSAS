import express from "express";
import User from "../schema/user.js";
import { jsonResponse } from "../lib/jsonResponse.js";

const router = express.Router();

router.post("/", async function (req, res, next) {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "username, password, and name are required",
      })
    );
  }

  try {
    const user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "username already exists",
        })
      );
    } else {
      const newUser = new User({ username, password, name });
      await newUser.save();

      res.json(
        jsonResponse(200, {
          message: "User created successfully",
        })
      );
    }
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creating user",
      })
    );
  }
});

export default router;
