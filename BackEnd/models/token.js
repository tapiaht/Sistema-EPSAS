
import db from "../utils/db.js";
import { DataTypes } from 'sequelize';
const Token = db.define("token", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING
  },
  createdAt: {
    
    type: DataTypes.DATE
  },
  updatedAt: {
    
    type: DataTypes.DATE
  }

});



export default Token;