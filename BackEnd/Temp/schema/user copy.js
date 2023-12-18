import Mongoose from "mongoose";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../auth/sign.js";
import getUserInfo from "../../lib/getUserInfo.js";
import Token from "./token.js";

const UserSchema = new Mongoose.Schema({
  id: { type: Object },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

UserSchema.methods.usernameExists = async function (username) {
  const result = await Mongoose.model("User").find({ username: username });
  return result.length > 0;
};

UserSchema.methods.isCorrectPassword = async function (password, hash) {
  const same = await bcrypt.compare(password, hash);
  return same;
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));

  console.error("refreshToken", refreshToken);

  try {
    await new Token({ token: refreshToken }).save();
    console.log("Token saved", refreshToken);
    return refreshToken;
  } catch (error) {
    console.error(error);
    // throw new Error("Error creating token");
  }
};

export default Mongoose.model("User", UserSchema);
