import express from "express";
import { jsonResponse } from "../lib/jsonResponse.js";
import log from "../lib/trace.js";
import { verifyRefreshToken } from "../auth/verify.js";
import { generateAccessToken } from "../auth/sign.js";
import getUserInfo from "../lib/getUserInfo.js";
import Token from "../models/token.js";

const router = express.Router();

router.post("/", async function (req, res, next) {
  //log.info("POST /api/refresh-token");

  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    console.log("No se proporcionó token de actualización", refreshToken);
    return res
      .status(401)
      .json({ error: "Token de actualización no proporcionado" });
  }

  try {
    const tokenDocument = await Token.findOne({where: { token: refreshToken }});

    if (!tokenDocument) {
      
      console.log("mostrando body de refresh token "+tokenDocument)
      return res.status(403).json({ error: "Token de actualización inválido" });
    }
    const payload = verifyRefreshToken(tokenDocument.token);
    const accessToken = generateAccessToken(getUserInfo(payload.user));
    res.json(jsonResponse(200, { accessToken }));
  } catch (error) {
    return res.status(403).json({ error: "Token de actualización inválido" });
  }
});

export default router;
