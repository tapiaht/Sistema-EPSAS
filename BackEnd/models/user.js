import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../auth/sign.js";
import getUserInfo from "../lib/getUserInfo.js";
import db from "../utils/db.js";
import { DataTypes } from 'sequelize';
import Token from "./token.js";
const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  if (user.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  }
});
User.prototype.usernameExists = async function (username) {
  const result = await this.constructor.findOne({where: { username: username }});
  return !!result;
};

User.prototype.isCorrectPassword = async function (password) {
  const same = await bcrypt.compare(password, this.password);
  return same;
};

User.prototype.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

User.prototype.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));

  console.error("refreshToken===", refreshToken);

  try {
    // Guardar el token en tu base de datos MySQL aquí
    const ntoken = new Token({ token: refreshToken });
      await ntoken.save();

    
    console.log("TOKEN GUARDADO ", refreshToken);
    return refreshToken;
  } catch (error) {
    console.error(error);
    //throw new Error("Error creating token");
  }
};

export default User;
