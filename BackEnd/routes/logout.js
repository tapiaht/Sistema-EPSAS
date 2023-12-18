import express from "express";

import token from "../models/token.js";
import validateToken from "../auth/validateToken.js";

const router = express.Router();
router.delete("/", async function (req, res, next) {
  try {
    const refreshToken = validateToken(req.headers);

    // await token.findOneAndDelete ({ token: refreshToken });
    await token.destroy ({where:{ token: refreshToken }});
    res.json({
      success: "Token removed",
    });
  } catch (ex) {
    return next(new Error("Error logging out the user " + ex.message));
  }
});

export default router;
