import db from "../utils/db.js";
import { DataTypes } from 'sequelize';
const Todo = db.define("todo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idUser: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  completed: {
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    
    type: DataTypes.DATE
  },
  updatedAt: {
    
    type: DataTypes.DATE
  }
});



export default Todo;
