import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";
import Admin from "../models/admin.js";
import Category from "../models/category.js";
import Employee from "../models/employee.js"; // Asegúrate de importar el modelo correcto
import Customer from "../models/customer.js"; // Asegúrate de importar el modelo correcto
import { jsonResponse } from "../lib/jsonResponse.js";

const router = express.Router();

router.post("/adminlogin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const admin = await Admin.findOne({
        where: {
          email: email,
          password: password,
        },
      });
  
      if (admin) {
        const { email, id } = admin;
        const token = jwt.sign(
          { role: "admin", email: email, id: id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie('token', token);
        return res.json({ loginStatus: true });
      } else {
        return res.json({ loginStatus: false, error: "Wrong email or password" });
      }
    } catch (error) {
      console.error(error);
      return res.json({ loginStatus: false, error: "Query error admin" });
    }
  });

// router.get('/category', (req, res) => {
//     const sql = "SELECT * FROM category";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })
router.get('/category', async (req, res) => {
    try {
      const categories = await Category.findAll();
      return res.json({ Status: true, Result: categories });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error category' });
    }
  });
// router.post('/add_category', (req, res) => {
//     const sql = "INSERT INTO category (`name`) VALUES (?)"
//     con.query(sql, [req.body.category], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true})
//     })
// })
// router.post('/add_category', async (req, res) => {
//     try {
//       const newCategory = await Category.create({
//         name: req.body.category,
//       });
  
//       return res.json({ Status: true });
//     } catch (error) {
//       console.error(error);
//       return res.json({ Status: false, Error: 'Query Error' });
//     }
//   });
router.post("/add_category", async function (req, res, next) {
    const { name } = req.body;
  
    if (!name) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Category name is required",
        })
      );
    }
  
    try {
      const category = new Category(); // Asumiendo que ya tienes el modelo de Category definido
    //   const categoryExists = await category.nameExists(name);
          const newCategory = new Category({ name });
        await newCategory.save();
  
        res.json(
          jsonResponse(200, {
            message: "Category created successfully",
          })
        );

    } catch (err) {
      return res.status(500).json(
        jsonResponse(500, {
          error: "Error creating category",
        })
      );
    }
  });
// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
        // cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 

// router.post('/add_employee',upload.single('image'), (req, res) => {

//     const sql = `INSERT INTO employee 
//     (name,email,password, address, salary,image, category_id) 
//     VALUES (?)`;
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         const values = [
//             req.body.name,
//             req.body.email,
//             hash,
//             req.body.address,
//             req.body.salary, 
//             req.file.originalname,
//             req.body.category_id
//         ]
        
//         con.query(sql, [values], (err, result) => {
//             console.log(err)
//             if(err) return res.json({Status: false, Error: err})
//             return res.json({Status: true})
//         })
//     })
// })

// router.get('/employee', (req, res) => {
//     const sql = "SELECT * FROM employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employee WHERE id = ?";
//     con.query(sql,[id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.put('/edit_employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `UPDATE employee 
//         set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
//         Where id = ?`
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.salary,
//         req.body.address,
//         req.body.category_id
//     ]
//     con.query(sql,[...values, id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.delete('/delete_employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "delete from employee where id = ?"
//     con.query(sql,[id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })
router.post('/add_employee', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const newEmployee = await Employee.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
        salary: req.body.salary,
        image: req.file.originalname,
        category_id: req.body.category_id,
      });
  
      return res.json({ Status: true });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error employee' });
    }
  });
  
  router.get('/employee', async (req, res) => {
    try {
      const employees = await Employee.findAll();
      return res.json({ Status: true, Result: employees });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error get employee ' });
    }
  });
  
  router.get('/employee/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const employee = await Employee.findByPk(id);
  
      if (!employee) {
        return res.json({ Status: false, Error: 'Employee not found' });
      }
  
      return res.json({ Status: true, Result: employee });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error employ err' });
    }
  });
  
  router.put('/edit_employee/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const employee = await Employee.findByPk(id);
  
      if (!employee) {
        return res.json({ Status: false, Error: 'Employee not found' });
      }
  
      const updatedEmployee = await employee.update({
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary,
        address: req.body.address,
        category_id: req.body.category_id,
      });
  
      return res.json({ Status: true, Result: updatedEmployee });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error edit employee' });
    }
  });
  
  router.delete('/delete_employee/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const employee = await Employee.findByPk(id);
  
      if (!employee) {
        return res.json({ Status: false, Error: 'Employee not found' });
      }
  
      await employee.destroy();
      return res.json({ Status: true, Result: 'Employee deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error delete employee ' });
    }
  });

