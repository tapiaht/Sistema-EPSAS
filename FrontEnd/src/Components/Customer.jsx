import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/customer")
      .then((result) => {
        if (result.data.Status) {
          setCustomer(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_customer/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Customer List</h3>
      </div>
      <Link to="/dashboard/add_customer" className="btn btn-success">
        Add Customer
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Carnet</th>
              <th>Celular</th>
              <th>Direccion</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.nombres}</td>
                <td>{e.apellidos}</td>
                <td>{e.carnet}</td>
                <td>{e.celular}</td>
                <td>{e.direccion}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_customer/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
