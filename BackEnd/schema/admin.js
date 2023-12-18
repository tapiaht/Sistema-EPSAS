import sequelize from "../utils/db.js";
import { DataTypes } from 'sequelize';
const Admin = sequelize.define("admin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  } 
});
export default Admin;