import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    nombres: "",
    apellidos: "",
    carnet: "",
    celular: "",
    direccion: ""
  });

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('nombres', customer.nombres);
    formData.append('apellidos', customer.apellidos);
    formData.append('carnet', customer.carnet);
    formData.append('celular', customer.celular);
    formData.append('direccion', customer.direccion);
    
    
    
    axios.post('http://localhost:3000/auth/add_customer', formData,{
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/customer')
        } else {
            alert(result.data.Error)
           
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Customer</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="nombres" className="form-label">
              Nombres
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="nombres"
              placeholder="Enter Nombres"
              onChange={(e) =>
                setCustomer({ ...customer, nombres: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="apellidos" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="apellidos"
              placeholder="Enter Apellidos"
              
              onChange={(e) =>
                setCustomer({ ...customer, apellidos: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="carnet" className="form-label">
              Carnet
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="carnet"
              placeholder="Enter carnet"
              onChange={(e) =>
                setCustomer({ ...customer, carnet: e.target.value })
              }
            />
            <label for="celular" className="form-label">
              Celular
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="celular"
              placeholder="Enter Celular"
              
              onChange={(e) =>
                setCustomer({ ...customer, celular: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="direccion" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="direccion"
              placeholder="Enter Dirección"
              
              onChange={(e) =>
                setCustomer({ ...customer, direccion: e.target.value })
              }
            />
          </div>
        
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