// router.get('/customer', (req, res) => {
//     const sql = "SELECT * FROM customer";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })
// router.get('/customer/:codigo', (req, res) => {
//     const id = req.params.codigo;
//     const sql = "SELECT * FROM customer WHERE codigo = ?";
//     con.query(sql,[id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })
// router.post('/add_customer', upload.none(),(req, res) => {
//     const sql = `INSERT INTO customer (nombres,apellidos,carnet,celular,direccion) VALUES (?, ?, ?, ?, ?)`;
//    //const sql = `INSERT INTO customer (nombres,apellidos,carnet,celular,direccion) VALUES (?)`;
//         const values = [
//             req.body.nombres,
//             req.body.apellidos,
//             req.body.carnet,
//             req.body.celular, 
//             req.body.direccion
//         ]
//         console.log(req.body.carnet)
//         con.query(sql,values, (err, result) => {
         
//             if(err) return res.json({Status: false, Error: err})
//             return res.json({Status: true})
//         })
// })
// router.put('/edit_customer/:codigo', (req, res) => {
//     const id = req.params.codigo;
//     const sql = `UPDATE customer set nombres = ?, apellidos = ?, carnet = ?, celular = ?, direccion = ? Where codigo = ?`
//         const values = [
//             req.body.nombres,
//             req.body.apellidos,
//             req.body.carnet,
//             req.body.celular,
//             req.body.direccion
//         ]
//         console.log(id)
        
//     con.query(sql,[...values, id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.delete('/delete_customer/:codigo', (req, res) => {
//     const id = req.params.codigo;
//     const sql = "delete from customer where codigo = ?"
//     con.query(sql,[id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })
router.get('/customer', async (req, res) => {
    try {
      const customers = await Customer.findAll();
      return res.json({ Status: true, Result: customers });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error customer get' });
    }
  });
  
  router.get('/customer/:codigo', async (req, res) => {
    try {
      const codigo = req.params.codigo;
      const customer = await Customer.findOne({ where: { codigo } });
  
      if (!customer) {
        return res.json({ Status: false, Error: 'Customer not found' });
      }
  
      return res.json({ Status: true, Result: customer });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error customer id' });
    }
  });
  
  router.post('/add_customer', async (req, res) => {
    try {
      const newCustomer = await Customer.create({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        carnet: req.body.carnet,
        celular: req.body.celular,
        direccion: req.body.direccion,
      });
  
      return res.json({ Status: true });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error add customer' });
    }
  });
  
  router.put('/edit_customer/:codigo', async (req, res) => {
    try {
      const codigo = req.params.codigo;
      const customer = await Customer.findByPk(codigo);
      if (!customer) {
        return res.json({ Status: false, Error: 'Customer not found' });
      }
  
      const updatedCustomer = await customer.update({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        carnet: req.body.carnet,
        celular: req.body.celular,
        direccion: req.body.direccion,
      });
  
      return res.json({ Status: true, Result: updatedCustomer });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error edit customer' });
    }
  });
  
  router.delete('/delete_customer/:codigo', async (req, res) => {
    try {
      const codigo = req.params.codigo;
      const customer = await Customer.findOne({ where: { codigo } });
  
      if (!customer) {
        return res.json({ Status: false, Error: 'Customer not found' });
      }
  
      await customer.destroy();
      return res.json({ Status: true, Result: 'Customer deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error delete customer' });
    }
  });

// router.get('/admin_count', (req, res) => {
//     const sql = "select count(id) as admin from admin";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/employee_count', (req, res) => {
//     const sql = "select count(id) as employee from employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/salary_count', (req, res) => {
//     const sql = "select sum(salary) as salaryOFEmp from employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/admin_records', (req, res) => {
//     const sql = "select * from admin"
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

// router.get('/logout', (req, res) => {
//     res.clearCookie('token')
//     return res.json({Status: true})
// })
router.get('/admin_count', async (req, res) => {
    try {
      const adminCount = await Admin.count();
      return res.json({ Status: true, Result: { admin: adminCount } });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error add admin' });
    }
  });
  
  router.get('/employee_count', async (req, res) => {
    try {
      const employeeCount = await Employee.count();
      return res.json({ Status: true, Result: { employee: employeeCount } });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error count employee' });
    }
  });
  
  router.get('/salary_count', async (req, res) => {
    try {
      const totalSalary = await Employee.sum('salary');
      return res.json({ Status: true, Result: { salaryOFEmp: totalSalary } });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error count salary' });
    }
  });
  
  router.get('/admin_records', async (req, res) => {
    try {
      const adminRecords = await Admin.findAll();
      return res.json({ Status: true, Result: adminRecords });
    } catch (error) {
      console.error(error);
      return res.json({ Status: false, Error: 'Query Error admin list' });
    }
  });
  
  router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
  });
  router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(middleware.route.path);
    }
  });  
export { router as AdminRouter };
